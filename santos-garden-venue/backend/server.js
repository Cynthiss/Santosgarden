import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import reservationsRouter from "./routes/reservations.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ======== VARIABLES DE ENTORNO ========
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

// ======== CONEXIÓN A MONGODB ATLAS ========
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✔ MongoDB Atlas conectado exitosamente"))
  .catch((err) => console.error("❌ Error de conexión MongoDB:", err));

// ======== RUTAS ========
app.use("/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/reservations", reservationsRouter);

// ======== INICIAR SERVIDOR ========
app.listen(PORT, () => {
  console.log(`🚀 API escuchando correctamente en http://localhost:${PORT}`);
});
