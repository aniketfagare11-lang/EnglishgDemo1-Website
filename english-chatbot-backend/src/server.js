// ─────────────────────────────────────────────────────────────
//  server.js  –  Express backend for the English chatbot
// ─────────────────────────────────────────────────────────────

const express = require("express");
const cors    = require("cors");
const { getReply } = require("./chatbot");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────

// Allow all origins so any frontend can call this API.
// For production, replace the origin with your exact frontend URL:
//   app.use(cors({ origin: "https://your-frontend.com" }));
app.use(cors());

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────

/**
 * Health-check endpoint
 * GET /
 */
app.get("/", (req, res) => {
  res.json({
    status : "ok",
    message: "English Chatbot API is running 🎓",
    endpoint: "POST /chat  →  { message } → { reply }",
  });
});

/**
 * Chat endpoint
 * POST /chat
 * Body  : { "message": "user input string" }
 * Response: { "reply": "chatbot response" }
 */
app.post("/chat", (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({
      error: "Invalid request. Please provide a non-empty 'message' string.",
    });
  }

  const reply = getReply(message.trim());

  return res.json({ reply });
});

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 English Chatbot server is running`);
  console.log(`   Local:  http://localhost:${PORT}`);
  console.log(`   Chat:   POST http://localhost:${PORT}/chat\n`);
});

module.exports = app; // exported for testing if needed
