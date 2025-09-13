import React, { useState } from "react";
import { Search, Send } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  role: "expert" | "medecin";
  specialty: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    role: "expert",
    specialty: "Cardiologie",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "D'accord, merci beaucoup !",
    messages: [
      { id: 1, sender: "Dr. Sophie Martin", text: "Bonjour, comment allez-vous ?", timestamp: "09:20" },
      { id: 2, sender: "Moi", text: "Très bien docteur, merci !", timestamp: "09:22" },
      { id: 3, sender: "Dr. Sophie Martin", text: "D'accord, merci beaucoup !", timestamp: "09:25" },
    ],
  },
  {
    id: 2,
    name: "Dr. Karim Ben Ali",
    role: "medecin",
    specialty: "Neurologie",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "On se voit demain.",
    messages: [
      { id: 1, sender: "Moi", text: "Bonjour Dr Karim", timestamp: "11:00" },
      { id: 2, sender: "Dr. Karim Ben Ali", text: "Bonjour, on se voit demain.", timestamp: "11:05" },
    ],
  },
];

const styles = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,167,167,0.4); }
  50% { box-shadow: 0 0 0 6px rgba(0,167,167,0.15); }
}
@keyframes typing {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}
`;

export const Discussions = () => {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "Moi",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    selectedConv.messages.push(newMsg);
    setNewMessage("");
    setIsTyping(false);
  };

  React.useEffect(() => {
    if (!selectedConv) return;
    if (selectedConv.id === 1 && newMessage.length === 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 2500);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [selectedConv, newMessage]);

  // Scroll pour centrer le dernier message
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedConv, selectedConv?.messages.length]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-2 md:px-6 flex flex-col md:flex-row gap-8 min-h-[70vh]">
      <style>{styles}</style>
      {/* Sidebar conversations */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e0f2f1] flex flex-col h-full min-h-[480px]">
          <div className="px-6 pt-6 pb-3 border-b border-[#e0f2f1]">
            <h2 className="text-lg font-semibold text-[#009688] mb-3">Conversations</h2>
            <div className="flex items-center gap-2 bg-[#f1f8f9] p-2 rounded-full border border-[#e0f2f1]">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent outline-none flex-1 text-sm text-gray-700"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-xl border border-transparent transition group
                  ${selectedConv?.id === conv.id ? "bg-[#e0f7fa] border-[#b2dfdb] shadow-md" : "hover:bg-[#f1f8f9] hover:border-[#b2dfdb]"}`}
                style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                onClick={() => setSelectedConv(conv)}
              >
                <div className="relative">
                  <img src={conv.avatar} alt={conv.name} className="w-11 h-11 rounded-full border border-[#e0f2f1] shadow-sm" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00A7A7] border-2 border-white rounded-full" style={{ animation: 'pulse 1.5s infinite' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-800 truncate">{conv.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${conv.role === "expert" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"}`}>{conv.role === "expert" ? "Expert" : "Médecin"}</span>
                  </div>
                  <span className="inline-block text-xs text-gray-400 mb-0.5">{conv.specialty}</span>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone de messages */}
      <div className="w-full md:w-2/3 flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e0f2f1] flex flex-col h-full min-h-[480px]">
          {selectedConv ? (
            <>
              {/* Header de la discussion */}
              <div className="flex items-center gap-3 px-8 py-5 border-b border-[#e0f2f1] bg-gradient-to-r from-[#e0f7fa] to-white rounded-t-2xl">
                <div className="relative">
                  <img src={selectedConv.avatar} alt={selectedConv.name} className="w-12 h-12 rounded-full border border-[#e0f2f1] shadow-sm" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00A7A7] border-2 border-white rounded-full" style={{ animation: 'pulse 1.5s infinite' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-800 text-lg">{selectedConv.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${selectedConv.role === "expert" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"}`}>{selectedConv.role === "expert" ? "Expert" : "Médecin"}</span>
                  </div>
                  <span className="inline-block text-xs text-gray-400">{selectedConv.specialty}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-[#f8fbfb] rounded-b-2xl" style={{ minHeight: 0, maxHeight: '50vh' }}>
                {selectedConv.messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "Moi" ? "justify-end" : "justify-start"}`}
                    style={{ animation: 'fadeInUp 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm max-w-xs shadow-md border transition-transform
                        ${msg.sender === "Moi"
                          ? "bg-[#e0f7fa] text-[#009688] border-[#b2dfdb] rounded-br-none animate-pop"
                          : "bg-white text-gray-700 border-gray-100 rounded-bl-none"}
                        ${idx === selectedConv.messages.length - 1 && msg.sender === "Moi" ? 'scale-105' : ''}`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-60 italic mt-1 block text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                {/* Indicateur de saisie animé */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl bg-white border border-gray-100 text-gray-400 flex items-center gap-1 animate-fadeInUp">
                      <span>Saisie en cours</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 animate-typing" style={{ animationDelay: '0s' }} />
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 animate-typing" style={{ animationDelay: '0.2s' }} />
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 animate-typing" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}
                {/* Ref pour centrer le dernier message */}
                <div ref={messagesEndRef} />
              </div>

              {/* Zone de saisie */}
              <div className="px-8 py-5 border-t border-[#e0f2f1] bg-white flex items-center gap-2 rounded-b-2xl">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrire un message..."
                  className="flex-1 px-4 py-2 border border-[#b2dfdb] rounded-full focus:ring-2 focus:ring-[#00A7A7] focus:outline-none bg-[#f8fbfb] text-gray-700 shadow-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full bg-gradient-to-tr from-[#b2dfdb] to-[#e0f7fa] text-[#009688] hover:bg-[#00A7A7] hover:text-white shadow-sm transition-transform duration-200 hover:rotate-12 active:scale-90"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Sélectionnez une conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
