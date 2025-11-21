import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import reservationsRouter from "./routes/reservations.js";


const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/santos_garden")
  .then(() => console.log("MongoDB conectado ✔"))
  .catch((err) => console.error("Error en Mongo:", err));

// Rutas
app.use("/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/reservations", reservationsRouter);

app.listen(4000, () => {
  console.log("API escuchando en http://localhost:4000");
});
