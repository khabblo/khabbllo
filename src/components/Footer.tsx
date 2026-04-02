import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Hide footer on dashboard
  if (location.pathname === "/dashboard") return null;

  return (
    <footer className="bg-brand-surface pt-20 pb-10 border-t border-slate-200">
      <div className="f-pattern-container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-heading font-bold">K</div>
              <span className="text-xl font-heading font-bold tracking-tighter">Khabllo</span>
            </Link>
            <p className="text-brand-muted text-sm max-w-xs leading-relaxed">
              Пешрафтатарин платформаи зеҳни табдилдиҳӣ дар ҷаҳон. 
              Брендҳоро барои рушд бо эътимод ва возеҳият илҳом мебахшад.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Маҳсулот</h4>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li><Link to="/" className="hover:text-brand-primary">Зеҳн</Link></li>
              <li><Link to="/" className="hover:text-brand-primary">Тести А/Б</Link></li>
              <li><Link to="/" className="hover:text-brand-primary">Интегратсияҳо</Link></li>
              <li><Link to="/" className="hover:text-brand-primary">Нархгузорӣ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Ширкат</h4>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li><Link to="/" className="hover:text-brand-primary">Дар бораи мо</Link></li>
              <li><a href="#" className="hover:text-brand-primary">Карера</a></li>
              <li><a href="#" className="hover:text-brand-primary">Блог</a></li>
              <li><Link to="/login" className="hover:text-brand-primary">Тамос</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Ҳуқуқӣ</h4>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li><a href="#" className="hover:text-brand-primary">Сиёсати махфият</a></li>
              <li><a href="#" className="hover:text-brand-primary">Шартҳои хидматрасонӣ</a></li>
              <li><a href="#" className="hover:text-brand-primary">Сиёсати кукиҳо</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-brand-muted">© 2026 Khabllo Inc. Ҳама ҳуқуқҳо ҳифз шудаанд.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <ShieldCheck className="w-4 h-4" /> Мутобиқи SOC2
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <ShieldCheck className="w-4 h-4" /> Омода ба GDPR
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
