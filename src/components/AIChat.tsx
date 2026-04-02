import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Bot, User, Image as ImageIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; image?: string }[]>([
    { role: "ai", content: "Салом! Ман Khabbllo AI, стратег-маркетологи шумо ҳастам. Ман метавонам ба шумо дар навиштани матнҳо, симулятсияи ROI ва таҳлили дороиҳо кӯмак кунам. Чӣ тавр ман метавонам имрӯз ба шумо дар васеъ кардани тиҷорат кӯмак кунам?" }
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; data: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({
          name: file.name,
          type: file.type,
          data: reader.result as string
        });
      };
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
        reader.readAsText(file);
      }
    }
  };

  const handleSend = async (e?: React.FormEvent, imageUrl?: string) => {
    if (e) e.preventDefault();
    
    const currentInput = input.trim();
    const currentFile = imageUrl 
      ? { name: "uploaded-image", type: "image/png", data: imageUrl } 
      : selectedFile;

    if ((!currentInput && !currentFile) || isLoading) return;

    const userMessage = currentInput;
    const userFile = currentFile;
    
    setInput("");
    setSelectedFile(null);
    setMessages(prev => [...prev, { 
      role: "user", 
      content: userMessage, 
      image: userFile?.type.startsWith('image/') ? userFile.data : undefined 
    }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("Калиди API мавҷуд нест. Лутфан тағйирёбандаҳои муҳити худро тафтиш кунед.");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      let aiResponseText = "";
      let aiResponseImage = "";

      if (userFile?.type.startsWith('image/')) {
        // Use gemini-3.1-flash-image-preview for high-quality image analysis/editing
        const base64Data = userFile.data.split(",")[1];
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image-preview",
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64Data, mimeType: userFile.type } },
                { text: userMessage || "Ин дороии маркетингиро таҳлил кунед ва такмилдиҳиро барои табдили баландтар пешниҳод кунед." }
              ]
            }
          ],
          config: {
            systemInstruction: "Шумо Khabbllo AI, стратег-маркетологи визуалии сатҳи ҷаҳонӣ ҳастед. Тасвирҳоро барои потенсиали табдил, мувофиқати бренд ва таъсири психологӣ таҳлил кунед. Ҳамеша бо забони тоҷикӣ ҷавоб диҳед."
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
        // Standard text chat or JSON analysis
        const prompt = userFile?.type === 'application/json' || userFile?.name.endsWith('.json')
          ? `Ин маълумоти JSON-ро таҳлил кунед: ${userFile.data}\n\nДархости корбар: ${userMessage || "Ин маълумотро таҳлил кунед."}`
          : userMessage;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            systemInstruction: `Шумо Khabbllo AI, стратег-маркетологи сатҳи ҷаҳонӣ ва Growth Hacker ҳастед. 
            Ҳадафи шумо кӯмак ба корбарон дар васеъ кардани тиҷорати онҳо бо истифода аз психология, боваркунонӣ ва маълумот мебошад.
            Шумо коршинос дар соҳаҳои зерин ҳастед:
            - Копирайтинг (AIDA, PAS, Storytelling)
            - Оптимизатсияи суръати табдил (CRO)
            - Симулятсияи ROI ва моделсозии молиявӣ
            - SEO ва стратегияи мундариҷа
            - Рекламаи пулакӣ (Meta, Google, TikTok)
            
            Ҳамеша маслиҳатҳои амалӣ ва сатҳи баланд диҳед. Профессионал, мустақим ва эҷодкор бошед. Ҳамеша бо забони тоҷикӣ ҷавоб диҳед.`
          }
        });
        aiResponseText = response.text || "Бубахшед, ман натавонистам барои ин дархост стратегия таҳия кунам. Лутфан кӯшиш кунед, ки онро дигар хел баён кунед.";
      }

      setMessages(prev => [...prev, { 
        role: "ai", 
        content: aiResponseText || (aiResponseImage ? "Ин акси таҳриршудаи шумо!" : ""), 
        image: aiResponseImage || undefined 
      }]);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      const errorMessage = error?.message || "Хатогии номаълум рух дод.";
      setMessages(prev => [...prev, { role: "ai", content: `Ман бо хатогӣ рӯ ба рӯ шудам: ${errorMessage}. Лутфан бори дигар кӯшиш кунед.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-black/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Khabbllo AI</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Стратег-маркетолог</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link 
                  to="/chat" 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1"
                >
                  Саҳифаи пурра
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-black text-white" : "bg-brand-accent text-white"}`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user" ? "bg-black text-white rounded-tr-none" : "bg-white border border-black/5 rounded-tl-none text-slate-700"}`}>
                      {msg.image && (
                        <img 
                          src={msg.image} 
                          alt="Uploaded/Edited" 
                          className="rounded-lg mb-2 max-w-full h-auto border border-black/5" 
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center animate-pulse">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-black/5 shadow-sm rounded-tl-none flex gap-1 items-center">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      <span className="text-xs text-slate-400 font-medium italic">Стратегия таҳия шуда истодааст...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="px-4 py-2 bg-white border-t border-black/5 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white shadow-2xl bg-slate-50 flex items-center justify-center">
                  {selectedFile.type.startsWith('image/') ? (
                    <img src={selectedFile.data} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-[10px] font-bold text-slate-400 uppercase text-center p-1">JSON</div>
                  )}
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-0 right-0 bg-black/80 text-white p-1 rounded-bl-lg hover:bg-red-500 transition-colors"
                    title="Delete"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">
                  {selectedFile.type.startsWith('image/') ? "Акс барои таҳрир омода аст..." : `Файли ${selectedFile.name} боргузорӣ шуд...`}
                </p>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-black/5 bg-white">
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*,.json" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                  title="Боргузории файл"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Савол диҳед ё таҳрирро тавсиф кунед..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-black/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={(!input.trim() && !selectedFile) || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-lg disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isOpen ? "bg-white text-black border border-black/10" : "cta-gradient text-white"}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"
          />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
