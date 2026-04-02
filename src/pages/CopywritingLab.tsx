import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Type, 
  Sparkles, 
  Check, 
  Copy, 
  RotateCcw, 
  Zap, 
  Target, 
  MessageSquare, 
  ArrowRight,
  Info,
  PenTool,
  FileText,
  Languages,
  Star,
  ShoppingBag,
  CreditCard
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const CopywritingLab = () => {
  const [text, setText] = useState("");
  const [refinedText, setRefinedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const actions = [
    { id: "grammar", label: "Ислоҳи грамматика ва имло", icon: Check, prompt: "Грамматика ва имлои матни зеринро ислоҳ кунед, дар ҳоле ки оҳанги аслиро нигоҳ доред: " },
    { id: "professional", label: "Касбӣ кардан", icon: Target, prompt: "Матни зеринро тавре аз нав нависед, ки касбӣ, бонуфуз ва барои муҳити тиҷорат мувофиқ бошад: " },
    { id: "luxury", label: "Услуби боҳашамат", icon: Star, prompt: "Матни зеринро бо услуби ултра-боҳашамат, мураккаб ва истисноӣ аз нав нависед. Луғати шево ва оҳанги олиҷанобро истифода баред: " },
    { id: "marketplace", label: "Услуби бозор", icon: ShoppingBag, prompt: "Матни зеринро барои бозори онлайни муосир аз нав нависед. Ба равшанӣ, эътимод, ҷомеа ва фоидаҳо ҳам барои харидорон ва ҳам барои фурӯшандагон тамаркуз кунед. Оҳанги ҷолиб ва дастрасро истифода баред: " },
    { id: "fintech", label: "Услуби Финтех", icon: CreditCard, prompt: "Матни зеринро барои платформаи муосири финтех ё бонкии рақамӣ аз нав нависед. Ба амният, эътимоднокӣ, суръат ва соддагӣ тамаркуз кунед. Оҳанги тоза, касбӣ ва боэътимодро истифода баред: " },
    { id: "clear", label: "Кӯтоҳтар ва равшантар", icon: Zap, prompt: "Матни зеринро бидуни гум кардани паёми асосӣ ба таври назаррас кӯтоҳтар ва равшантар кунед: " },
    { id: "improve", label: "Беҳтар ва такмил додан", icon: Sparkles, prompt: "Матни зеринро бо ҷолибтар ва боварибахштар кардан такмил диҳед, аммо ҳамон маъноро нигоҳ доред: " },
  ];

  const handleRefine = async (actionPrompt: string, actionId: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setActiveAction(actionId);
    try {
      // Get the most up-to-date API key
      const apiKey = [process.env.GEMINI_API_KEY, process.env.API_KEY]
        .find(key => key && key !== "MY_GEMINI_API_KEY");

      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: actionPrompt + text,
        config: {
          systemInstruction: "Шумо копирайтер ва муҳаррири маркетингии сатҳи ҷаҳонӣ ҳастед. Ҳадафи шумо такмил додани матн дар асоси дархостҳои мушаххаси корбар аст. Танҳо матни такмилёфтаро бидуни ягон иловаи гуфтугӯӣ пешниҳод кунед."
        }
      });

      setRefinedText(response.text || "Матнро такмил дода натавонистем. Лутфан бори дигар кӯшиш кунед.");
    } catch (error) {
      console.error("Refinement Error:", error);
      setRefinedText("Хатогӣ: Пайвастшавӣ ба муҳаррики СИ ноком шуд. Лутфан пайвасти худро санҷед.");
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-surface pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <PenTool className="w-3 h-3" /> Лабораторияи матн
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
            Паёми худро <br /> <span className="text-brand-accent">Такмил</span> диҳед.
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Муҳаррири мо бо истифода аз СИ барои сайқал додани матнҳои маркетингии шумо, ислоҳи грамматика ё комилан аз нав навиштан барои таъсири ҳадди аксар кӯмак мекунад.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-accent" /> Матни аслии шумо
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{text.length} аломат</span>
              </div>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Матни таблиғотӣ, почта ё сарлавҳаи худро дар ин ҷо гузоред..."
                className="w-full h-64 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none font-medium"
              />
              
              <div className="mt-8 grid grid-cols-2 gap-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleRefine(action.prompt, action.id)}
                    disabled={!text.trim() || isLoading}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      activeAction === action.id 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-brand-accent hover:text-brand-accent"
                    } disabled:opacity-30 disabled:grayscale`}
                  >
                    <action.icon className={`w-4 h-4 ${activeAction === action.id ? "text-brand-accent" : ""}`} />
                    {activeAction === action.id ? "Такмил..." : action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm flex-shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">💡 Маслиҳатҳо барои натиҷаҳои беҳтар</h4>
                <ul className="text-xs text-blue-700 space-y-1 font-medium">
                  <li>• Дар бораи аудиторияи мақсадноки худ мушаххас бошед.</li>
                  <li>• Оҳанги дилхоҳро зикр кунед (дӯстона, ҷиддӣ, академӣ).</li>
                  <li>• Агар дармонда бошед, якчанд вариант талаб кунед.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="relative">
            <div className={`bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl border border-white/10 h-full flex flex-col ${!refinedText && "justify-center items-center text-center"}`}>
              {isLoading ? (
                <div className="space-y-6 w-full">
                  <div className="flex items-center gap-3 text-brand-accent mb-8">
                    <RotateCcw className="w-5 h-5 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-widest">Стратеги СИ дар кор аст...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
                  </div>
                </div>
              ) : refinedText ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold flex items-center gap-2 text-brand-accent">
                      <Sparkles className="w-5 h-5" /> Нусхаи такмилёфта
                    </h3>
                    <button 
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Нусхабардорӣ шуд!" : "Нусхабардории матн"}
                    </button>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl p-6 text-slate-200 font-medium leading-relaxed whitespace-pre-wrap border border-white/5 overflow-y-auto">
                    {refinedText}
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Бо дастгирии Khabbllo Intelligence</p>
                    <button 
                      onClick={() => { setRefinedText(""); setText(""); }}
                      className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      Тоза кардани ҳама
                    </button>
                  </div>
                </>
              ) : (
                <div className="max-w-xs">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Languages className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Омода барои такмил</h3>
                  <p className="text-slate-500 text-sm">
                    Амалеро дар тарафи чап интихоб кунед, то ҷодуи СИ-ро бубинед. Нусхаи такмилёфтаи шумо дар ин ҷо пайдо мешавад.
                  </p>
                </div>
              )}
            </div>
            {/* Decorative background glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/10 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopywritingLab;
