import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  User, 
  MessageSquare, 
  ArrowLeft,
  Users,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  room?: string;
}

const ROOMS = [
  { id: "General", icon: MessageSquare, label: "Маркази Глобалӣ" },
  { id: "Strategy", icon: Sparkles, label: "Стратегияи Рушд" },
  { id: "Copywriting", icon: User, label: "Лабораторияи Копирайтинг" },
  { id: "ROI", icon: Users, label: "Симулятсияи ROI" },
  { id: "Ads", icon: Send, label: "Кампанияҳои Рекламавӣ" }
];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("General");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to the same origin
    socketRef.current = io();

    socketRef.current.on("init_messages", (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });

    socketRef.current.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isJoined && socketRef.current) {
      socketRef.current.emit("join_room", currentRoom);
    }
  }, [isJoined, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && socketRef.current) {
      socketRef.current.emit("send_message", {
        user: username,
        text: input,
        room: currentRoom
      });
      setInput("");
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900/50 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">Чат бо Ҷомеа</h1>
              <p className="text-white/40 text-sm">Ба гуфтугӯ ҳамроҳ шавед</p>
            </div>
          </div>

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">
                Тахаллуси Шумо
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="масалан: GrowthHacker99"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-brand-accent/50 transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-brand-accent text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Вориди Чат
            </button>
          </form>

          <Link to="/" className="mt-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold justify-center">
            <ArrowLeft className="w-4 h-4" /> Бозгашт ба Асосӣ
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Room Selection */}
      <aside className="w-full md:w-72 bg-zinc-900/50 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <Link to="/" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h2 className="font-black uppercase tracking-tighter text-lg">Каналҳо</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            to="/chat"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5 text-brand-accent font-bold border border-brand-accent/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-brand-accent fill-brand-accent" />
            <span className="text-sm uppercase tracking-widest font-black">AI Стратег</span>
          </Link>
          
          <div className="h-px bg-white/5 my-4" />
          
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(room.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                currentRoom === room.id 
                  ? "bg-brand-accent text-black font-bold" 
                  : "hover:bg-white/5 text-white/60"
              }`}
            >
              <room.icon className={`w-4 h-4 ${currentRoom === room.id ? "text-black" : "text-brand-accent"}`} />
              <span className="text-sm uppercase tracking-widest font-black">{room.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Корбари Фаъол</p>
              <p className="text-sm font-bold truncate">{username}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="p-6 border-b border-white/5 bg-black/50 backdrop-blur-md z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="font-black uppercase tracking-tighter text-lg">
                {ROOMS.find(r => r.id === currentRoom)?.label}
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Канали Зинда</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
          <div className="max-w-3xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-2 opacity-30 py-12">
              <Sparkles className="w-8 h-8 mx-auto text-brand-accent" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                Маркази Стратегии {currentRoom}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.user === username ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.user === username ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      {msg.user}
                    </span>
                    <span className="text-[8px] font-bold text-white/20">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`p-5 rounded-3xl max-w-[85%] sm:max-w-[70%] text-sm leading-relaxed ${
                    msg.user === username 
                      ? "bg-brand-accent text-black font-medium rounded-tr-none shadow-[0_0_20px_rgba(242,125,38,0.2)]" 
                      : "bg-zinc-900 border border-white/5 text-white rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <footer className="p-6 bg-black border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Навиштан ба #${currentRoom.toLowerCase()}...`}
                className="w-full bg-zinc-900 border border-white/10 rounded-[2rem] py-6 pl-8 pr-20 text-lg focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-white/20 shadow-2xl"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-brand-accent text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-center mt-4 text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">
              Enter-ро пахш кунед барои фиристодан • Ба дигар стратегҳо эҳтиром гузоред
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatRoom;
