import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  PlusSquare, 
  X, 
  Send, 
  Loader2,
  Camera,
  Video,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  auth, 
  db,   loginWithGoogle, 
  onAuthStateChanged,
  collection, 
  doc, 
  setDoc, 
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
  getDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from "../lib/firebase";

interface Reel {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  mediaUrl: string;
  mediaType: "video" | "photo";
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

const ReelItem = ({ reel, user, onLike, onComment, isLiked, isActive }: { reel: Reel, user: User | null, onLike: (id: string) => void, onComment: (id: string) => void, isLiked: boolean, isActive: boolean }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTap = useRef<number>(0);

  useEffect(() => {
    if (reel.mediaType === "video" && videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying, reel.mediaType]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!isLiked) onLike(reel.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    } else {
      togglePlay();
    }
    lastTap.current = now;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start overflow-hidden group">
      {reel.mediaType === "video" ? (
        <video 
          ref={videoRef}
          src={reel.mediaUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={handleDoubleTap}
          onTimeUpdate={handleTimeUpdate}
        />
      ) : (
        <div className="w-full h-full" onClick={handleDoubleTap}>
          <img 
            src={reel.mediaUrl} 
            alt="Reel" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Overlay UI - Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeart && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <Heart className="w-24 h-24 text-white fill-current drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause Indicator */}
      {!isPlaying && reel.mediaType === "video" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/40 p-6 rounded-full backdrop-blur-md border border-white/10"
          >
            <Play className="w-12 h-12 text-white fill-current" />
          </motion.div>
        </div>
      )}

      {/* Progress Bar */}
      {reel.mediaType === "video" && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <motion.div 
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
          />
        </div>
      )}

      {/* Right Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onLike(reel.id); }}
            className={`p-3 rounded-full backdrop-blur-md transition-all active:scale-150 border border-white/10 ${isLiked ? "bg-red-500 text-white border-red-400" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            <Heart className={`w-7 h-7 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">{reel.likesCount.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onComment(reel.id); }}
            className="p-3 bg-white/10 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">{reel.commentsCount.toLocaleString()}</span>
        </div>

        <button className="p-3 bg-white/10 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10">
          <Share2 className="w-7 h-7" />
        </button>

        {reel.mediaType === "video" && (
          <button 
            onClick={toggleMute}
            className="p-3 bg-white/10 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
          >
            {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
          </button>
        )}
      </div>

      {/* Bottom Info */}
      <div className="absolute left-4 bottom-8 right-20 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img src={reel.authorPhoto} alt={reel.authorName} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border border-black">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-white font-bold text-sm drop-shadow-md flex items-center gap-1">
              {reel.authorName}
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <button className="text-[10px] text-brand-accent font-black uppercase tracking-widest hover:text-white transition-colors">Пайравӣ</button>
            </p>
          </div>
        </div>
        <p className="text-white text-sm line-clamp-2 drop-shadow-md mb-3 leading-relaxed">{reel.caption}</p>
        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
          <div className="flex items-center gap-1.5 overflow-hidden w-32">
            <Music className="w-3 h-3 flex-shrink-0 animate-[spin_3s_linear_infinite]" />
            <div className="whitespace-nowrap animate-[marquee_10s_linear_infinite]">
              Аудиои аслӣ - {reel.authorName} • {reel.authorName}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const Reels = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "photo">("video");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeReelComments, setActiveReelComments] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeReelIndex) {
        setActiveReelIndex(index);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeReelIndex]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "reels"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reel)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "reels"));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || reels.length === 0) return;
    const fetchLikes = async () => {
      const likesMap: Record<string, boolean> = {};
      const likePromises = reels.map(async (reel) => {
        const likeRef = doc(db, "reels", reel.id, "likes", user.uid);
        const likeDoc = await getDoc(likeRef);
        if (likeDoc.exists()) {
          likesMap[reel.id] = true;
        }
      });
      await Promise.all(likePromises);
      setUserLikes(likesMap);
    };
    fetchLikes();
  }, [user, reels]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMediaUrl(URL.createObjectURL(file));
      if (file.type.startsWith("video")) {
        setMediaType("video");
      } else if (file.type.startsWith("image")) {
        setMediaType("photo");
      }
    }
  };

  const handleCreateReel = async () => {
    if (!user || (!selectedFile && !mediaUrl) || isUploading) return;
    setIsUploading(true);
    try {
      let finalMediaUrl = mediaUrl;

      if (selectedFile) {
        const fileRef = ref(storage, `reels/${user.uid}/${Date.now()}_${selectedFile.name}`);
        const uploadResult = await uploadBytes(fileRef, selectedFile);
        finalMediaUrl = await getDownloadURL(uploadResult.ref);
      }

      const reelData = {
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        authorPhoto: user.photoURL || "",
        mediaUrl: finalMediaUrl,
        mediaType,
        caption,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "reels"), reelData);
      setIsCreateOpen(false);
      setMediaUrl("");
      setSelectedFile(null);
      setCaption("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "reels");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = async (reelId: string) => {
    if (!user) return loginWithGoogle();
    const reelRef = doc(db, "reels", reelId);
    const likeRef = doc(db, "reels", reelId, "likes", user.uid);
    
    try {
      const likeDoc = await getDoc(likeRef);
      if (likeDoc.exists()) {
        await deleteDoc(likeRef);
        await updateDoc(reelRef, { likesCount: increment(-1) });
        setUserLikes(prev => ({ ...prev, [reelId]: false }));
      } else {
        await setDoc(likeRef, { userId: user.uid, reelId, createdAt: serverTimestamp() });
        await updateDoc(reelRef, { likesCount: increment(1) });
        setUserLikes(prev => ({ ...prev, [reelId]: true }));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `reels/${reelId}/likes/${user.uid}`);
    }
  };

  const openComments = (reelId: string) => {
    setActiveReelComments(reelId);
    const q = query(collection(db, "reels", reelId, "comments"), orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment)));
    });
  };

  const handleComment = async (reelId: string) => {
    if (!user || !commentText.trim()) return;
    try {
      await addDoc(collection(db, "reels", reelId, "comments"), {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        text: commentText,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "reels", reelId), { commentsCount: increment(1) });
      setCommentText("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `reels/${reelId}/comments`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col md:flex-row">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-[60] p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all border border-white/10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Sidebar/Nav for Desktop */}
      <div className="hidden md:flex flex-col w-20 bg-black border-r border-white/10 items-center py-8 gap-8">
        <button 
          onClick={() => {
            if (!user) return loginWithGoogle();
            setIsCreateOpen(true);
          }}
          className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group"
          title="Эҷоди рилс"
        >
          <PlusSquare className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button 
          onClick={async () => {
            if (!user) return loginWithGoogle();
            const samples = [
              {
                mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-40158-large.mp4",
                mediaType: "video",
                caption: "Neon vibes and late night dances 💃✨ #neon #dance",
              },
              {
                mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-near-the-shore-1662-large.mp4",
                mediaType: "video",
                caption: "Ocean therapy 🌊 the sound of waves is all I need. #ocean #peace",
              },
              {
                mediaUrl: "https://picsum.photos/seed/mountain/1080/1920",
                mediaType: "photo",
                caption: "Wanderlust 🏔️ The mountains are calling. #nature #adventure",
              },
              {
                mediaUrl: "https://picsum.photos/seed/city/1080/1920",
                mediaType: "photo",
                caption: "City lights and urban nights 🌃 #citylife #aesthetic",
              }
            ];

            for (const sample of samples) {
              await addDoc(collection(db, "reels"), {
                ...sample,
                authorId: user.uid,
                authorName: user.displayName || "Khabllo User",
                authorPhoto: user.photoURL || "",
                likesCount: Math.floor(Math.random() * 1000),
                commentsCount: Math.floor(Math.random() * 50),
                createdAt: serverTimestamp(),
              });
            }
          }}
          className="text-white/20 hover:text-white/60 text-[10px] font-bold uppercase tracking-tighter"
        >
          Намуна
        </button>
        <div className="flex-grow" />
        {user && <img src={user.photoURL || ""} alt="Me" className="w-10 h-10 rounded-full border border-white/20" referrerPolicy="no-referrer" />}
      </div>

      {/* Mobile Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col">
          <h2 className="text-white font-display font-black text-2xl tracking-tighter leading-none uppercase">Khabllo</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mt-1">Видеоҳои кӯтоҳ</p>
        </div>
        <button 
          onClick={() => {
            if (!user) return loginWithGoogle();
            setIsCreateOpen(true);
          }}
          className="w-10 h-10 bg-white/10 rounded-2xl backdrop-blur-md text-white flex items-center justify-center border border-white/10"
        >
          <PlusSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Main Reels Container */}
      <div 
        ref={containerRef}
        className="flex-grow h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar bg-black"
      >
        {reels.length > 0 ? (
          reels.map((reel, index) => (
            <ReelItem 
              key={reel.id} 
              reel={reel} 
              user={user} 
              onLike={handleLike} 
              onComment={openComments} 
              isLiked={!!userLikes[reel.id]}
              isActive={index === activeReelIndex}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white p-8 text-center">
            <Video className="w-16 h-16 mb-4 text-white/20" />
            <h3 className="text-xl font-bold mb-2">Ҳанӯз рилсҳо нест</h3>
            <p className="text-white/60 mb-6">Аввалин шуда лаҳзаеро бо ҷомеа мубодила кунед!</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsCreateOpen(true)}
                className="cta-gradient px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20"
              >
                Аввалин рилсро эҷод кунед
              </button>
              <button 
                onClick={async () => {
                  if (!user) return loginWithGoogle();
                  const samples = [
                    {
                      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-40158-large.mp4",
                      mediaType: "video",
                      caption: "Вибратсияҳои неонӣ ва рақсҳои шабона 💃✨ #neon #dance",
                    },
                    {
                      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-near-the-shore-1662-large.mp4",
                      mediaType: "video",
                      caption: "Терапияи уқёнус 🌊 садои мавҷҳо ҳама чизест, ки ба ман лозим аст. #ocean #peace",
                    },
                    {
                      mediaUrl: "https://picsum.photos/seed/mountain/1080/1920",
                      mediaType: "photo",
                      caption: "Иштиёқи сафар 🏔️ Кӯҳҳо садо мезананд. #nature #adventure",
                    },
                    {
                      mediaUrl: "https://picsum.photos/seed/city/1080/1920",
                      mediaType: "photo",
                      caption: "Чароғҳои шаҳр ва шабҳои урбанӣ 🌃 #citylife #aesthetic",
                    }
                  ];

                  for (const sample of samples) {
                    await addDoc(collection(db, "reels"), {
                      ...sample,
                      authorId: user.uid,
                      authorName: user.displayName || "Корбари Khabllo",
                      authorPhoto: user.photoURL || "",
                      likesCount: Math.floor(Math.random() * 1000),
                      commentsCount: Math.floor(Math.random() * 50),
                      createdAt: serverTimestamp(),
                    });
                  }
                }}
                className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors"
              >
                Илова кардани мундариҷаи намунавӣ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Reel Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden max-w-md w-full p-8 relative shadow-2xl text-white"
            >
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-black mb-2">Эҷоди рилси нав</h3>
              <p className="text-white/40 text-sm mb-6">Видео ё акси худро бо ҷомеа мубодила кунед.</p>
              
              <div className="space-y-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[9/16] bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden relative group"
                >
                  {mediaUrl ? (
                    <div className="w-full h-full relative">
                      {mediaType === "video" ? (
                        <video src={mediaUrl} className="w-full h-full object-cover" />
                      ) : (
                        <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-xs font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">Иваз кардан</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform border border-white/5">
                        <Video className="w-10 h-10" />
                      </div>
                      <p className="text-sm font-bold text-white/60">Интихоби файл</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-black">MP4, JPG, PNG</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="video/*,image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Тавсифи кӯтоҳ</label>
                    <textarea 
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Дар бораи ин лаҳза нависед..."
                      className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none text-sm text-white placeholder:text-white/20"
                      rows={3}
                    />
                  </div>

                  {!selectedFile && (
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Ё URL-и мустақим</label>
                      <input 
                        type="text" 
                        value={mediaUrl.startsWith("blob:") ? "" : mediaUrl}
                        onChange={(e) => {
                          setMediaUrl(e.target.value);
                          setSelectedFile(null);
                        }}
                        placeholder="https://..."
                        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all text-sm text-white placeholder:text-white/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-sm bg-white/5 text-white hover:bg-white/10 transition-all"
                >
                  Бекор кардан
                </button>
                <button 
                  onClick={handleCreateReel}
                  disabled={!mediaUrl || isUploading}
                  className="flex-[2] cta-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Мубодила"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comments Modal */}
      <AnimatePresence>
        {activeReelComments && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden max-w-lg w-full h-[600px] flex flex-col relative shadow-2xl text-white"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-xl">Шарҳҳо</h3>
                <button onClick={() => setActiveReelComments(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {comments.length > 0 ? comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <PlusSquare className="w-4 h-4 text-white/20" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{c.userName}</p>
                      <p className="text-sm text-white/60">{c.text}</p>
                      <p className="text-[10px] text-white/30 uppercase font-bold mt-1">
                        {c.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <MessageCircle className="w-12 h-12 mb-2" />
                    <p className="font-bold">Ҳанӯз шарҳҳо нест</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-white/5">
                <div className="relative">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Шарҳ илова кунед..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-black/40 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all text-white"
                  />
                  <button 
                    onClick={() => handleComment(activeReelComments)}
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
  );
};

export default Reels;
