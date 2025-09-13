import React, { useState, useRef, useEffect } from "react";
import {
  SendIcon,
  ImageIcon,
  PaperclipIcon,
  HeartIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ActivityIcon,
} from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const styles = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,167,167,0.4); }
  50% { box-shadow: 0 0 0 6px rgba(0,167,167,0.15); }
}
`;

export const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [messageFocused, setMessageFocused] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "Patient 45 ans - Douleur thoracique",
      messages: [
        {
          role: "assistant",
          content: "Bonjour, je suis votre assistant IA spécialisé en cardiologie.",
          timestamp: "14:32",
        },
        {
          role: "user",
          content: "Patient 45 ans, douleur thoracique atypique, antécédents familiaux d’infarctus...",
          timestamp: "14:33",
        },
        {
          role: "assistant",
          content: "Merci pour ces informations. Voici quelques pistes cardiologiques.",
          timestamp: "14:34",
        },
      ],
    },
    {
      id: 2,
      title: "Patient 60 ans - Palpitations",
      messages: [
        {
          role: "assistant",
          content: "Pouvez-vous me décrire les symptômes du patient ?",
          timestamp: "10:12",
        },
        {
          role: "user",
          content: "Palpitations fréquentes depuis 2 semaines, ECG montre des extrasystoles.",
          timestamp: "10:15",
        },
      ],
    },
  ]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll pour centrer le dernier message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedChat, selectedChat?.messages.length]);

  const renameChat = () => {
    if (!selectedChat) return;
    const newTitle = prompt("Renommer la discussion", selectedChat.title);
    if (newTitle) {
      setChats(
        chats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, title: newTitle } : chat
        )
      );
    }
    setMenuOpen(false);
  };

  const deleteChat = () => {
    if (!selectedChat) return;
    if (confirm("Supprimer cette discussion ?")) {
      setChats(chats.filter((chat) => chat.id !== selectedChat.id));
      setSelectedChatId(chats[0]?.id || null);
    }
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;
    const newMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setChats(
      chats.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-2 md:px-6 flex flex-col md:flex-row gap-8 min-h-[70vh]">
      <style>{styles}</style>
      {/* Sidebar historique */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e0f2f1] flex flex-col h-full min-h-[480px]">
          <div className="px-6 pt-6 pb-3 border-b border-[#e0f2f1]">
            <h2 className="text-lg font-semibold text-[#009688] mb-3">Historique</h2>
            <button
              onClick={() => {
                const newChatId = chats.length + 1;
                setChats([
                  ...chats,
                  {
                    id: newChatId,
                    title: "Nouvelle discussion",
                    messages: [
                      {
                        role: "assistant",
                        content: "Bonjour, je suis votre assistant IA spécialisé en cardiologie.",
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ],
                  },
                ]);
                setSelectedChatId(newChatId);
                setShowIntro(false);
              }}
              className="w-full mb-4 px-4 py-2 bg-gradient-to-tr from-[#b2dfdb] to-[#e0f7fa] text-[#009688] font-semibold rounded-lg hover:bg-[#00A7A7] hover:text-white shadow-sm transition flex items-center justify-center gap-2"
            >
              <PlusIcon size={18} /> Nouveau Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChatId(chat.id);
                  setShowIntro(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl border border-transparent transition font-medium
                  ${selectedChatId === chat.id ? "bg-[#e0f7fa] border-[#b2dfdb] shadow-md text-[#009688]" : "hover:bg-[#f1f8f9] hover:border-[#b2dfdb] text-gray-700"}
                `}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card principale IA */}
      <div className="w-full md:w-2/3 flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e0f2f1] flex flex-col h-full min-h-[480px]">
          {showIntro ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="mb-4 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-[#00A7A7]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  <path
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    d="M6 12l3 4 4-8 3 4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[#00A7A7] mb-2">
                Assistant IA en Cardiologie
              </h1>
              <p className="text-gray-700 text-lg">
                Bonjour ! Je suis votre assistant IA spécialisé en cardiologie.<br />
                Je peux vous aider à analyser des cas cliniques, interpréter des symptômes et proposer des recommandations de base.
              </p>
              <button
                onClick={() => {
                  const newChatId = chats.length + 1;
                  setChats([
                    ...chats,
                    {
                      id: newChatId,
                      title: "Nouvelle discussion",
                      messages: [
                        {
                          role: "assistant",
                          content:
                            "Bonjour, je suis votre assistant IA spécialisé en cardiologie.\nComment je peux vous aider?",
                          timestamp: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                        },
                      ],
                    },
                  ]);
                  setSelectedChatId(newChatId);
                  setShowIntro(false);
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-tr from-[#b2dfdb] to-[#e0f7fa] text-[#009688] font-semibold rounded-lg hover:bg-[#00A7A7] hover:text-white shadow-sm transition"
              >
                Commencer le chat
              </button>
            </div>
          ) : (
            <>
              {/* Header chat */}
              <div className="px-8 py-5 border-b border-[#e0f2f1] flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#e0f7fa] to-white">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {selectedChat?.title || "Sélectionnez une discussion"}
                </h3>
                {/* Menu à trois points */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MoreHorizontalIcon size={20} />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={renameChat}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Renommer
                      </button>
                      <button
                        onClick={deleteChat}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 px-8 py-6 overflow-y-auto space-y-4 bg-[#f8fbfb] rounded-b-2xl" style={{ minHeight: 0, maxHeight: '50vh' }}>
                {selectedChat?.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    style={{ animation: 'fadeInUp 0.5s', animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards' }}
                  >
                    <div
                      className={`max-w-2xl rounded-2xl px-4 py-3 shadow-md border transition-all
                        ${msg.role === "user"
                          ? "bg-white text-gray-900 rounded-br-none border-gray-200"
                          : "bg-[#e0f7fa] text-[#009688] rounded-bl-none border-[#b2dfdb]"}
                        ${index === selectedChat.messages.length - 1 && msg.role === "user" ? 'scale-105' : ''}`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div
                        className={`text-xs mt-1 ${msg.role === "user" ? "text-gray-400" : "text-teal-600"}`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Ref pour centrer le dernier message */}
                <div ref={messagesEndRef} />
              </div>
              {/* Input area */}
              <div className="border-t border-[#e0f2f1] px-8 py-5 bg-white flex items-end gap-3 rounded-b-2xl">
                <form onSubmit={handleSubmit} className="flex items-end gap-3 w-full">
                  <div className="flex-1">
                    <div
                      className={`flex flex-col bg-gray-100 rounded-lg overflow-hidden transition-all ${messageFocused ? "bg-[#E0F7F7]" : ""}`}
                    >
                      <div
                        className={`px-4 py-2 border-2 rounded-lg transition-colors ${messageFocused ? "border-[#00A7A7]" : "border-gray-300"} bg-gray-100`}
                      >
                        <textarea
                          className="w-full border-none bg-transparent focus:ring-0 focus:outline-none resize-none text-sm text-gray-700 placeholder-gray-400"
                          placeholder="Décrivez un cas clinique ou téléchargez une image..."
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setMessageFocused(true)}
                          onBlur={() => setMessageFocused(false)}
                        />
                      </div>
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                        <div className="flex space-x-2">
                          <label
                            htmlFor="fileInput"
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                            title="Joindre une image"
                          >
                            <ImageIcon size={20} />
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                          <label
                            htmlFor="fileInput2"
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                            title="Joindre un fichier"
                          >
                            <PaperclipIcon size={20} />
                          </label>
                          <input
                            id="fileInput2"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#b2dfdb] to-[#e0f7fa] text-[#009688] hover:bg-[#00A7A7] hover:text-white shadow-sm transition-transform duration-200 hover:rotate-12 active:scale-90"
                    disabled={!message.trim()}
                  >
                    <SendIcon size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
