import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, FileIcon, UploadCloudIcon, Trash2Icon, AlertCircleIcon, TagIcon, SendIcon } from 'lucide-react';
import { addCase } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

interface PreviewFile {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'file';
}

export const NewCase: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const specialties = useMemo(() => [
    'Cardiologie', 'Dermatologie', 'Endocrinologie', 'Gastroentérologie',
    'Neurologie', 'Oncologie', 'Pédiatrie', 'Pneumologie', 'Psychiatrie',
    'Radiologie', 'Rhumatologie', 'Urgences'
  ], []);

  const [title, setTitle] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [anonymized, setAnonymized] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const addTagsFromInput = () => {
    const candidates = tagInput
      .split(/[\,\n]/)
      .map(t => t.trim())
      .filter(Boolean);
    if (candidates.length === 0) return;
    const next = Array.from(new Set([...tags, ...candidates])).slice(0, 10);
    setTags(next);
    setTagInput('');
  };

  const removeTag = (t: string) => setTags(tags.filter(x => x !== t));

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const newPreviews: PreviewFile[] = [];
    Array.from(files).forEach(file => {
      const isImage = acceptedImageTypes.includes(file.type);
      const url = URL.createObjectURL(file);
      newPreviews.push({ id: `${file.name}-${file.size}-${Math.random()}`, file, url, type: isImage ? 'image' : 'file' });
    });
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 12));
  };

  const removePreview = (id: string) => {
    const p = previews.find(x => x.id === id);
    if (p) URL.revokeObjectURL(p.url);
    setPreviews(prev => prev.filter(x => x.id !== id));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) return setError('Le titre est requis.');
    if (!specialty.trim()) return setError('La spécialité est requise.');
    if (!summary.trim() && !content.trim() && previews.length === 0) {
      return setError('Veuillez fournir au moins un contenu: texte ou média.');
    }
    if (!anonymized) {
      return setError('Vous devez confirmer l\'anonymisation des données patient.');
    }
    if (!user) {
      return setError('Vous devez être connecté pour publier un cas.');
    }

    setSubmitting(true);

    // Construire l'excerpt et récupérer éventuellement une image persistante
    const excerpt = summary.trim() || content.trim().slice(0, 180) + (content.trim().length > 180 ? '…' : '');
    const firstImage = previews.find(p => p.type === 'image');
    let imageUrl: string | undefined;
    if (firstImage) {
      try {
        imageUrl = await fileToDataUrl(firstImage.file);
      } catch {
        // ignore erreur de conversion
      }
    }

    // Enregistrer dans le stockage local
    const created = addCase({
      title: title.trim(),
      excerpt,
      content: content.trim() || undefined,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        specialty: specialty || user.specialty,
      },
      hasImage: !!imageUrl,
      imageUrl,
      tags: tags.length ? tags : undefined,
      isUrgent,
    });

    setSubmitting(false);
    setSuccess('Votre cas a été publié avec succès.');

    // Rediriger vers le dashboard pour voir la nouvelle publication
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Publier un nouveau cas</h1>
        <p className="text-gray-600 mt-1">Partagez un cas médical (texte, images, fichiers). Veillez à respecter l\'anonymisation des données.</p>
      </div>

      {error && (
        <div className="mb-4 flex items-start p-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
          <AlertCircleIcon size={18} className="mt-0.5 mr-2" />
          <div className="text-sm">{error}</div>
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-start p-3 rounded-lg border border-green-200 bg-green-50 text-green-700">
          <AlertCircleIcon size={18} className="mt-0.5 mr-2" />
          <div className="text-sm">{success}</div>
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Arythmie cardiaque inexpliquée"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité *</label>
            <select
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="">Sélectionner une spécialité</option>
              {specialties.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgent</label>
            <div className="flex items-center h-[42px] px-3 border border-gray-300 rounded-lg bg-gray-50">
              <input
                id="urgent"
                type="checkbox"
                checked={isUrgent}
                onChange={e => setIsUrgent(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="urgent" className="text-sm text-gray-700">Marquer ce cas comme urgent</label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Résumé</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Brève description du cas (visible dans la liste)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Description complète: contexte, examens, résultats, questions..."
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Médias et fichiers</label>
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl border-gray-300 bg-gray-50 hover:border-blue-400 transition-colors"
          >
            <UploadCloudIcon className="text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Glissez-déposez des images ou fichiers ici, ou</p>
            <label className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
              Sélectionner des fichiers
              <input type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </label>
            <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF, PDF (max 12 fichiers)</p>
          </div>

          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {previews.map(p => (
                <div key={p.id} className="relative group">
                  {p.type === 'image' ? (
                    <img src={p.url} alt={p.file.name} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                  ) : (
                    <div className="w-full h-32 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500">
                      <FileIcon className="mr-2" /> {p.file.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removePreview(p.id)}
                    className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <TagIcon size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTagsFromInput(); }
                }}
                placeholder="Ajouter un tag (Entrée ou virgule)"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <button type="button" onClick={addTagsFromInput} className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              Ajouter
            </button>
          </div>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {t}
                  <button type="button" onClick={() => removeTag(t)} className="ml-1 text-blue-700/70 hover:text-blue-900">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start">
          <input
            id="anonymized"
            type="checkbox"
            checked={anonymized}
            onChange={e => setAnonymized(e.target.checked)}
            className="mt-1 mr-2"
          />
          <label htmlFor="anonymized" className="text-sm text-gray-700">
            Je confirme que les informations partagées respectent l'anonymisation des données patients et ne contiennent aucune donnée personnelle identifiante.
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Publication...
              </>
            ) : (
              <>
                <SendIcon size={16} className="mr-2" />
                Publier le cas
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
