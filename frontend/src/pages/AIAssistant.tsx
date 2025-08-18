import React, { useState } from 'react';
import { SendIcon, ImageIcon, PaperclipIcon, BrainCircuitIcon, TrashIcon } from 'lucide-react';
export const AIAssistant = () => {
  const [message, setMessage] = useState('');
  // Mock conversation history - would come from state/API in real app
  const conversation = [{
    role: 'assistant',
    content: "Bonjour, je suis votre assistant médical IA. Comment puis-je vous aider aujourd'hui?",
    timestamp: '14:32'
  }, {
    role: 'user',
    content: "J'ai un patient de 45 ans avec une douleur thoracique atypique et des antécédents familiaux d'infarctus précoce. Son ECG est normal, mais il présente une légère élévation de la troponine.",
    timestamp: '14:33'
  }, {
    role: 'assistant',
    content: "Merci pour ces informations. Compte tenu des symptômes et des facteurs de risque que vous mentionnez, plusieurs pistes sont à explorer:\n\n1. Syndrome coronarien aigu: Malgré l'ECG normal, l'élévation de la troponine est préoccupante, surtout avec les antécédents familiaux.\n\n2. Péricardite ou myocardite: À considérer si la douleur varie avec la respiration ou la position.\n\n3. Dissection aortique: À évaluer, particulièrement si la douleur est décrite comme déchirante.\n\nJe recommande:\n- Une surveillance ECG continue\n- Des dosages sériés de troponine\n- Un échocardiogramme\n- Éventuellement une coronarographie si l'élévation de troponine persiste\n\nSouhaitez-vous des informations plus spécifiques sur l'un de ces aspects?",
    timestamp: '14:34'
  }];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // In a real app, this would send the message to an API and update the state
    setMessage('');
  };
  return <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <BrainCircuitIcon size={24} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-medium text-gray-900">
                Assistant IA médical
              </h1>
              <p className="text-sm text-gray-500">
                Propulsé par des données médicales à jour
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <TrashIcon size={20} />
          </button>
        </div>
        {/* Chat area */}
        <div className="h-[calc(100vh-300px)] overflow-y-auto p-6">
          <div className="space-y-6">
            {conversation.map((msg, index) => <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg px-4 py-3 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Input area */}
        <div className="border-t border-gray-200 px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-end">
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
              <div className="px-4 py-2">
                <textarea className="w-full border-none bg-transparent focus:ring-0 resize-none text-sm text-gray-700" placeholder="Décrivez le cas clinique ou posez une question médicale..." rows={3} value={message} onChange={e => setMessage(e.target.value)}></textarea>
              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                <div className="flex space-x-2">
                  <button type="button" className="text-gray-500 hover:text-blue-600" title="Joindre une image">
                    <ImageIcon size={20} />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-blue-600" title="Joindre un fichier">
                    <PaperclipIcon size={20} />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Les données sont traitées de façon confidentielle
                </div>
              </div>
            </div>
            <button type="submit" className="ml-3 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700" disabled={!message.trim()}>
              <SendIcon size={20} />
            </button>
          </form>
        </div>
      </div>
      {/* Additional features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">
            Historique des consultations
          </h3>
          <p className="text-sm text-gray-600">
            Accédez à vos conversations précédentes avec l'assistant
          </p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
            Voir l'historique →
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">
            Analyse d'images médicales
          </h3>
          <p className="text-sm text-gray-600">
            Téléchargez des images pour une analyse assistée par IA
          </p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
            Analyser une image →
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">
            Recherche de littérature
          </h3>
          <p className="text-sm text-gray-600">
            Trouvez les dernières recherches sur un sujet médical
          </p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
            Rechercher →
          </button>
        </div>
      </div>
    </div>;
};