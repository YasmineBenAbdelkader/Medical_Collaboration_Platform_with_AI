import React from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUpIcon, BookmarkIcon, ShareIcon, MessageSquareIcon, AlertCircleIcon, LightbulbIcon, SendIcon } from 'lucide-react';
export const CaseView = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  // Mock data for a case - would come from API in real app
  const caseData = {
    id: '1',
    title: 'Patient avec arythmie cardiaque inexpliquée',
    content: `
      <p><strong>Présentation clinique:</strong> Homme de 54 ans présentant des épisodes d'arythmie cardiaque depuis 3 semaines.</p>
      <p><strong>Symptômes:</strong> Palpitations intermittentes, légère dyspnée à l'effort, fatigue.</p>
      <p><strong>Antécédents:</strong> Hypertension légère traitée par IECA. Père décédé d'un infarctus à 60 ans.</p>
      <p><strong>Examens réalisés:</strong></p>
      <ul>
        <li>ECG de repos: normal</li>
        <li>Bilan sanguin: normal, incluant électrolytes et fonction thyroïdienne</li>
        <li>Holter ECG 24h: quelques extrasystoles ventriculaires isolées</li>
      </ul>
      <p><strong>Question:</strong> Quelle serait l'approche diagnostique optimale pour ce patient? Faut-il envisager un enregistreur d'événements implantable?</p>
    `,
    author: {
      id: '2',
      name: 'Dr. Thomas Dubois',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialty: 'Cardiologie',
      hospital: 'CHU de Lyon'
    },
    date: 'Il y a 2 jours',
    commentCount: 12,
    likeCount: 24,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Cardiologie', 'Arythmie', 'ECG'],
    isUrgent: false,
    comments: [{
      id: '1',
      author: {
        id: '3',
        name: 'Dr. Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialty: 'Cardiologie',
        isExpert: true
      },
      content: "Compte tenu des antécédents familiaux et de la présentation, je suggérerais un monitoring prolongé. Un enregistreur d'événements implantable serait approprié si les symptômes sont peu fréquents mais significatifs. Avez-vous envisagé une échocardiographie pour évaluer la structure cardiaque?",
      date: 'Il y a 1 jour',
      likeCount: 8
    }, {
      id: '2',
      author: {
        id: '4',
        name: 'Dr. Jean Petit',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialty: 'Cardiologie'
      },
      content: "Je suis d'accord avec Dr. Martin. J'ajouterais qu'un test d'effort pourrait également être pertinent pour voir si l'arythmie est déclenchée par l'exercice. Avez-vous vérifié la consommation de caféine ou d'autres stimulants?",
      date: 'Il y a 12 heures',
      likeCount: 3
    }],
    aiSuggestions: ["Considérer un test d'effort pour évaluer l'arythmie induite par l'exercice", 'Échocardiographie pour exclure une anomalie structurelle cardiaque', 'Envisager un moniteur cardiaque portable de 14 jours avant de passer à un dispositif implantable', 'Évaluer la consommation de stimulants (caféine, alcool) et le stress comme facteurs déclenchants potentiels']
  };
  return <div className="max-w-4xl mx-auto">
      {/* Case header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex items-center mb-4">
          <img src={caseData.author.avatar} alt={caseData.author.name} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-3">
            <p className="text-base font-medium text-gray-900">
              {caseData.author.name}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{caseData.author.specialty}</span>
              <span className="mx-2">•</span>
              <span>{caseData.author.hospital}</span>
            </div>
            <p className="text-xs text-gray-500">{caseData.date}</p>
          </div>
          {caseData.isUrgent && <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <AlertCircleIcon size={16} className="mr-1" /> Urgent
            </span>}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {caseData.title}
        </h1>
        {caseData.imageUrl && <div className="mb-6 rounded-md overflow-hidden">
            <img src={caseData.imageUrl} alt="Case image" className="w-full max-h-96 object-cover" />
          </div>}
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{
        __html: caseData.content
      }} />
        <div className="flex flex-wrap gap-2 mb-6">
          {caseData.tags.map((tag, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {tag}
            </span>)}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-6">
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <ThumbsUpIcon size={20} />
              <span className="ml-1 text-sm">{caseData.likeCount}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <MessageSquareIcon size={20} />
              <span className="ml-1 text-sm">{caseData.commentCount}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-blue-600">
              <BookmarkIcon size={20} />
            </button>
            <button className="text-gray-500 hover:text-blue-600">
              <ShareIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* AI suggestions */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-4">
        <div className="flex items-center mb-3">
          <LightbulbIcon size={20} className="text-blue-600" />
          <h2 className="ml-2 text-lg font-medium text-gray-900">
            Suggestions de l'IA
          </h2>
        </div>
        <ul className="space-y-2">
          {caseData.aiSuggestions.map((suggestion, index) => <li key={index} className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span className="text-gray-700">{suggestion}</span>
            </li>)}
        </ul>
        <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
          Consulter l'analyse complète de l'IA →
        </button>
      </div>
      {/* Comments section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Commentaires ({caseData.comments.length})
        </h2>
        <div className="space-y-6">
          {caseData.comments.map(comment => <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start">
                <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {comment.author.name}
                    </p>
                    {comment.author.isExpert && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Expert
                      </span>}
                    <span className="ml-auto text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {comment.author.specialty}
                  </p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <div className="flex items-center mt-2">
                    <button className="flex items-center text-gray-500 hover:text-blue-600 text-xs">
                      <ThumbsUpIcon size={14} />
                      <span className="ml-1">{comment.likeCount}</span>
                    </button>
                    <button className="ml-4 text-xs text-gray-500 hover:text-blue-600">
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {/* Add comment form */}
        <div className="mt-6">
          <div className="flex items-start">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Your avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-3 flex-1">
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <textarea className="w-full p-3 text-sm text-gray-700 border-none focus:ring-0 focus:outline-none" placeholder="Ajouter un commentaire..." rows={3} />
              </div>
              <div className="mt-2 flex justify-end">
                <button className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                  <SendIcon size={16} className="mr-2" />
                  Commenter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};