import { createServer } from "node:http";
import { Server } from "socket.io";

export function thisLogic() {
  const httpServer = createServer();
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("🔗 Nuovo client connesso:", socket.id);

    socket.on("message", (data) => {
      console.log(`📩 Ricevuto da ${socket.id}:`, data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnesso:", socket.id);
    });
  });

  const PORT = process.env.PORT || 3000;

  httpServer.listen(PORT, () => {
    console.log("🚀 Socket.IO server in ascolto PORTA ", PORT);
  });
}
