import * as React from "react";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, ShieldCheck, UserPlus, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
      setIsSignUp(true); // Assume signup if coming from the hero "Get Started"
    }
  }, [location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setStatus("success");
        setMessage("Ҳисоб бо муваффақият сохта шуд!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus("success");
        setMessage("Вуруд бо муваффақият анҷом ёфт!");
      }
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Аутентификатсия ноком шуд. Лутфан маълумоти худро тафтиш кунед.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-surface">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-slate-200"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">K</div>
          <h1 className="text-3xl font-extrabold mb-2">{isSignUp ? "Эҷоди ҳисоб" : "Хуш омадед"}</h1>
          <p className="text-brand-muted">{isSignUp ? "Ба ҷомеаи Khabbllo ҳамроҳ шавед" : "Ба ҳисоби Khabbllo-и худ ворид шавед"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Почтаи корӣ</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@shirkat.com"
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Рамз</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={status === "loading"}
            className="w-full cta-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {status === "loading" ? "Коркард..." : (isSignUp ? "Сабти ном" : "Ворид шудан")} 
            {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          {status === "success" && <p className="text-center text-sm font-bold text-green-600">{message}</p>}
          {status === "error" && <p className="text-center text-sm font-bold text-red-600">{message}</p>}
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-sm text-brand-muted mb-4">
            {isSignUp ? "Аллакай ҳисоб доред?" : "Ҳисоб надоред?"}{" "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-brand-accent font-bold hover:underline"
            >
              {isSignUp ? "Ворид шудан" : "Оғози давраи ройгон"}
            </button>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-brand-muted">
            <ShieldCheck className="w-4 h-4" /> Мутобиқати SOC2 ва Бехатар
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
