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
  role: "expert" | "medecin"; // 👈 ajout du rôle
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

export const Discussions = () => {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

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
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white shadow rounded-lg overflow-hidden">
      {/* Liste des conversations */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selectedConv?.id === conv.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedConv(conv)}
            >
              <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{conv.name}</p>
                <p className="text-xs text-[#00A7A7] font-semibold">
                  {conv.role === "expert" ? "Expert" : "Médecin"}
                </p>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de la discussion */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Header de la discussion */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">{selectedConv.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedConv.role === "expert" ? "Expert" : "Médecin"} – {selectedConv.specialty}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {selectedConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "Moi" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                      msg.sender === "Moi"
                        ? "bg-[#00A7A7] text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-70">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className="p-3 border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-full bg-[#00A7A7] text-white hover:bg-[#008b8b]"
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
  );
};
