# English Conditional Sentences – Interactive Learning Website with Grammar Chatbot

An interactive website to learn and practice **English Conditional Sentences** through theory explanations, a timed quiz, and a built-in **rule-based Grammar Chatbot** powered by a Node.js + Express backend.

---

## 🌐 Live Website

👉 https://aniketfagare11-lang.github.io/EnglishgDemo1-Website/

---

## 📚 Features

* Clean and modern UI with dark mode toggle
* Explanation of **4 Conditional Types** with examples
* Interactive **20-question quiz** with 30-second timer per question
* Instant feedback, explanations, and animated results dashboard
* Score tracking and responsive design (mobile friendly)
* **Built-in Grammar Chatbot** — ask questions about English grammar in real time
* Rule-based NLP backend — **no external AI APIs or API keys required**

---

## 🧠 Conditional Types Covered

1. **Zero Conditional** – General truths and scientific facts
2. **First Conditional** – Real and possible future situations
3. **Second Conditional** – Hypothetical or imaginary situations
4. **Third Conditional** – Imagined past situations and regrets

---

## 💬 Chatbot Topics Supported

| Topic | Example Questions |
|---|---|
| Greetings | "hello", "hi", "how are you" |
| Nouns | "what is a noun", "types of nouns" |
| Verbs | "what is a verb", "types of verbs" |
| Adjectives | "what is an adjective" |
| Adverbs | "what is an adverb" |
| Pronouns | "what is a pronoun" |
| Prepositions | "what is a preposition" |
| Conjunctions | "what is a conjunction" |
| Tenses | "explain tenses", "present perfect", "simple past" |
| Conditionals | "what is a conditional", "first conditional", "second conditional" |
| Passive voice | "what is passive voice" |
| Modal verbs | "what are modal verbs" |
| Articles | "explain articles" |
| Reported speech | "what is reported speech" |
| Improve English | "how to improve my english", "writing tips", "speaking tips" |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express |
| Deployment | GitHub Pages (frontend) |

---

## 📂 Project Structure

```
project-root/
│
├── index.html               # Main frontend page
├── style.css                # All styles including chatbot UI
├── script.js                # Quiz logic + chatbot frontend logic
├── README.md
│
└── english-chatbot-backend/
    ├── src/
    │   ├── server.js        # Express server + POST /chat endpoint
    │   └── chatbot.js       # Rule-based NLP engine
    └── package.json
```

---

## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/aniketfagare11-lang/EnglishgDemo1-Website.git
cd EnglishgDemo1-Website
```

### 2. Start the chatbot backend

```bash
cd english-chatbot-backend
npm install
npm start
```

The backend starts on **http://localhost:3000** by default.

> To use a different port: `PORT=5000 npm start`
>
> For development with auto-restart: `npm run dev`

### 3. Open the frontend

Open `index.html` directly in your browser. The chatbot widget (💬 button, bottom-right) will connect to the backend automatically.

---

## 🔌 Backend API Reference

### `GET /`
Health check — confirms the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "English Chatbot API is running 🎓",
  "endpoint": "POST /chat  →  { message } → { reply }"
}
```

### `POST /chat`
Send a user message and receive a chatbot reply.

**Request body:**
```json
{ "message": "what is a noun" }
```

**Success response (`200`):**
```json
{ "reply": "A noun is a word that names a person, place, thing, or idea. ..." }
```

**Error response (`400`):**
```json
{ "error": "Invalid request. Please provide a non-empty 'message' string." }
```

---

## ➕ Adding New Chatbot Rules

Open `english-chatbot-backend/src/chatbot.js` and add a new entry to the `rules` array:

```javascript
{
  keywords: ["your", "keywords"],  // ALL must appear in the message
  priority: 20,                    // higher = wins over lower-priority rules
  reply: "Your detailed response here.",
},
```

Rules with more specific keywords should always have a higher priority than general ones.

---

## ⚙️ Requirements

* Node.js **v14+**
* npm **v6+**

---

## 👨‍💻 Developer

**Aniket Fagare**
Computer Science Student — interested in Web Development, Java, and DSA.

GitHub: https://github.com/aniketfagare11-lang

---

## ⭐ Project Purpose

This project was created as a **learning project and hackathon practice** to combine programming with educational tools — making English grammar more accessible and interactive for learners.
