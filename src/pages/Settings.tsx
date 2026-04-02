import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save, 
  ChevronRight, 
  Camera,
  Check,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  onAuthStateChanged,
  handleFirestoreError,
  OperationType,
  User as FirebaseUser
} from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    photoURL: "",
    notifications: true,
    theme: "light"
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        try {
          const userDoc = await getDoc(doc(db, "users", u.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProfile({
              displayName: data.displayName || u.displayName || "",
              bio: data.bio || "",
              photoURL: data.photoURL || u.photoURL || "",
              notifications: data.notifications ?? true,
              theme: data.theme || "light"
            });
          } else {
            setProfile(prev => ({
              ...prev,
              displayName: u.displayName || "",
              photoURL: u.photoURL || ""
            }));
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${u.uid}`);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
      </div>
    );
  }

  const sections = [
    { id: "profile", label: "Профил", icon: <User className="w-5 h-5" /> },
    { id: "notifications", label: "Огоҳиномаҳо", icon: <Bell className="w-5 h-5" /> },
    { id: "security", label: "Амният", icon: <Shield className="w-5 h-5" /> },
    { id: "appearance", label: "Намуди зоҳирӣ", icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="f-pattern-container max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/social" className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Танзимот</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-accent/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:text-brand-accent transition-colors">
                    {s.icon}
                  </div>
                  <span className="font-bold text-slate-700">{s.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-accent transition-colors" />
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Profile Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-black mb-8">Профили оммавӣ</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <img 
                      src={profile.photoURL || "https://picsum.photos/seed/user/200/200"} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
                      referrerPolicy="no-referrer"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-brand-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{profile.displayName || "Корбар"}</p>
                    <p className="text-sm text-brand-muted">Акс ва тафсилоти шахсии худро навсозӣ кунед.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Номи намоишӣ</label>
                    <input 
                      type="text" 
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Афзалияти мавзӯъ</label>
                    <select 
                      value={profile.theme}
                      onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all appearance-none"
                    >
                      <option value="light">Ҳолати равшан</option>
                      <option value="dark">Ҳолати торик</option>
                      <option value="system">Пешфарзи система</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Дар бораи худ</label>
                  <textarea 
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Дар бораи худ ба ҷомеа нақл кунед..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold">Огоҳиномаҳои почтаи электронӣ</p>
                    <p className="text-xs text-brand-muted">Дар бораи постҳо ва фаъолияти худ навсозиҳо гиред.</p>
                  </div>
                  <button 
                    onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${profile.notifications ? "bg-brand-accent" : "bg-slate-300"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.notifications ? "left-7" : "left-1"}`}></div>
                  </button>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="cta-gradient text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Захираи тағйирот
                </button>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-600 font-bold"
                  >
                    <Check className="w-5 h-5" />
                    Бомуваффақият захира шуд
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-red-600 font-black mb-2">Минтақаи хатарнок</h3>
              <p className="text-sm text-red-500 mb-6">Пас аз нест кардани ҳисоби худ, роҳи бозгашт нест. Лутфан мутмаин бошед.</p>
              <button className="px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                Нест кардани ҳисоб
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
