import * as React from "react";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, LayoutDashboard, User, Sparkles, PenTool, Search, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search logic or navigate to search page
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  // Hide navbar on reels and academy (academy has its own dark theme)
  if (location.pathname === "/reels" || location.pathname === "/academy") return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="f-pattern-container flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-display font-black text-xl group-hover:scale-105 transition-transform shadow-lg shadow-brand-primary/10">K</div>
            <span className="text-2xl font-display font-black tracking-tighter uppercase hidden sm:block">Khabllo</span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex relative items-center group">
            <Search className="absolute left-3 w-4 h-4 text-brand-muted group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Ҷустуҷӯи маҳсулот, дарсҳо..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-xl text-sm w-[250px] focus:w-[350px] focus:bg-white focus:border-brand-accent/30 focus:outline-none transition-all duration-300"
            />
          </form>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-brand-muted">
          <Link to="/" className="hover:text-brand-primary transition-colors">Асосӣ</Link>
          <a href="/#features" className="hover:text-brand-primary transition-colors">Имкониятҳо</a>
          <a href="/#how-it-works" className="hover:text-brand-primary transition-colors">Чӣ тавр кор мекунад</a>
          <a href="/#pricing" className="hover:text-brand-primary transition-colors">Нархгузорӣ</a>
          <a href="/#faq" className="hover:text-brand-primary transition-colors">Саволҳо</a>
          <a href="/#contact" className="hover:text-brand-primary transition-colors">Тамос</a>
          <Link to="/social" className="text-brand-accent font-bold hover:text-brand-primary transition-colors">Иҷтимоӣ</Link>
          <Link to="/reels" className="px-3 py-1.5 bg-slate-100/50 rounded-lg text-brand-primary font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
            Видеоҳо
          </Link>
          <Link to="/chat" className="px-3 py-1.5 bg-brand-accent/10 rounded-lg text-brand-accent font-bold hover:bg-brand-accent/20 transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-brand-accent" /> СИ
          </Link>
          <Link to="/community" className="text-brand-accent font-bold hover:text-brand-primary transition-colors">Ҷомеа</Link>
          <Link to="/marketplace-showcase" className="text-brand-accent font-bold hover:text-brand-primary transition-colors">Бозор</Link>
          <Link to="/dropshipping" className="text-brand-accent font-bold hover:text-brand-primary transition-colors">Dropshipping</Link>
          <Link to="/academy" className="text-brand-primary font-black uppercase tracking-widest text-[9px] bg-brand-accent px-2 py-0.5 rounded-full hover:scale-105 transition-transform">Академия</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 hover:text-brand-accent transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Панел
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                <User className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-bold truncate max-w-[120px]">{user.email}</span>
              </div>
              <Link 
                to="/settings"
                className="p-2 text-brand-muted hover:text-brand-accent transition-colors"
                title="Танзимот"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                title="Баромад"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold px-4 py-2 hover:text-brand-accent transition-colors">Воридшавӣ</Link>
              <Link to="/login" className="cta-gradient text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                Оғози ройгон
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t p-6 flex flex-col gap-4 md:hidden shadow-xl">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="relative flex items-center group mb-2">
            <Search className="absolute left-3 w-4 h-4 text-brand-muted" />
            <input 
              type="text" 
              placeholder="Ҷустуҷӯ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-brand-accent/30 focus:outline-none transition-all"
            />
          </form>
          
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Асосӣ</Link>
          <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Имкониятҳо</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Чӣ тавр кор мекунад</a>
          <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Нархгузорӣ</a>
          <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Саволҳо</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Тамос</a>
          <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Ҷомеа</Link>
          <Link to="/villages" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Қишлоқҳо</Link>
          <Link to="/marketplace-showcase" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Бозор</Link>
          <Link to="/dropshipping" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Dropshipping</Link>
          <Link to="/pay" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Khabbllopay</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Панел</Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Танзимот</Link>
              <button onClick={handleLogout} className="text-lg font-medium text-red-500 text-left">Баромад</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Воридшавӣ</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="cta-gradient text-white font-bold py-3 rounded-xl text-center">Оғоз кунед</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
