import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  PlusSquare, 
  LogOut, 
  User as UserIcon, 
  X, 
  Send, 
  Image as ImageIcon,
  Loader2,
  MoreHorizontal,
  Bookmark,
  Camera,
  Settings as SettingsIcon,
  Users
} from "lucide-react";
import { 
  auth, 
  db, 
  loginWithGoogle, 
  logout, 
  onAuthStateChanged,
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  increment, 
  deleteDoc, 
  serverTimestamp, 
  Timestamp,
  handleFirestoreError,
  OperationType,
  User,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from "../lib/firebase";

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: Timestamp;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Timestamp;
}

const SocialPlatform = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"feed" | "grid" | "members" | "reels">("feed");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activePostComments, setActivePostComments] = useState<string | null>(null);
  const [collaborationUser, setCollaborationUser] = useState<any | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [showHeart, setShowHeart] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastTap = useRef<{ id: string, time: number }>({ id: "", time: 0 });

  const handleDoubleTap = (postId: string) => {
    const now = Date.now();
    if (lastTap.current.id === postId && now - lastTap.current.time < 300) {
      if (!userLikes[postId]) handleLike(postId);
      setShowHeart(postId);
      setTimeout(() => setShowHeart(null), 1000);
    }
    lastTap.current = { id: postId, time: now };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Sync user profile to Firestore
        const userRef = doc(db, "users", u.uid);
        setDoc(userRef, {
          uid: u.uid,
          displayName: u.displayName || "Anonymous",
          photoURL: u.photoURL || "",
          createdAt: serverTimestamp(),
        }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${u.uid}`));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(fetchedPosts);
    }, (err) => handleFirestoreError(err, OperationType.LIST, "posts"));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (viewMode === "reels") {
      const q = query(collection(db, "reels"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setReels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (err) => handleFirestoreError(err, OperationType.LIST, "reels"));
      return () => unsubscribe();
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === "members") {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (err) => handleFirestoreError(err, OperationType.LIST, "users"));
      return () => unsubscribe();
    }
  }, [viewMode]);

  useEffect(() => {
    if (!user || posts.length === 0) return;
    
    const fetchLikes = async () => {
      const likesMap: Record<string, boolean> = {};
      // Fetch likes in parallel for better performance
      const likePromises = posts.map(async (post) => {
        const likeRef = doc(db, "posts", post.id, "likes", user.uid);
        const likeDoc = await getDoc(likeRef);
        if (likeDoc.exists()) {
          likesMap[post.id] = true;
        }
      });
      await Promise.all(likePromises);
      setUserLikes(likesMap);
    };
    
    fetchLikes();
  }, [user, posts]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setUploadImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!user || !selectedFile || isUploading) return;
    setIsUploading(true);
    try {
      const fileRef = ref(storage, `posts/${user.uid}/${Date.now()}_${selectedFile.name}`);
      const uploadResult = await uploadBytes(fileRef, selectedFile);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      const postData = {
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        authorPhoto: user.photoURL || "",
        imageUrl: downloadUrl,
        caption: caption,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), postData);
      setIsUploadOpen(false);
      setUploadImage(null);
      setSelectedFile(null);
      setCaption("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "posts");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return loginWithGoogle();
    const postRef = doc(db, "posts", postId);
    const likeRef = doc(db, "posts", postId, "likes", user.uid);
    
    try {
      const likeDoc = await getDoc(likeRef);
      if (likeDoc.exists()) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likesCount: increment(-1) });
        setUserLikes(prev => ({ ...prev, [postId]: false }));
      } else {
        await setDoc(likeRef, { userId: user.uid, postId, createdAt: serverTimestamp() });
        await updateDoc(postRef, { likesCount: increment(1) });
        setUserLikes(prev => ({ ...prev, [postId]: true }));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `posts/${postId}/likes/${user.uid}`);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user || !commentText.trim()) return;
    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        text: commentText,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "posts", postId), { commentsCount: increment(1) });
      setCommentText("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `posts/${postId}/comments`);
    }
  };

  const openComments = (postId: string) => {
    setActivePostComments(postId);
    const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment)));
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header - Glassmorphism */}
        <div className="flex items-center justify-between mb-8 bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] sticky top-24 z-40">
          <div className="flex flex-col">
            <h2 className="text-2xl font-display font-black tracking-tighter text-slate-900 leading-none uppercase">Khabllo</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">Ҷомеаи рақамӣ</p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
            <button 
              onClick={() => setViewMode("feed")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "feed" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              Навор
            </button>
            <button 
              onClick={() => setViewMode("reels")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "reels" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              Рилсҳо
            </button>
            <button 
              onClick={() => setViewMode("members")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "members" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              Ҷомеа
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              Галерея
            </button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => setIsUploadOpen(true)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                >
                  <PlusSquare className="w-5 h-5 text-white" />
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-1" />
                <div className="flex items-center gap-3">
                  <Link to="/settings">
                    <img src={user.photoURL || ""} alt="Me" className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm object-cover" referrerPolicy="no-referrer" />
                  </Link>
                  <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={loginWithGoogle}
                className="cta-gradient text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/20"
              >
                Ҳоло ҳамроҳ шавед
              </button>
            )}
          </div>
        </div>

        {/* Feed / Grid / Members / Reels View */}
        {viewMode === "feed" ? (
          <div className="max-w-xl mx-auto space-y-12">
            {/* Create Post Card */}
            {user ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-500/30 transition-all group"
                onClick={() => setIsUploadOpen(true)}
              >
                <img 
                  src={user.photoURL || ""} 
                  alt="Me" 
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm" 
                  referrerPolicy="no-referrer" 
                />
                <div className="flex-1 bg-slate-50 rounded-2xl px-6 py-3 text-slate-400 text-sm font-medium group-hover:bg-slate-100 transition-colors">
                  Чизе мубодила кунед, {user.displayName?.split(' ')[0]}...
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <PlusSquare className="w-5 h-5" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20 text-center"
              >
                <h3 className="text-xl font-black mb-2">Ҷомеаи моро ҳамроҳӣ кунед</h3>
                <p className="text-blue-100 text-sm mb-6">Барои мубодилаи аксҳо ва пайваст шудан бо дигарон ворид шавед.</p>
                <button 
                  onClick={loginWithGoogle}
                  className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all active:scale-95"
                >
                  Ҳоло ворид шавед
                </button>
              </motion.div>
            )}

            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden group"
              >
                {/* Post Header */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={post.authorPhoto} alt={post.authorName} className="w-11 h-11 rounded-2xl border-2 border-slate-50 object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{post.authorName}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Офарандаи тасдиқшуда</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
                </div>

                {/* Post Image */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden" onClick={() => handleDoubleTap(post.id)}>
                  <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <AnimatePresence>
                    {showHeart === post.id && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                      >
                        <Heart className="w-24 h-24 text-white fill-current drop-shadow-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Post Actions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`transition-all active:scale-150 ${userLikes[post.id] ? "text-red-500" : "text-slate-900 hover:text-red-500"}`}
                      >
                        <Heart className={`w-7 h-7 ${userLikes[post.id] ? "fill-current" : ""}`} />
                      </button>
                      <button 
                        onClick={() => openComments(post.id)}
                        className="text-slate-900 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="w-7 h-7" />
                      </button>
                      <button className="text-slate-900 hover:text-blue-500 transition-colors">
                        <Share2 className="w-7 h-7" />
                      </button>
                    </div>
                    <button className="text-slate-900 hover:text-blue-500 transition-colors">
                      <Bookmark className="w-7 h-7" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="font-black text-sm text-slate-900">{post.likesCount.toLocaleString()} писанд</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-black mr-2 text-slate-900">{post.authorName}</span>
                      {post.caption}
                    </p>
                    
                    {post.commentsCount > 0 && (
                      <button 
                        onClick={() => openComments(post.id)}
                        className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-slate-600 transition-colors"
                      >
                        Дидани {post.commentsCount} шарҳ
                      </button>
                    )}
                    
                    <p className="text-[10px] text-slate-300 uppercase font-black tracking-tighter pt-2">
                      {post.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : viewMode === "reels" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {reels.map((reel, idx) => (
              <Link 
                key={reel.id} 
                to="/reels" 
                className="relative aspect-[9/16] rounded-3xl overflow-hidden group shadow-lg"
              >
                {reel.mediaType === "video" ? (
                  <video src={reel.mediaUrl} className="w-full h-full object-cover" />
                ) : (
                  <img src={reel.mediaUrl} alt="Reel" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold">{reel.likesCount}</span>
                  </div>
                  <p className="text-white text-[10px] font-medium line-clamp-2">{reel.caption}</p>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            ))}
            {reels.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <Camera className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Ҳеҷ рилс ёфт нашуд.</p>
                <Link to="/reels" className="text-blue-500 font-bold text-sm mt-2 inline-block">Аввалин рилсро эҷод кунед</Link>
              </div>
            )}
          </div>
        ) : viewMode === "members" ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-xl font-heading font-bold tracking-tight">Аъзоёни ҷомеа</h3>
                <p className="text-sm text-slate-400">Бо одамони ҳамфикр барои лоиҳаҳои нав ҳамкорӣ кунед.</p>
              </div>
              <div className="relative max-w-xs w-full">
                <input 
                  type="text" 
                  placeholder="Ҷустуҷӯи аъзоён..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Аъзо</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Био / Тахассус</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Санаи ҳамроҳшавӣ</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Амал</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {members
                      .filter(m => m.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || m.bio?.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={member.photoURL || `https://ui-avatars.com/api/?name=${member.displayName}&background=random`} 
                              alt={member.displayName} 
                              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-bold text-sm text-slate-900">{member.displayName}</p>
                              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Фаъол</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 max-w-xs truncate">
                            {member.bio || "Ин аъзо то ҳол био илова накардааст."}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-400 font-medium">
                            {member.createdAt?.toDate().toLocaleDateString() || "Чанд вақт пеш"}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setCollaborationUser(member)}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 opacity-0 group-hover:opacity-100"
                          >
                            Ҳамкорӣ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {members.length === 0 && (
                <div className="p-20 text-center">
                  <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Ҳеҷ аъзо ёфт нашуд.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative aspect-square rounded-3xl overflow-hidden group cursor-pointer ${idx % 5 === 0 ? "col-span-2 row-span-2" : ""}`}
                onClick={() => {
                  setViewMode("feed");
                  // Scroll to post logic could go here
                }}
              >
                <img 
                  src={post.imageUrl} 
                  alt="Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-bold">{post.likesCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span className="font-bold">{post.commentsCount}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        <AnimatePresence>
          {isUploadOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] overflow-hidden max-w-md w-full p-8 relative shadow-2xl"
              >
                <button 
                  onClick={() => setIsUploadOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-black mb-6">Эҷоди пости нав</h3>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden relative group"
                >
                  {uploadImage ? (
                    <img src={uploadImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Барои боргузории акс клик кунед</p>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
                </div>

                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Тавсиф нависед..."
                  className="w-full mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none text-sm"
                  rows={3}
                />

                <button 
                  onClick={handleUpload}
                  disabled={!uploadImage || isUploading}
                  className="w-full mt-6 cta-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Мубодилаи пост"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Collaboration Modal */}
        <AnimatePresence>
          {collaborationUser && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] overflow-hidden max-w-md w-full p-8 relative shadow-2xl"
              >
                <button 
                  onClick={() => setCollaborationUser(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex flex-col items-center text-center mb-8">
                  <img 
                    src={collaborationUser.photoURL || `https://ui-avatars.com/api/?name=${collaborationUser.displayName}&background=random`} 
                    alt={collaborationUser.displayName} 
                    className="w-24 h-24 rounded-3xl border-4 border-slate-50 shadow-xl mb-4 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-2xl font-black">{collaborationUser.displayName}</h3>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">Омода барои ҳамкорӣ</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Дар бораи аъзо</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {collaborationUser.bio || "Ин аъзо то ҳол био илова накардааст, аммо шумо метавонед ба ӯ паём фиристед."}
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full cta-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Фиристодани паём
                  </button>
                  <button className="w-full bg-slate-100 text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all">
                    Дидани профил
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Comments Modal */}
        <AnimatePresence>
          {activePostComments && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-[2.5rem] overflow-hidden max-w-lg w-full h-[600px] flex flex-col relative shadow-2xl"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-black text-xl">Шарҳҳо</h3>
                  <button onClick={() => setActivePostComments(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{c.userName}</p>
                        <p className="text-sm text-slate-600">{c.text}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">
                          {c.createdAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Шарҳ илова кунед..."
                      className="w-full pl-4 pr-12 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                    />
                    <button 
                      onClick={() => handleComment(activePostComments)}
                      disabled={!commentText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-accent disabled:opacity-30"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialPlatform;
