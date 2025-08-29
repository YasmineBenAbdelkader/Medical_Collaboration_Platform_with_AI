import React, { useState } from "react";
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

export const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [messageFocused, setMessageFocused] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "Patient 45 ans - Douleur thoracique",
      messages: [
        {
          role: "assistant",
          content:
            "Bonjour, je suis votre assistant IA spécialisé en cardiologie.",
          timestamp: "14:32",
        },
        {
          role: "user",
          content:
            "Patient 45 ans, douleur thoracique atypique, antécédents familiaux d’infarctus...",
          timestamp: "14:33",
        },
        {
          role: "assistant",
          content:
            "Merci pour ces informations. Voici quelques pistes cardiologiques.",
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
          content:
            "Palpitations fréquentes depuis 2 semaines, ECG montre des extrasystoles.",
          timestamp: "10:15",
        },
      ],
    },
  ]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

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
    <div className="max-w-7xl mx-auto flex gap-4">
      {/* Liste des discussions */}
      <div className="w-1/4 bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-y-auto h-[80vh]">
       {/* Bouton Nouveau Chat */}
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
              "Bonjour, je suis votre assistant IA spécialisé en cardiologie.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      },
    ]);
    setSelectedChatId(newChatId);
    setShowIntro(false); // cache l'intro et affiche la discussion
  }}
  className="w-full mb-4 px-4 py-2 bg-[#00A7A7] text-white font-semibold rounded-lg hover:bg-[#008B8B] transition flex items-center justify-center gap-2"
>
  <PlusIcon size={18} /> Nouveau Chat
</button>

        <h2 className="text-lg font-semibold mb-4">Historique</h2>
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChatId(chat.id);
                setShowIntro(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#00A7A7]/20 transition ${selectedChatId === chat.id ? "bg-[#00A7A7]/30 font-semibold" : ""
                }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation / Intro IA */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 shadow h-[80vh]">
        {showIntro ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            {/* Cœur avec signal cardiaque animé */}
            <div className="mb-4 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#00A7A7]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Forme du cœur */}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                 6.86-8.55 11.54L12 21.35z"/>
                {/* Signal cardiaque à l’intérieur */}
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
              Bonjour ! Je suis votre assistant IA spécialisé en cardiologie.
              Je peux vous aider à analyser des cas cliniques, interpréter des
              symptômes et proposer des recommandations de base.
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
              className="mt-6 px-6 py-3 bg-[#00A7A7] text-white font-semibold rounded-lg hover:bg-[#008B8B] transition"
            >
              Commencer le chat
            </button>
          </div>
        ) : (
          <>
            {/* Header chat */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between relative">
              <h3 className="font-semibold text-gray-900">
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
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {selectedChat?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl px-4 py-3 shadow ${msg.role === "user"
                        ? "bg-white text-gray-900 rounded-br-none border border-gray-200"
                        : "bg-[#00A7A7] text-white rounded-bl-none"
                      }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`text-xs mt-1 ${msg.role === "user" ? "text-gray-400" : "text-teal-100"
                        }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 px-4 py-4 bg-white">
              <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <div className="flex-1">
                  <div
                    className={`flex flex-col bg-gray-100 rounded-lg overflow-hidden transition-all ${messageFocused ? "bg-[#E0F7F7]" : ""
                      }`}
                  >
                    <div
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${messageFocused ? "border-[#00A7A7]" : "border-gray-300"
                        } bg-gray-100`}
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00A7A7] text-white hover:bg-[#008B8B] disabled:opacity-50"
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
  );
};
