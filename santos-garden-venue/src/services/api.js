const API_BASE = import.meta.env.VITE_API_BASE;

export const api = {
  async getEvents() {
    const res = await fetch(`${API_BASE}/api/events`);
    if (!res.ok) throw new Error("Error al cargar eventos");
    return res.json();
  },

  async createEvent(event, token) {
    const res = await fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Error al crear evento");
    }

    return res.json();
  },

  async updateEvent(id, event, token) {
    const res = await fetch(`${API_BASE}/api/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Error al actualizar evento");
    }

    return res.json();
  },

  async deleteEvent(id, token) {
    const res = await fetch(`${API_BASE}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Error al eliminar evento");
    }

    return true;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Error en login");
    return res.json();
  },
};
