// ─────────────────────────────────────────────────────────────
//  chatbot.js  –  Rule-based NLP engine (no external AI APIs)
// ─────────────────────────────────────────────────────────────

/**
 * Each rule has:
 *  keywords  – array of strings that must appear in the user message
 *  priority  – higher number wins when multiple rules match
 *  reply     – the response string
 */
const rules = [
  // ── Greetings ────────────────────────────────────────────────
  {
    keywords: ["hello"],
    priority: 10,
    reply:
      "Hello! 👋 I'm your English grammar assistant. Ask me about nouns, verbs, adjectives, tenses, or conditional sentences!",
  },
  {
    keywords: ["hi"],
    priority: 10,
    reply:
      "Hi there! 😊 I can help you with English grammar. What would you like to learn today?",
  },
  {
    keywords: ["hey"],
    priority: 10,
    reply:
      "Hey! Ready to learn some English grammar? Ask me anything about conditionals, tenses, nouns, verbs, or adjectives!",
  },
  {
    keywords: ["good morning"],
    priority: 11,
    reply: "Good morning! ☀️ Let's make today a great learning day. What grammar topic can I help you with?",
  },
  {
    keywords: ["good afternoon"],
    priority: 11,
    reply: "Good afternoon! 🌤️ Happy to help you with English grammar. What would you like to explore?",
  },
  {
    keywords: ["good evening"],
    priority: 11,
    reply: "Good evening! 🌙 Great time to learn some grammar. What topic interests you?",
  },
  {
    keywords: ["how are you"],
    priority: 11,
    reply:
      "I'm doing great, thanks for asking! 😄 I'm always ready to teach grammar. What would you like to learn?",
  },
  {
    keywords: ["thank"],
    priority: 10,
    reply: "You're welcome! 😊 Feel free to ask if you have more grammar questions!",
  },
  {
    keywords: ["bye"],
    priority: 10,
    reply: "Goodbye! Keep practising your English. See you next time! 👋",
  },

  // ── Conditionals (specific first, higher priority) ───────────
  {
    keywords: ["zero conditional"],
    priority: 30,
    reply:
      "The Zero Conditional expresses universal truths and scientific facts — things that are always true.\n\n📌 Structure: If + present simple → present simple\n\n✅ Examples:\n• If you heat water to 100°C, it boils.\n• If it rains, the ground gets wet.\n• If you don't eat, you feel hungry.\n\n💡 Use it when the result is always true — not just possible.",
  },
  {
    keywords: ["first conditional"],
    priority: 30,
    reply:
      "The First Conditional describes real and likely future situations.\n\n📌 Structure: If + present simple → will + base verb\n\n✅ Examples:\n• If it rains tomorrow, I will stay home.\n• If you study hard, you will pass the exam.\n• If she calls, I will answer.\n\n💡 The situation is realistic and the result is probable.",
  },
  {
    keywords: ["second conditional"],
    priority: 30,
    reply:
      "The Second Conditional talks about imaginary or unlikely present/future situations.\n\n📌 Structure: If + past simple → would + base verb\n\n✅ Examples:\n• If I had a million dollars, I would travel the world.\n• If she were taller, she would be a model.\n• If it snowed in July, we would be amazed.\n\n💡 Use 'were' (not 'was') for all subjects in formal writing.",
  },
  {
    keywords: ["third conditional"],
    priority: 30,
    reply:
      "The Third Conditional talks about hypothetical situations in the past — things that did NOT happen.\n\n📌 Structure: If + past perfect → would have + past participle\n\n✅ Examples:\n• If I had studied harder, I would have passed.\n• If she had left earlier, she wouldn't have missed the train.\n• If they had listened, the accident wouldn't have happened.\n\n💡 It expresses regret or a different outcome for past events.",
  },
  {
    keywords: ["mixed conditional"],
    priority: 30,
    reply:
      "A Mixed Conditional combines elements of the second and third conditional.\n\n📌 Structure (most common): If + past perfect → would + base verb\n\n✅ Examples:\n• If I had studied medicine, I would be a doctor now.\n• If she hadn't moved abroad, she would live closer.\n\n💡 Use it when the past condition has a present result.",
  },
  {
    keywords: ["conditional"],
    priority: 20,
    reply:
      "English has four main conditional types:\n\n1️⃣ Zero Conditional – universal truths\n   → If + present simple, present simple\n   e.g. 'If you freeze water, it turns to ice.'\n\n2️⃣ First Conditional – real future possibilities\n   → If + present simple, will + base verb\n   e.g. 'If it rains, I will take an umbrella.'\n\n3️⃣ Second Conditional – imaginary/unlikely situations\n   → If + past simple, would + base verb\n   e.g. 'If I were rich, I would travel everywhere.'\n\n4️⃣ Third Conditional – unreal past situations\n   → If + past perfect, would have + past participle\n   e.g. 'If I had known, I would have helped.'\n\nAsk me about any specific conditional for more detail!",
  },

  // ── Parts of Speech ──────────────────────────────────────────
  {
    keywords: ["noun"],
    priority: 20,
    reply:
      "A noun is a word that names a person, place, thing, or idea.\n\n📚 Types of nouns:\n• Common noun – dog, city, book\n• Proper noun – London, Maria, Google (capitalised)\n• Abstract noun – love, freedom, happiness\n• Collective noun – team, flock, family\n• Countable noun – apple, car (can be counted)\n• Uncountable noun – water, music (cannot be counted)\n\n✅ Examples in sentences:\n• The dog ran across the park.\n• Paris is a beautiful city.\n• Courage is an admirable quality.",
  },
  {
    keywords: ["verb"],
    priority: 20,
    reply:
      "A verb is a word that expresses an action, occurrence, or state of being.\n\n📚 Types of verbs:\n• Action verbs – run, eat, write, jump\n• Linking verbs – be, seem, appear, become\n• Auxiliary (helping) verbs – have, do, will, can, must\n• Modal verbs – can, could, may, might, shall, should, would\n• Transitive – takes an object: 'She reads a book.'\n• Intransitive – no object: 'He sleeps.'\n\n✅ Examples:\n• She runs every morning. (action)\n• He is happy. (linking)\n• They have finished. (auxiliary)",
  },
  {
    keywords: ["adjective"],
    priority: 20,
    reply:
      "An adjective is a word that describes or modifies a noun or pronoun.\n\n📚 Types of adjectives:\n• Descriptive – beautiful, tall, cold\n• Quantitative – some, many, few\n• Demonstrative – this, that, these, those\n• Possessive – my, your, his, her\n• Interrogative – which, what, whose\n• Comparative – taller, more beautiful\n• Superlative – tallest, most beautiful\n\n✅ Examples:\n• She wore a red dress.\n• He is the tallest student in class.\n• This book is more interesting than that one.",
  },
  {
    keywords: ["adverb"],
    priority: 20,
    reply:
      "An adverb modifies a verb, adjective, or another adverb. It answers questions like how, when, where, or to what extent.\n\n📚 Types of adverbs:\n• Manner – quickly, slowly, carefully\n• Time – now, yesterday, soon, already\n• Place – here, there, everywhere\n• Frequency – always, never, often, sometimes\n• Degree – very, quite, extremely, rather\n\n✅ Examples:\n• She speaks quietly. (manner)\n• He arrived late. (time)\n• They always study hard. (frequency)",
  },
  {
    keywords: ["pronoun"],
    priority: 20,
    reply:
      "A pronoun replaces a noun to avoid repetition.\n\n📚 Types of pronouns:\n• Personal – I, you, he, she, it, we, they\n• Possessive – mine, yours, his, hers, ours\n• Reflexive – myself, yourself, himself\n• Relative – who, which, that\n• Indefinite – someone, everyone, nobody\n• Demonstrative – this, that, these, those\n\n✅ Examples:\n• She gave him her book.\n• They enjoyed themselves at the party.\n• The student who passed is happy.",
  },
  {
    keywords: ["preposition"],
    priority: 20,
    reply:
      "A preposition shows the relationship between a noun/pronoun and other words in a sentence.\n\n📚 Common prepositions:\n• Place – in, on, at, under, between, beside\n• Time – at, on, in, before, after, during\n• Direction – to, from, into, through, towards\n\n✅ Examples:\n• The book is on the table.\n• She arrives at 9 AM.\n• He walked through the park.\n\n💡 Tip: Prepositions are always followed by a noun or pronoun.",
  },
  {
    keywords: ["conjunction"],
    priority: 20,
    reply:
      "A conjunction connects words, phrases, or clauses.\n\n📚 Types:\n• Coordinating – for, and, nor, but, or, yet, so (FANBOYS)\n• Subordinating – because, although, if, when, since, unless\n• Correlative – either...or, neither...nor, both...and\n\n✅ Examples:\n• I like tea and coffee.\n• She stayed home because it was raining.\n• Either you study, or you will fail.",
  },

  // ── Tenses ───────────────────────────────────────────────────
  {
    keywords: ["present perfect"],
    priority: 30,
    reply:
      "The Present Perfect connects the past to the present.\n\n📌 Structure: have/has + past participle\n\n✅ Uses:\n• Life experience: 'I have visited Japan.'\n• Recent past with present relevance: 'She has just finished.'\n• Unfinished time period: 'I have worked here for 5 years.'\n\n💡 Key words: just, already, yet, ever, never, since, for.",
  },
  {
    keywords: ["past perfect"],
    priority: 30,
    reply:
      "The Past Perfect describes an action completed before another past action.\n\n📌 Structure: had + past participle\n\n✅ Examples:\n• When I arrived, she had already left.\n• He had studied French before he moved to Paris.\n• They hadn't eaten, so they were hungry.\n\n💡 Often used with 'before', 'after', 'when', 'by the time'.",
  },
  {
    keywords: ["future perfect"],
    priority: 30,
    reply:
      "The Future Perfect describes an action that will be completed before a specific time in the future.\n\n📌 Structure: will have + past participle\n\n✅ Examples:\n• By next year, I will have graduated.\n• She will have finished the report by Monday.\n• By 2030, they will have built 1,000 schools.\n\n💡 Often used with 'by', 'by the time', 'before'.",
  },
  {
    keywords: ["simple past", "past simple"],
    priority: 30,
    reply:
      "The Simple Past describes completed actions at a specific time in the past.\n\n📌 Structure: verb + -ed (regular) or irregular form\n\n✅ Examples:\n• She walked to school yesterday.\n• He went to Paris last year.\n• They didn't watch the film.\n\n💡 Key words: yesterday, last week, ago, in 2005, when I was young.",
  },
  {
    keywords: ["simple present", "present simple"],
    priority: 30,
    reply:
      "The Simple Present is used for habits, facts, and general truths.\n\n📌 Structure: base verb (add -s/-es for he/she/it)\n\n✅ Uses:\n• Habits: 'She reads every night.'\n• Facts: 'The sun rises in the east.'\n• Timetables: 'The train leaves at 8 AM.'\n\n💡 Key words: always, usually, often, sometimes, never, every day.",
  },
  {
    keywords: ["simple future", "future simple"],
    priority: 30,
    reply:
      "The Simple Future expresses decisions, predictions, or future plans.\n\n📌 Structure: will + base verb\n\n✅ Uses:\n• Decisions made now: 'I'll have the soup.'\n• Predictions: 'It will rain tomorrow.'\n• Promises: 'I will help you.'\n\n💡 'Going to' is used for planned intentions: 'I'm going to study tonight.'",
  },
  {
    keywords: ["continuous", "progressive"],
    priority: 25,
    reply:
      "Continuous (progressive) tenses describe actions in progress.\n\n📌 Key forms:\n• Present Continuous: am/is/are + -ing → 'She is reading now.'\n• Past Continuous: was/were + -ing → 'He was sleeping when I called.'\n• Future Continuous: will be + -ing → 'They will be travelling tomorrow.'\n\n💡 Used for actions happening at a specific moment or running alongside another action.",
  },
  {
    keywords: ["tense"],
    priority: 20,
    reply:
      "English has three main time frames, each with four aspects:\n\n⏰ Present: Simple, Continuous, Perfect, Perfect Continuous\n⏳ Past: Simple, Continuous, Perfect, Perfect Continuous\n🔮 Future: Simple, Continuous, Perfect, Perfect Continuous\n\n📌 Quick reference:\n• I eat (present simple)\n• I am eating (present continuous)\n• I have eaten (present perfect)\n• I ate (past simple)\n• I will eat (future simple)\n\nAsk me about any specific tense for a detailed explanation!",
  },

  // ── Grammar topics ────────────────────────────────────────────
  {
    keywords: ["article"],
    priority: 20,
    reply:
      "Articles are used before nouns to specify them.\n\n📚 The three articles:\n• 'a' – indefinite, before consonant sounds: 'a book'\n• 'an' – indefinite, before vowel sounds: 'an apple'\n• 'the' – definite, specific noun: 'the book on the table'\n\n✅ Rules:\n• Use 'a/an' for general mentions: 'I saw a dog.'\n• Use 'the' for known/specific items: 'The dog was friendly.'\n• No article for plurals in general: 'Dogs are loyal.'\n\n💡 Watch the sound, not the letter: 'a university' (yu sound), 'an hour' (silent h).",
  },
  {
    keywords: ["passive voice", "passive"],
    priority: 25,
    reply:
      "The Passive Voice is used when the focus is on the action or object, not the subject.\n\n📌 Structure: be (in appropriate tense) + past participle\n\n✅ Examples:\n• Active: 'The chef cooked the meal.'\n• Passive: 'The meal was cooked by the chef.'\n\n📚 Across tenses:\n• Present: 'It is made in Italy.'\n• Past: 'The bridge was built in 1900.'\n• Future: 'The results will be announced.'\n\n💡 Use passive when the doer is unknown, unimportant, or obvious.",
  },
  {
    keywords: ["active voice", "active"],
    priority: 25,
    reply:
      "The Active Voice is the standard sentence structure where the subject performs the action.\n\n📌 Structure: Subject + Verb + Object\n\n✅ Examples:\n• 'The cat chased the mouse.'\n• 'Engineers built the bridge.'\n• 'She writes beautiful poetry.'\n\n💡 Active voice is usually clearer and more direct than passive voice. Prefer active for most writing.",
  },
  {
    keywords: ["direct speech", "direct quote"],
    priority: 25,
    reply:
      "Direct Speech reports the exact words spoken, inside quotation marks.\n\n✅ Examples:\n• She said, \"I am tired.\"\n• He asked, \"Where is the station?\"\n\n💡 Rules:\n• Use a comma before the quote.\n• Capitalise the first word inside quotes.\n• Place punctuation inside the closing quote mark.",
  },
  {
    keywords: ["reported speech", "indirect speech"],
    priority: 25,
    reply:
      "Reported Speech (Indirect Speech) conveys what someone said without using their exact words.\n\n📌 Changes when reporting:\n• Pronouns shift: 'I' → 'he/she'\n• Tenses shift back: present → past\n• Time expressions change: 'today' → 'that day'\n\n✅ Examples:\n• Direct: 'I am happy.'\n• Reported: She said that she was happy.\n\n• Direct: 'I will call you tomorrow.'\n• Reported: He said he would call me the next day.",
  },
  {
    keywords: ["modal"],
    priority: 20,
    reply:
      "Modal verbs express ability, possibility, permission, or obligation.\n\n📚 Common modals:\n• can / could – ability or possibility\n• may / might – possibility or permission\n• shall / will – future or intention\n• should – advice or expectation\n• must – strong obligation or certainty\n• would – conditional or polite requests\n\n✅ Examples:\n• You should study more.\n• She can speak three languages.\n• It might rain later.\n• You must wear a seatbelt.\n\n💡 Modals are always followed by a bare infinitive (no 'to').",
  },
  {
    keywords: ["clause"],
    priority: 20,
    reply:
      "A clause is a group of words that contains a subject and a verb.\n\n📚 Types:\n• Independent clause – a complete thought: 'She reads books.'\n• Dependent clause – incomplete alone: 'because she enjoys stories'\n• Relative clause – gives info about a noun: 'The man who called is my uncle.'\n• Conditional clause – uses 'if': 'If it rains, we stay inside.'\n\n✅ Example of combined clauses:\n'Although it was late, she continued working because she had a deadline.'",
  },
  {
    keywords: ["sentence", "sentence structure"],
    priority: 20,
    reply:
      "English sentences are built around a Subject + Verb + (Object/Complement).\n\n📚 Types of sentences:\n• Simple – one independent clause: 'She runs.'\n• Compound – two independent clauses joined by a conjunction: 'She runs and he swims.'\n• Complex – one independent + one dependent clause: 'She runs because she loves it.'\n• Compound-Complex – mix of both: 'She runs every day, and he swims, although he prefers cycling.'\n\n💡 Vary your sentence types to make your writing more engaging.",
  },
  {
    keywords: ["punctuation"],
    priority: 20,
    reply:
      "Punctuation helps readers understand your writing clearly.\n\n📚 Key marks:\n• . (full stop/period) – ends a statement\n• , (comma) – separates items, clauses, or introduces a quote\n• ; (semicolon) – links related independent clauses\n• : (colon) – introduces a list or explanation\n• ? (question mark) – ends a question\n• ! (exclamation mark) – expresses strong emotion\n• ' (apostrophe) – shows possession or contraction\n• \" \" (quotation marks) – encloses direct speech\n\n✅ Example:\n'It's amazing: she speaks French, Spanish, and Mandarin — and she's only 18!'",
  },
  {
    keywords: ["grammar"],
    priority: 15,
    reply:
      "English grammar covers the rules and structure of the language. Here are the key areas:\n\n📚 Core topics:\n• Parts of speech – nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions\n• Tenses – present, past, future (and their aspects)\n• Sentence structure – simple, compound, complex\n• Clauses – independent, dependent, relative\n• Voice – active and passive\n• Conditionals – zero, first, second, third\n• Reported speech, punctuation, articles, modals\n\n💬 Ask me about any of these topics for a detailed explanation!",
  },

  // ── Improving English ─────────────────────────────────────────
  {
    keywords: ["improve"],
    priority: 25,
    reply:
      "Here are proven strategies to improve your English:\n\n📖 Reading\n• Read books, newspapers, and articles daily\n• Start with simple texts and gradually increase difficulty\n\n🎧 Listening\n• Watch English films and TV with subtitles\n• Listen to podcasts and news in English\n\n✍️ Writing\n• Keep a daily journal in English\n• Practice writing emails, essays, and summaries\n\n🗣️ Speaking\n• Speak with native or fluent speakers\n• Practice out loud, even alone — talk to yourself!\n\n📚 Grammar & Vocabulary\n• Study grammar rules and learn 5–10 new words daily\n• Use flashcards (e.g. Anki) to memorise vocabulary\n\n🔁 Consistency is key — 20–30 minutes daily beats rare long sessions!",
  },
  {
    keywords: ["vocabulary", "new words"],
    priority: 20,
    reply:
      "Building vocabulary is essential for fluency! Here's how:\n\n📌 Effective strategies:\n• Learn words in context (in sentences, not just lists)\n• Use spaced repetition apps like Anki or Quizlet\n• Read widely — fiction, news, academic texts\n• Keep a vocabulary notebook\n• Learn word families (happy → happiness → happily → unhappy)\n\n💡 Daily goal: Learn 5–10 new words and use them in sentences!\n\n✅ Practice: 'Diligent' means hardworking.\n→ 'She is a diligent student who never misses class.'",
  },
  {
    keywords: ["writing skill", "writing tip", "improve writing"],
    priority: 25,
    reply:
      "Tips to improve your English writing:\n\n✍️ Structure:\n• Always plan: introduction → body → conclusion\n• Use clear topic sentences for each paragraph\n\n📝 Style:\n• Vary sentence length and structure\n• Avoid repetition — use synonyms and pronouns\n• Use linking words: however, therefore, in addition, consequently\n\n🔍 Accuracy:\n• Proofread for grammar, punctuation, and spelling\n• Read your work aloud to catch errors\n\n📚 Practice:\n• Write summaries of articles you read\n• Keep a daily journal in English\n• Try different writing types: emails, essays, stories",
  },
  {
    keywords: ["speaking skill", "improve speaking", "pronunciation"],
    priority: 25,
    reply:
      "Tips to improve your English speaking:\n\n🗣️ Fluency:\n• Speak as much as possible — don't fear mistakes!\n• Practise with native speakers or language exchange partners\n• Use apps like Duolingo, HelloTalk, or Tandem\n\n🎧 Pronunciation:\n• Listen and repeat — mimic native speakers\n• Use minimal pairs: 'ship' vs 'sheep', 'bit' vs 'beat'\n• Record yourself and compare with native audio\n\n💡 Confidence:\n• Think in English, not in your native language\n• Learn useful phrases and collocations\n• Don't wait until your grammar is perfect — just speak!\n\n🎯 Goal: Aim for clarity over perfection.",
  },

  // ── Help ─────────────────────────────────────────────────────
  {
    keywords: ["help", "what can you do", "what do you know"],
    priority: 15,
    reply:
      "I'm your English Grammar Assistant! 🎓 Here's what I can help you with:\n\n📚 Topics I cover:\n• Parts of speech – nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions\n• Tenses – all present, past, and future forms\n• Conditionals – zero, first, second, third, and mixed\n• Sentence structure, clauses, voice (active/passive)\n• Reported speech, modals, articles, punctuation\n• Tips for improving reading, writing, speaking, and vocabulary\n\n💬 Just type your question! Examples:\n• 'What is a noun?'\n• 'Explain the second conditional'\n• 'How do I improve my English?'\n• 'What is the present perfect?'",
  },
];

// ─────────────────────────────────────────────────────────────
//  Core matching function
// ─────────────────────────────────────────────────────────────

/**
 * Normalise text: lowercase + collapse whitespace
 */
function normalise(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Score a rule against the normalised message.
 * Returns the rule's priority if ALL keywords match, otherwise 0.
 */
function scoreRule(rule, normalisedMessage) {
  const allMatch = rule.keywords.every((kw) => normalisedMessage.includes(kw));
  return allMatch ? rule.priority : 0;
}

/**
 * Main chatbot function.
 * @param {string} message  – raw user input
 * @returns {string}        – chatbot reply
 */
function getReply(message) {
  if (!message || typeof message !== "string") {
    return "Please send a message so I can help you!";
  }

  const norm = normalise(message);

  let bestScore = 0;
  let bestReply = null;

  for (const rule of rules) {
    const score = scoreRule(rule, norm);
    if (score > bestScore) {
      bestScore = score;
      bestReply = rule.reply;
    }
  }

  if (bestReply) {
    return bestReply;
  }

  // Fallback
  return "I'm still learning. Try asking about grammar, verbs, or conditional sentences.";
}

module.exports = { getReply };
