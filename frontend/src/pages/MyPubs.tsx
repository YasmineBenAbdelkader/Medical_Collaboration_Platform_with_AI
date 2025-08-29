import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Filter,
  Pencil,
  Trash2,
  MessageSquare,
  Heart,
  Eye,
  Tag,
} from "lucide-react";
import { getCases, deleteCaseById } from "../services/storage";
import type { StoredCase } from "../services/storage";
import { useAuth } from "../contexts/AuthContext";

export const MyPubs = () => {
  const [cases, setCases] = useState<StoredCase[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "draft" | "published" | "resolved">("all");
  const { user } = useAuth();

  // --- Pubs statiques pour tester ---
  const staticCases: StoredCase[] = [
    {
      id: "draft-1",
      title: "Cas en brouillon",
      excerpt: "Ceci est un brouillon de publication.",
      tags: ["Test", "Draft"],
      hasImage: false,
      imageUrl: "",
      commentCount: 0,
      likeCount: 0,
      status: "draft",
      author: { id: user?.id ?? "demo", name: "Moi" },
    },
    {
      id: "pub-1",
      title: "Cas publié",
      excerpt: "Un cas publié mais pas encore résolu.",
      tags: ["Urgent", "Cardio"],
      hasImage: true,
      imageUrl: "https://via.placeholder.com/400x200.png?text=Cas+Publié",
      commentCount: 3,
      likeCount: 5,
      status: "published",
      author: { id: user?.id ?? "demo", name: "Moi" },
    },
    {
      id: "res-1",
      title: "Cas résolu",
      excerpt: "Un cas qui a été marqué comme résolu.",
      tags: ["Résolu"],
      hasImage: true,
      imageUrl: "https://via.placeholder.com/400x200.png?text=Cas+Résolu",
      commentCount: 7,
      likeCount: 12,
      status: "resolved",
      author: { id: user?.id ?? "demo", name: "Moi" },
    },
  ];

  useEffect(() => {
    if (!user) return;
    const allCases = getCases().filter(c => c.author?.id === user.id);
    setCases([...staticCases, ...allCases]);
  }, [user]);

  const handleDelete = (id: string) => {
    if (!user) return;
    const ok = confirm("Supprimer définitivement cette publication ?");
    if (!ok) return;
    const success = deleteCaseById(id, user.id);
    if (success) {
      setCases(getCases().filter(c => c.author?.id === user.id));
    }
  };

  const filteredCases = cases.filter(c => {
    if (activeFilter === "all") return true;
    return c.status === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header avec bouton créer un cas */}
      <div className="flex items-center justify-between mb-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-light text-gray-900 mb-3">
             <span className="font-semibold text-[#00A7A7]">Mes publications</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Gérez vos publications : brouillons, cas publiés ou cas résolus.
          </p>
        </div>
        <Link
          to="/case/new"
          className="flex items-center text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 shadow"
        >
          <PlusCircle size={18} className="mr-2" />
          Nouveau cas
        </Link>
      </div>

      {/* Filtres */}
      <div className="flex justify-center md:justify-start space-x-3 mb-10">
        {[
          { key: "all", label: "Toutes" },
          { key: "draft", label: "Brouillons" },
          { key: "published", label: "Publiées" },
          { key: "resolved", label: "Résolues" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key as any)}
            className={`px-4 py-2 text-sm rounded-full transition font-medium ${
              activeFilter === f.key
                ? "bg-[#00A7A7]/10 text-[#00A7A7]"
                : "bg-white text-gray-500 hover:bg-gray-50 border"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste des publications */}
      {filteredCases.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-2">Aucune publication trouvée.</p>
          <Link
            to="/case/new"
            className="text-[#00A7A7] hover:text-[#008b8b] font-medium"
          >
            Créer une nouvelle publication →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map(c => (
            <div
              key={c.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group"
            >
              {c.hasImage && c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={c.title ?? "Image"}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-5">
                {/* Titre + Actions */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {c.title ?? "Sans titre"}
                  </h2>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    <Link
                      to={`/case/new?edit=${c.id}`}
                      className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                    </Link>
                  </div>
                </div>

                {/* Extrait */}
                <p className="text-sm text-gray-600 mb-3">{c.excerpt ?? ""}</p>

                {/* Tags */}
                {c.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {c.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> {c.commentCount ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={14} /> {c.likeCount ?? 0}
                  </span>
                  <Link
                    to={`/case/${c.id}`}
                    className="flex items-center gap-1 text-[#00A7A7] hover:text-[#008b8b]"
                  >
                    <Eye size={14} /> Voir
                  </Link>
                </div>

                {/* Statut */}
                <div className="mt-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      c.status === "draft"
                        ? "bg-gray-100 text-gray-600"
                        : c.status === "published"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {c.status === "draft"
                      ? "Brouillon"
                      : c.status === "published"
                      ? "Publié"
                      : "Résolu"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
