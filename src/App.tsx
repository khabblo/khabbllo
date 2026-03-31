/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  Menu,
  X,
  Star,
  TrendingUp,
  Target,
  Layers
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="f-pattern-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">K</div>
          <span className="text-2xl font-display font-extrabold tracking-tighter">Khabbllo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <a href="#features" className="hover:text-brand-primary transition-colors">Features</a>
          <a href="#solutions" className="hover:text-brand-primary transition-colors">Solutions</a>
          <a href="#testimonials" className="hover:text-brand-primary transition-colors">Success Stories</a>
          <a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-semibold px-4 py-2 hover:text-brand-accent transition-colors">Log in</button>
          <button className="cta-gradient text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
            Start Free Trial
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-t p-6 flex flex-col gap-4 md:hidden shadow-xl"
        >
          <a href="#features" className="text-lg font-medium">Features</a>
          <a href="#solutions" className="text-lg font-medium">Solutions</a>
          <a href="#testimonials" className="text-lg font-medium">Success Stories</a>
          <button className="cta-gradient text-white font-bold py-3 rounded-xl">Get Started</button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="f-pattern-container relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brand-accent uppercase bg-blue-50 rounded-full border border-blue-100">
            The Intelligence Layer for High-Growth Brands
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
            Turn Every Click Into <br />
            <span className="text-brand-accent">Predictable Revenue.</span>
          </h1>
          <p className="text-xl text-brand-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Khabbllo uses proprietary AI to identify conversion friction in real-time, 
            optimizing your funnel for maximum ROI while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="cta-gradient text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl shadow-blue-500/30 flex items-center gap-2 group">
              Scale My Conversions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-brand-primary border border-slate-200 text-lg font-bold px-10 py-4 rounded-full hover:bg-slate-50 transition-colors">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-brand-muted font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> 14-Day Free Trial
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visual Direction: Dashboard Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-20 relative max-w-5xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 p-2">
          <img 
            src="https://picsum.photos/seed/dashboard/1200/800" 
            alt="Khabbllo Intelligence Dashboard" 
            className="rounded-xl w-full object-cover aspect-video"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Floating Elements for "Premium" feel */}
        <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-lg hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-600"><TrendingUp className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-brand-muted">Conversion Lift</p>
              <p className="text-lg font-bold">+42.8%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-slate-100 bg-brand-surface">
    <div className="f-pattern-container">
      <p className="text-center text-xs font-bold text-brand-muted uppercase tracking-widest mb-8">
        Trusted by 500+ high-growth teams worldwide
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['Stripe', 'Airbnb', 'HubSpot', 'Shopify', 'Slack'].map((brand) => (
          <span key={brand} className="text-2xl font-display font-black tracking-tighter">{brand}</span>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-24 bg-white">
    <div className="f-pattern-container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Stop Guessing. <br />
            Start Growing.
          </h2>
          <p className="text-lg text-brand-muted mb-8 leading-relaxed">
            Most brands waste 60% of their ad spend on traffic that never converts because of 
            invisible friction points. You're losing money every second your funnel isn't optimized.
          </p>
          <ul className="space-y-4">
            {[
              "High bounce rates on landing pages",
              "Cart abandonment at the final step",
              "Unclear value propositions that confuse users",
              "Mobile experiences that frustrate customers"
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-red-50 rounded-full text-red-500"><X className="w-4 h-4" /></div>
                <span className="font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <BarChart3 className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Data Blindness</h3>
              <p className="text-sm text-brand-muted">Numbers without context are just noise.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <Zap className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Slow Iteration</h3>
              <p className="text-sm text-brand-muted">Waiting weeks for A/B test results is a death sentence.</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <Users className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">User Friction</h3>
              <p className="text-sm text-brand-muted">One bad click can lose a customer forever.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <ShieldCheck className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Trust Gaps</h3>
              <p className="text-sm text-brand-muted">If they don't trust you, they won't buy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="py-24 bg-brand-primary text-white overflow-hidden" id="features">
    <div className="f-pattern-container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Built for Performance.</h2>
        <p className="text-slate-400 text-lg">
          Khabbllo isn't just a tool; it's your unfair advantage in a crowded market.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Target className="w-8 h-8" />,
            title: "Precision Targeting",
            desc: "Identify exactly which segments are converting and why, with 99% accuracy."
          },
          {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Real-Time Lift",
            desc: "Our AI automatically adjusts UI elements to match user intent in milliseconds."
          },
          {
            icon: <Layers className="w-8 h-8" />,
            title: "Seamless Integration",
            desc: "Connects with your existing stack in 2 minutes. No heavy coding required."
          }
        ].map((benefit, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
            <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white" id="testimonials">
    <div className="f-pattern-container">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Real Results from Real Brands.</h2>
          <p className="text-lg text-brand-muted">Don't take our word for it. See how Khabbllo is transforming businesses.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
          <div className="flex">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
          </div>
          <span className="font-bold text-brand-primary">4.9/5 on G2 Crowd</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            quote: "Khabbllo paid for itself within the first 48 hours. We saw a 34% increase in checkout completions without changing our ad spend.",
            author: "Sarah Jenkins",
            role: "Head of Growth, LuxeWear",
            avatar: "https://picsum.photos/seed/sarah/100/100"
          },
          {
            quote: "The AI insights are scary accurate. It found friction points in our mobile flow that we've been missing for years.",
            author: "Marcus Chen",
            role: "CEO, TechFlow SaaS",
            avatar: "https://picsum.photos/seed/marcus/100/100"
          }
        ].map((t, idx) => (
          <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 relative">
            <p className="text-xl font-medium mb-8 italic text-slate-700">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-brand-primary">{t.author}</p>
                <p className="text-sm text-brand-muted">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24">
    <div className="f-pattern-container">
      <div className="cta-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/40">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to Scale?</h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join 500+ brands using Khabbllo to dominate their market. 
            Start your 14-day free trial today. No risk, all reward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-white text-brand-accent text-xl font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-xl">
              Get Started Now
            </button>
            <p className="text-sm font-medium text-blue-200">
              Questions? <a href="#" className="underline text-white hover:text-blue-100">Talk to an expert</a>
            </p>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-surface pt-20 pb-10 border-t border-slate-200">
    <div className="f-pattern-container">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <span className="text-xl font-display font-bold tracking-tighter">Khabbllo</span>
          </div>
          <p className="text-brand-muted text-sm max-w-xs leading-relaxed">
            The world's most advanced conversion intelligence platform. 
            Empowering brands to grow with confidence and clarity.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-brand-muted">
            <li><a href="#" className="hover:text-brand-primary">Intelligence</a></li>
            <li><a href="#" className="hover:text-brand-primary">A/B Testing</a></li>
            <li><a href="#" className="hover:text-brand-primary">Integrations</a></li>
            <li><a href="#" className="hover:text-brand-primary">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-brand-muted">
            <li><a href="#" className="hover:text-brand-primary">About Us</a></li>
            <li><a href="#" className="hover:text-brand-primary">Careers</a></li>
            <li><a href="#" className="hover:text-brand-primary">Blog</a></li>
            <li><a href="#" className="hover:text-brand-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-brand-muted">
            <li><a href="#" className="hover:text-brand-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-primary">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-brand-muted">© 2026 Khabbllo Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <ShieldCheck className="w-4 h-4" /> SOC2 Compliant
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <ShieldCheck className="w-4 h-4" /> GDPR Ready
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-brand-accent">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSection />
        <Benefits />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <button className="w-full cta-gradient text-white font-bold py-4 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-2">
          Start Free Trial <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
