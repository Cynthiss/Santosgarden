// backend/routes/events.js
import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/**
 * GET /api/events
 * Devuelve todos los eventos
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error("Error al obtener eventos:", err);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
});

/**
 * POST /api/events
 */
router.post("/", async (req, res) => {
  try {
    const { title, date, guests, price, type, place } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        message: "Título y fecha son campos requeridos",
      });
    }

    const event = await Event.create({
      title,
      date,
      guests: guests ?? 0,
      price: price ?? 0,
      type: type || "public",
      place: place || "",
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("Error al crear evento:", err);
    res.status(500).json({ message: "Error al crear evento" });
  }
});

/**
 * PATCH /api/events/:id
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(event);
  } catch (err) {
    console.error("Error al actualizar evento:", err);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
});

/**
 * DELETE /api/events/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({ message: "Evento eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar evento:", err);
    res.status(500).json({ message: "Error al eliminar evento" });
  }
});

export default router;
