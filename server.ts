import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3000;

  // Socket.io logic
  const roomsMessages = new Map<string, any[]>();
  const DEFAULT_ROOM = "General";

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (roomName) => {
      // Leave previous rooms
      socket.rooms.forEach(room => {
        if (room !== socket.id) socket.leave(room);
      });
      
      socket.join(roomName);
      console.log(`User ${socket.id} joined room: ${roomName}`);
      
      // Send existing messages for this room
      const messages = roomsMessages.get(roomName) || [];
      socket.emit("init_messages", messages);
    });

    socket.on("send_message", (data) => {
      const room = data.room || DEFAULT_ROOM;
      const newMessage = {
        id: Date.now().toString(),
        user: data.user || "Anonymous",
        text: data.text,
        timestamp: new Date().toISOString(),
        room: room
      };
      
      if (!roomsMessages.has(room)) {
        roomsMessages.set(room, []);
      }
      const messages = roomsMessages.get(room)!;
      messages.push(newMessage);
      
      // Keep only last 100 messages per room
      if (messages.length > 100) messages.shift();
      
      io.to(room).emit("receive_message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  app.use(express.json());

  // Health check endpoint for monitoring
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API routes
  app.post("/api/login", (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Почтаи электронӣ ва парол ҳатмӣ мебошанд" });
      }
      // Mock login: any non-empty password works
      console.log(`Login attempt: ${email}`);
      res.json({ message: "Вуруд муваффақона буд! Гузариш..." });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/signup", (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Суроғаи почтаи электронии нодуруст" });
      }
      console.log(`New signup: ${email}`);
      res.json({ message: "Ба Khabbllo хуш омадед! Ба зудӣ қуттии паёмҳои худро тафтиш кунед." });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/contact", (req, res, next) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Ҳамаи майдонҳо ҳатмӣ мебошанд" });
      }
      console.log(`Contact message from ${name} (${email}): ${message}`);
      res.json({ message: "Паём қабул шуд! Мо дар давоми 24 соат бо шумо тамос хоҳем гирифт." });
    } catch (error) {
      next(error);
    }
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled Server Error:", err);
    res.status(500).json({ 
      error: "Хатогии дохилии сервер", 
      message: "Дастаи мо огоҳ карда шуд. Лутфан дертар бори дигар кӯшиш кунед." 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Graceful Shutdown
  const shutdown = () => {
    console.log("Shutting down gracefully...");
    server.close(() => {
      console.log("Closed out remaining connections.");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
