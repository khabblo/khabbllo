import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Image as ImageIcon, 
  Loader2, 
  ArrowLeft,
  Trash2,
  Brain,
  Rocket,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

const AIChatPage = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; image?: string }[]>([
    { 
      role: "ai", 
      content: "Ба Маркази фармондеҳии маркетинги Khabllo AI хуш омадед. Ман стратеги маркетинги сатҳи баланди шумо ҳастам. Новобаста аз он ки ба шумо таҳлили сарлавҳа, симулятсияи ROI ё таҳияи маъракаи виралӣ лозим аст, ман дар ин ҷо ҳастам, то кӯмак кунам. Имрӯз чӣ гуна метавонем тиҷорати шуморо васеъ кунем?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e?: React.FormEvent, imageUrl?: string) => {
    if (e) e.preventDefault();
    
    const currentInput = input.trim();
    const currentImage = imageUrl || selectedImage;

    if ((!currentInput && !currentImage) || isLoading) return;

    const userMessage = currentInput;
    const userImage = currentImage;
    
    setInput("");
    setSelectedImage(null);
    setMessages(prev => [...prev, { role: "user", content: userMessage, image: userImage || undefined }]);
    setIsLoading(true);

    try {
      // Check if we need to select a key for the image model
      if (userImage) {
        const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
        if (!hasKey) {
          await (window as any).aistudio?.openSelectKey?.();
        }
      }

      // Get the most up-to-date API key
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("Калиди API мавҷуд нест. Лутфан дар танзимот калиди худро интихоб кунед ё тафтиш кунед.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      let aiResponseText = "";
      let aiResponseImage = "";

      if (userImage) {
        // Use gemini-3.1-flash-image-preview for high-quality image analysis/editing
        const base64Data = userImage.split(",")[1];
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image-preview",
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64Data, mimeType: "image/png" } },
                { text: userMessage || "Ин дороии маркетингро таҳлил кунед ва такмилдиҳиро барои табдили баландтар пешниҳод кунед." }
              ]
            }
          ],
          config: {
            systemInstruction: "Шумо Khabllo AI ҳастед, стратеги маркетинги визуалии сатҳи ҷаҳонӣ. Тасвирҳоро барои потенсиали табдилдиҳӣ, мувофиқати бренд ва таъсири психологӣ таҳлил кунед."
          }
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData) {
              aiResponseImage = `data:image/png;base64,${part.inlineData.data}`;
            } else if (part.text) {
              aiResponseText += part.text;
            }
          }
        }
      } else {
        // Standard text chat with gemini-3-flash-preview for maximum reliability
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: userMessage,
          config: {
            systemInstruction: `Шумо Khabllo AI ҳастед, стратеги маркетинги сатҳи ҷаҳонӣ ва Growth Hacker. 
            Ҳадафи шумо кӯмак ба корбарон дар васеъ кардани тиҷорати онҳо бо истифода аз психология, боваркунонӣ ва маълумот мебошад.
            Шумо коршинос дар соҳаҳои зерин ҳастед:
            - Копирайтинг (AIDA, PAS, Storytelling)
            - Оптимизатсияи сатҳи табдилдиҳӣ (CRO)
            - Симулятсияи ROI ва моделсозии молиявӣ
            - SEO ва стратегияи мундариҷа
            - Рекламаи пулакӣ (Meta, Google, TikTok)
            
            Ҳамеша маслиҳатҳои амалӣ ва сатҳи баланд диҳед. Профессионал, мустақим ва эҷодкор бошед. 
            Агар корбар таҳлили сарлавҳаро талаб кунад, интиқодӣ бошед ва такмилдиҳиро пешниҳод кунед.
            Агар онҳо симулятсияи ROI-ро талаб кунанд, рақамҳои онҳоро (CPA, LTV, CR) пурсед.`
          }
        });
        aiResponseText = response.text || "Бубахшед, ман натавонистам барои ин дархост стратегия тавлид кунам. Лутфан кӯшиш кунед, ки дархостро дигар кунед.";
      }

      setMessages(prev => [...prev, { 
        role: "ai", 
        content: aiResponseText || (aiResponseImage ? "Ин таҳлили ман дар бораи дороии шумост!" : ""), 
        image: aiResponseImage || undefined 
      }]);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      const errorMessage = error?.message || "Хатогии номаълум рух дод.";
      setMessages(prev => [...prev, { role: "ai", content: `Ман ба хатогӣ дучор шудам: ${errorMessage}. Лутфан бори дигар кӯшиш кунед.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ 
      role: "ai", 
      content: "Маркази фармондеҳӣ аз нав танзим карда шуд. Барои ҳадафи маркетингии навбатии шумо омода аст." 
    }]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col pt-20">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/academy" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(242,125,38,0.4)]">
                <Sparkles className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">Маркази фармондеҳӣ</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Стратеги СИ фаъол аст</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all text-xs font-medium border border-white/5"
          >
            <Trash2 className="w-4 h-4" />
            Тоза кардани таърих
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg ${msg.role === "user" ? "bg-white text-black" : "bg-brand-accent text-white"}`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-xl border ${msg.role === "user" ? "bg-white text-black border-white/10 rounded-tr-none" : "bg-white/5 border-white/10 rounded-tl-none text-slate-200 backdrop-blur-sm"}`}>
                  {msg.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <img 
                        src={msg.image} 
                        alt="Дороии маркетинг" 
                        className="max-w-full h-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-xl rounded-tl-none flex gap-3 items-center backdrop-blur-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-accent" />
                  <span className="text-sm text-slate-400 font-medium italic">Стратегиясозӣ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Actions */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            { icon: Brain, text: "Таҳлили сарлавҳа", prompt: "Метавонед ин сарлавҳаро барои табдилдиҳӣ таҳлил кунед: " },
            { icon: Target, text: "Симулятсияи ROI", prompt: "Ба ман кӯмак кунед, ки ROI-ро барои кампания бо буҷаи $1000 симулятсия кунам." },
            { icon: Zap, text: "Тарҳи матни реклама", prompt: "3 варианти матни рекламаи Meta-ро барои барномаи сайёҳии боҳашамат таҳия кунед." },
            { icon: Rocket, text: "Стратегияи рушд", prompt: "Стратегияи рушди сатҳи баланд барои SaaS-и нав чист?" }
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => setInput(action.prompt)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105"
            >
              <action.icon className="w-3 h-3 text-brand-accent" />
              {action.text}
            </button>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-2xl p-6">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white shadow-2xl">
                <img src={selectedImage} alt="Пешнамоиш" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 bg-black/80 text-white p-1 rounded-bl-lg hover:bg-red-500 transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Дороии боршуда</p>
                <p className="text-xs text-slate-400">Таҳлил ё таҳриреро, ки ба шумо лозим аст, тавсиф кунед.</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSend} className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-brand-accent/50 transition-all shadow-2xl">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                title="Боргузории дороии маркетинг"
              >
                <ImageIcon className="w-6 h-6" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ҳадафи маркетингии худро нависед..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 font-medium"
              />
              <button 
                type="submit"
                disabled={(!input.trim() && !selectedImage) || isLoading}
                className="p-4 bg-brand-accent text-white rounded-xl disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(242,125,38,0.3)]"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            Аз ҷониби Khabllo AI Strategist • Муҳаррики табдилдиҳии сатҳи баланд
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIChatPage;

const X = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
