'use strict';

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const TIMER_TOTAL = 30;
const TIMER_RADIUS = 24;                           // must match SVG r="24"
const TIMER_CIRCUMF = 2 * Math.PI * TIMER_RADIUS;  // ≈ 150.796

const DONUT_RADIUS = 64;                           // must match SVG r="64"
const DONUT_CIRCUMF = 2 * Math.PI * DONUT_RADIUS;  // ≈ 402.124

/* ═══════════════════════════════════════════════
   DARK MODE
═══════════════════════════════════════════════ */
const html = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
const dtIcon = document.getElementById('dtIcon');
const dtLabel = document.getElementById('dtLabel');

function applyTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (dtIcon) dtIcon.textContent = dark ? '☀️' : '🌙';
    if (dtLabel) dtLabel.textContent = dark ? 'Light' : 'Dark';
    try { localStorage.setItem('cond-theme', dark ? 'dark' : 'light'); } catch (e) { /* blocked */ }
}

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        applyTheme(html.getAttribute('data-theme') !== 'dark');
    });
}

// Restore saved theme on load
(function () {
    try { if (localStorage.getItem('cond-theme') === 'dark') applyTheme(true); } catch (e) { /* blocked */ }
}());

/* ═══════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
═══════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
} else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(function (el) { el.classList.add('visible'); });
}

/* ═══════════════════════════════════════════════
   NAV SCROLL EFFECT
═══════════════════════════════════════════════ */
const topnav = document.getElementById('topnav');
if (topnav) {
    window.addEventListener('scroll', function () {
        topnav.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,.12)' : '';
    }, { passive: true });
}

/* ═══════════════════════════════════════════════
   QUIZ DATA — 20 Questions with explanations
═══════════════════════════════════════════════ */
const QUESTIONS = [
    {
        q: 'Which conditional is used for general truths and scientific facts?',
        opts: ['First Conditional', 'Zero Conditional', 'Second Conditional', 'Third Conditional'],
        ans: 1,
        exp: 'The <strong>Zero Conditional</strong> uses Simple Present in both clauses and expresses facts that are always true, like scientific laws.'
    },
    {
        q: 'Choose the correct Zero Conditional sentence:',
        opts: [
            'If it will rain, the ground gets wet.',
            'If it rains, the ground gets wet.',
            'If it rained, the ground would get wet.',
            'If it had rained, the ground would have gotten wet.'
        ],
        ans: 1,
        exp: 'Zero Conditional = <strong>If + Simple Present → Simple Present</strong>. Both clauses use the same tense.'
    },
    {
        q: 'The First Conditional uses which main clause structure?',
        opts: ['Simple Present', 'would + base verb', 'will + base verb', 'would have + past participle'],
        ans: 2,
        exp: 'First Conditional = <strong>If + Simple Present → will + base verb</strong>. It describes real, possible future situations.'
    },
    {
        q: "Complete: 'If she _____ hard, she will pass the exam.'",
        opts: ['studied', 'studies', 'had studied', 'will study'],
        ans: 1,
        exp: 'First Conditional: the if-clause uses <strong>Simple Present</strong> (studies), not Simple Past or Future.'
    },
    {
        q: 'The Second Conditional is best used for:',
        opts: [
            'Real and likely future events',
            'Always-true scientific facts',
            'Unreal or hypothetical present situations',
            'Past events that did not happen'
        ],
        ans: 2,
        exp: 'The <strong>Second Conditional</strong> describes imaginary or impossible situations in the present or future.'
    },
    {
        q: 'Which sentence correctly uses the Second Conditional?',
        opts: [
            'If I have money, I will travel.',
            'If I had money, I would travel.',
            'If I had money, I will travel.',
            'If I have money, I would travel.'
        ],
        ans: 1,
        exp: 'Second Conditional = <strong>If + Simple Past → would + base verb</strong>. The situation is imaginary.'
    },
    {
        q: 'The Third Conditional uses which tense in the if-clause?',
        opts: ['Simple Past', 'Simple Present', 'Past Perfect', 'Future Perfect'],
        ans: 2,
        exp: 'Third Conditional = <strong>If + Past Perfect → would have + past participle</strong>. It refers to past events that did NOT happen.'
    },
    {
        q: 'Which sentence correctly uses the Third Conditional?',
        opts: [
            'If I studied harder, I would pass.',
            'If I had studied harder, I would have passed.',
            'If I study harder, I will pass.',
            'If I had studied harder, I would pass.'
        ],
        ans: 1,
        exp: 'Third Conditional: <strong>If + Past Perfect → would have + past participle</strong>. Option D mixes tenses incorrectly.'
    },
    {
        q: 'What feeling does the Third Conditional most commonly express?',
        opts: ['Hope about the future', 'Certainty about facts', 'Regret about the past', 'A real future plan'],
        ans: 2,
        exp: 'The Third Conditional often expresses <strong>regret</strong> — a wish that things in the past had been different.'
    },
    {
        q: "Fill in: 'If water _____ to 0°C, it freezes.' (Zero Conditional)",
        opts: ['cooled', 'will cool', 'cools', 'would cool'],
        ans: 2,
        exp: 'Zero Conditional requires <strong>Simple Present</strong> in the if-clause: "if water <em>cools</em>".'
    },
    {
        q: 'Which sentence is a correct First Conditional?',
        opts: [
            'If he would come, I will be happy.',
            'If he comes, I will be happy.',
            'If he came, I will be happy.',
            'If he had come, I will be happy.'
        ],
        ans: 1,
        exp: 'First Conditional: <strong>If + Simple Present → will + base verb</strong>. Never use "would" in the if-clause of a First Conditional.'
    },
    {
        q: "Complete: 'If I _____ a bird, I would fly around the world.' (Second Conditional)",
        opts: ['am', 'was / were', 'will be', 'had been'],
        ans: 1,
        exp: 'Second Conditional uses <strong>Simple Past</strong> in the if-clause. "Were" is preferred in formal English for all subjects.'
    },
    {
        q: "Identify the type: 'If you mix red and blue, you get purple.'",
        opts: ['First Conditional', 'Second Conditional', 'Zero Conditional', 'Third Conditional'],
        ans: 2,
        exp: 'This is a <strong>Zero Conditional</strong> — it states a universal fact that is always true.'
    },
    {
        q: "Choose the correct First Conditional: 'If it _____ tomorrow, we will cancel the trip.'",
        opts: ['snowed', 'will snow', 'snows', 'had snowed'],
        ans: 2,
        exp: 'First Conditional: use <strong>Simple Present</strong> (snows) in the if-clause, not future tense.'
    },
    {
        q: 'Which sentence expresses a very unlikely / hypothetical situation?',
        opts: [
            'If I study, I will get a good grade.',
            'If water freezes, it becomes ice.',
            'If I were the president, I would change many things.',
            'If she had called, I would have answered.'
        ],
        ans: 2,
        exp: '"If I <em>were</em> the president" is a <strong>Second Conditional</strong> — an imaginary, unlikely present situation.'
    },
    {
        q: "Complete (Third Conditional): 'If they _____ earlier, they would have caught the train.'",
        opts: ['left', 'leave', 'had left', 'would leave'],
        ans: 2,
        exp: "Third Conditional if-clause uses <strong>Past Perfect</strong>: \"had left\". They did NOT leave early — it's imaginary."
    },
    {
        q: 'What is the correct structure of the Second Conditional?',
        opts: [
            'If + Simple Present → will + base verb',
            'If + Past Perfect → would have + past participle',
            'If + Simple Past → would + base verb',
            'If + Simple Present → Simple Present'
        ],
        ans: 2,
        exp: '<strong>Second Conditional</strong> = If + Simple Past → would + base verb. Used for unreal present/future situations.'
    },
    {
        q: 'Which correctly uses a First Conditional as a warning?',
        opts: [
            'If you touch that wire, you would get shocked.',
            'If you touch that wire, you will get shocked.',
            'If you had touched that wire, you would have gotten shocked.',
            'If you touched that wire, you get shocked.'
        ],
        ans: 1,
        exp: 'First Conditional uses <strong>will</strong> in the main clause for real future consequences: "you <em>will</em> get shocked".'
    },
    {
        q: "Identify the conditional type: 'If he had taken the medicine, he would have felt better.'",
        opts: ['Zero Conditional', 'First Conditional', 'Second Conditional', 'Third Conditional'],
        ans: 3,
        exp: 'Past Perfect (had taken) + would have + pp (would have felt) = <strong>Third Conditional</strong>. He did not take the medicine.'
    },
    {
        q: 'Which sentence correctly uses the Zero Conditional about a habit?',
        opts: [
            'If she will be tired, she takes a nap.',
            'If she is tired, she takes a nap.',
            'If she were tired, she would take a nap.',
            'If she had been tired, she would have taken a nap.'
        ],
        ans: 1,
        exp: 'Zero Conditional can describe reliable habits: <strong>If + Simple Present → Simple Present</strong>. "If she <em>is</em> tired, she <em>takes</em> a nap."'
    }
];

/* ═══════════════════════════════════════════════
   QUIZ STATE
═══════════════════════════════════════════════ */
var deck = [];
var qIdx = 0;
var score = 0;
var answered = false;
var timerSec = TIMER_TOTAL;
var timerLoop = null;

/* ═══════════════════════════════════════════════
   DOM REFS
═══════════════════════════════════════════════ */
var pStart = document.getElementById('pStart');
var pQuestion = document.getElementById('pQuestion');
var pResult = document.getElementById('pResult');

var btnStart = document.getElementById('btnStart');
var btnNext = document.getElementById('btnNext');
var btnRestart = document.getElementById('btnRestart');

var lastScoreWrap = document.getElementById('lastScoreWrap');
var lastScoreVal = document.getElementById('lastScoreVal');

var qNum = document.getElementById('qNum');
var tFill = document.getElementById('tFill');
var tNum = document.getElementById('tNum');
var liveScore = document.getElementById('liveScore');
var progFill = document.getElementById('progFill');
var progLabel = document.getElementById('progLabel');
var qText = document.getElementById('qText');
var qOptions = document.getElementById('qOptions');
var qFeedback = document.getElementById('qFeedback');
var qExplain = document.getElementById('qExplanation');

var resEmoji = document.getElementById('resEmoji');
var resTitle = document.getElementById('resTitle');
var rdFill = document.getElementById('rdFill');
var rdScore = document.getElementById('rdScore');
var resMsg = document.getElementById('resMsg');
var rbCorrect = document.getElementById('rbCorrect');
var rbWrong = document.getElementById('rbWrong');
var rbPct = document.getElementById('rbPct');

/* ═══════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════ */
function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

function showPanel(panel) {
    [pStart, pQuestion, pResult].forEach(function (p) {
        if (p) p.classList.remove('active');
    });
    if (panel) panel.classList.add('active');
}

function stopTimer() {
    clearInterval(timerLoop);
    timerLoop = null;
}

/* ── Timer ring helpers ──────────────────────── */
function setTimerRing(sec) {
    if (!tFill || !tNum) return;

    // Clamp to [0, TIMER_TOTAL] so maths never produces bad values
    var clamped = Math.max(0, Math.min(sec, TIMER_TOTAL));
    var offset = TIMER_CIRCUMF * (1 - clamped / TIMER_TOTAL);

    // Always set both dash props together so the ring renders correctly
    tFill.style.strokeDasharray = String(TIMER_CIRCUMF);
    tFill.style.strokeDashoffset = String(offset);

    // Explicit hex/rgb colours so resetting to '' is never needed
    if (sec <= 5) {
        tFill.style.stroke = '#c0392b';
        tNum.style.color = '#c0392b';
    } else if (sec <= 10) {
        tFill.style.stroke = '#b45309';
        tNum.style.color = '#b45309';
    } else {
        tFill.style.stroke = '#1b6b45';  // --c0 green
        tNum.style.color = 'inherit';
    }

    tNum.textContent = String(sec);
}

function startTimer() {
    timerSec = TIMER_TOTAL;
    setTimerRing(timerSec);

    timerLoop = setInterval(function () {
        timerSec -= 1;
        setTimerRing(timerSec);
        if (timerSec <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

/* ── Donut helpers ───────────────────────────── */
function resetDonut() {
    if (!rdFill) return;
    // Turn off transitions, set to empty, force reflow, restore transitions
    rdFill.style.transition = 'none';
    rdFill.style.strokeDasharray = '0 ' + DONUT_CIRCUMF;
    void rdFill.getBoundingClientRect(); // trigger reflow
    rdFill.style.transition = '';
}

function animateDonut(s) {
    if (!rdFill) return;
    var arc = (s / QUESTIONS.length) * DONUT_CIRCUMF;
    // Double rAF ensures the CSS transition fires after the reset
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            rdFill.style.strokeDasharray = arc + ' ' + DONUT_CIRCUMF;
        });
    });
}

/* ═══════════════════════════════════════════════
   LAST SCORE (localStorage)
═══════════════════════════════════════════════ */
function loadLastScore() {
    try {
        var saved = localStorage.getItem('cond-last-score');
        if (saved !== null && lastScoreVal && lastScoreWrap) {
            lastScoreVal.textContent = saved + ' / 20';
            lastScoreWrap.style.display = 'flex';
        }
    } catch (e) { /* localStorage may be blocked */ }
}

function saveScore(s) {
    try { localStorage.setItem('cond-last-score', String(s)); } catch (e) { /* blocked */ }
}

/* ═══════════════════════════════════════════════
   QUIZ FLOW
═══════════════════════════════════════════════ */
function startQuiz() {
    var indices = [];
    for (var k = 0; k < QUESTIONS.length; k++) indices.push(k);
    deck = shuffle(indices);
    qIdx = 0;
    score = 0;
    showPanel(pQuestion);
    loadQuestion();
}

function loadQuestion() {
    answered = false;

    if (btnNext) btnNext.style.display = 'none';
    if (qFeedback) { qFeedback.className = 'q-feedback'; qFeedback.textContent = ''; }
    if (qExplain) { qExplain.className = 'q-explanation'; qExplain.innerHTML = ''; }

    var qData = QUESTIONS[deck[qIdx]];
    var total = QUESTIONS.length;
    var current = qIdx + 1;

    if (qNum) qNum.textContent = 'Q ' + current;
    if (liveScore) liveScore.textContent = String(score);
    if (progFill) progFill.style.width = ((qIdx / total) * 100) + '%';
    if (progLabel) progLabel.textContent = current + ' / ' + total;
    if (qText) qText.textContent = qData.q;

    if (qOptions) {
        qOptions.innerHTML = '';
        var letters = ['A', 'B', 'C', 'D'];
        qData.opts.forEach(function (opt, i) {
            var btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.innerHTML = '<span class="opt-letter">' + letters[i] + '</span><span>' + opt + '</span>';
            btn.dataset.idx = String(i);
            // Capture i in a closure
            (function (idx, el) {
                el.addEventListener('click', function () { handleAnswer(idx, el); });
            }(i, btn));
            qOptions.appendChild(btn);
        });
    }

    stopTimer();
    startTimer();
}

function handleAnswer(selectedIdx, btn) {
    if (answered) return;
    answered = true;
    stopTimer();

    var qData = QUESTIONS[deck[qIdx]];
    var allBtns = qOptions ? qOptions.querySelectorAll('.opt-btn') : [];
    var letters = ['A', 'B', 'C', 'D'];
    var isCorrect = (selectedIdx === qData.ans);

    allBtns.forEach(function (b) { b.disabled = true; });

    if (isCorrect) {
        score += 1;
        btn.classList.add('opt-correct');
        if (qFeedback) {
            qFeedback.textContent = '✅  Correct! Well done!';
            qFeedback.className = 'q-feedback fb-correct';
        }
    } else {
        btn.classList.add('opt-wrong');
        if (allBtns[qData.ans]) allBtns[qData.ans].classList.add('opt-correct');
        if (qFeedback) {
            qFeedback.textContent = '❌  Incorrect. The correct answer was option ' + letters[qData.ans] + '.';
            qFeedback.className = 'q-feedback fb-wrong';
        }
    }

    if (qExplain) {
        qExplain.innerHTML = '<strong>Explanation:</strong> ' + qData.exp;
        qExplain.classList.add('show');
    }

    if (liveScore) liveScore.textContent = String(score);
    if (btnNext) btnNext.style.display = 'flex';
}

function handleTimeout() {
    if (answered) return;
    answered = true;

    var qData = QUESTIONS[deck[qIdx]];
    var allBtns = qOptions ? qOptions.querySelectorAll('.opt-btn') : [];
    var letters = ['A', 'B', 'C', 'D'];

    allBtns.forEach(function (b) { b.disabled = true; });
    if (allBtns[qData.ans]) allBtns[qData.ans].classList.add('opt-timeout');

    if (qFeedback) {
        qFeedback.textContent = "⏰  Time's up! The correct answer was option " + letters[qData.ans] + '.';
        qFeedback.className = 'q-feedback fb-timeout';
    }
    if (qExplain) {
        qExplain.innerHTML = '<strong>Explanation:</strong> ' + qData.exp;
        qExplain.classList.add('show');
    }
    if (btnNext) btnNext.style.display = 'flex';
}

function nextQuestion() {
    qIdx += 1;
    if (qIdx < QUESTIONS.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    stopTimer();
    if (progFill) progFill.style.width = '100%';
    saveScore(score);
    showPanel(pResult);

    var total = QUESTIONS.length;
    var pct = Math.round((score / total) * 100);
    var wrong = total - score;

    if (rdScore) rdScore.textContent = String(score);
    if (rbCorrect) rbCorrect.textContent = String(score);
    if (rbWrong) rbWrong.textContent = String(wrong);
    if (rbPct) rbPct.textContent = pct + '%';

    resetDonut();
    animateDonut(score);

    var emoji, title, msg;
    if (pct === 100) {
        emoji = '🏆'; title = 'Perfect Score!';
        msg = "Flawless! You've completely mastered all four English conditional types. Outstanding!";
    } else if (pct >= 80) {
        emoji = '🌟'; title = 'Excellent!';
        msg = "Impressive! You have a strong grasp of conditional sentences. Just a little review and you'll be perfect.";
    } else if (pct >= 60) {
        emoji = '👍'; title = 'Good Job!';
        msg = 'Solid work! You understand the basics. Focus on the types you missed and try again.';
    } else if (pct >= 40) {
        emoji = '📚'; title = 'Keep Practicing!';
        msg = "You're making progress! Re-read the theory cards above and give the quiz another shot.";
    } else {
        emoji = '💪'; title = "Don't Give Up!";
        msg = 'Conditionals take time to master. Study each type carefully, then come back for another try!';
    }

    if (resEmoji) resEmoji.textContent = emoji;
    if (resTitle) resTitle.textContent = title;
    if (resMsg) resMsg.textContent = msg;

    loadLastScore();
}

function restartQuiz() {
    resetDonut();
    startQuiz();
}

async function sendMessage(userMessage) {
    const response = await fetch("https://english-grammer-chatbot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    return data.reply;
}

/* ═══════════════════════════════════════════════
   EVENT LISTENERS
═══════════════════════════════════════════════ */
if (btnStart) btnStart.addEventListener('click', startQuiz);
if (btnNext) btnNext.addEventListener('click', nextQuestion);
if (btnRestart) btnRestart.addEventListener('click', restartQuiz);

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
loadLastScore();
/* ═══════════════════════════════════════════════
   CHATBOT — Frontend Logic
═══════════════════════════════════════════════ */
(function () {
    'use strict';

    var BACKEND_URL = 'http://localhost:3000/chat';

    /* DOM refs */
    var fab = document.getElementById('chatFab');
    var fabIcon = document.getElementById('fabIcon');
    var fabBadge = document.getElementById('fabBadge');
    var widget = document.getElementById('chatWidget');
    var backdrop = document.getElementById('chatBackdrop');
    var closeBtn = document.getElementById('cwClose');
    var clearBtn = document.getElementById('cwClear');
    var messagesEl = document.getElementById('cwMessages');
    var inputEl = document.getElementById('cwInput');
    var sendBtn = document.getElementById('cwSend');
    var suggestions = document.getElementById('cwSuggestions');
    var navChatBtn = document.getElementById('chatNavBtn');

    var isOpen = false;
    var isBusy = false;
    var unreadCount = 0;

    /* ── Helpers ───────────────────────────── */
    function getTime() {
        var d = new Date();
        var h = d.getHours(), m = d.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
    }

    function scrollToBottom() {
        if (messagesEl) {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
    }

    /* ── Render messages ───────────────────── */
    function appendMessage(text, role, isError) {
        var wrap = document.createElement('div');
        wrap.className = 'cw-msg ' + role + (isError ? ' cw-error' : '');

        var bubble = document.createElement('div');
        bubble.className = 'cw-bubble';
        bubble.textContent = text;

        var time = document.createElement('span');
        time.className = 'cw-time';
        time.textContent = getTime();

        wrap.appendChild(bubble);
        wrap.appendChild(time);
        if (messagesEl) {
            messagesEl.appendChild(wrap);
            scrollToBottom();
        }
        return wrap;
    }

    function showTyping() {
        var wrap = document.createElement('div');
        wrap.className = 'cw-msg bot cw-typing';
        wrap.id = 'cwTyping';
        wrap.innerHTML = '<div class="cw-bubble"><span class="cw-dot"></span><span class="cw-dot"></span><span class="cw-dot"></span></div>';
        if (messagesEl) {
            messagesEl.appendChild(wrap);
            scrollToBottom();
        }
    }

    function removeTyping() {
        var t = document.getElementById('cwTyping');
        if (t) t.remove();
    }

    /* ── Open / Close ──────────────────────── */
    function openChat() {
        isOpen = true;
        if (widget) widget.classList.add('open');
        if (backdrop) backdrop.classList.add('visible');
        if (fab) fab.classList.add('open');
        if (fabIcon) fabIcon.textContent = '✕';
        unreadCount = 0;
        if (fabBadge) fabBadge.style.display = 'none';
        setTimeout(function () { if (inputEl) inputEl.focus(); }, 320);
    }

    function closeChat() {
        isOpen = false;
        if (widget) widget.classList.remove('open');
        if (backdrop) backdrop.classList.remove('visible');
        if (fab) fab.classList.remove('open');
        if (fabIcon) fabIcon.textContent = '💬';
    }

    /* ── Send message ──────────────────────── */
    function sendMessage(text) {
        text = text.trim();
        if (!text || isBusy) return;

        /* Hide suggestions after first real message */
        if (suggestions) suggestions.style.display = 'none';

        appendMessage(text, 'user');
        if (inputEl) { inputEl.value = ''; inputEl.style.height = 'auto'; }

        isBusy = true;
        if (sendBtn) sendBtn.disabled = true;

        showTyping();

        fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        })
            .then(function (res) {
                if (!res.ok) throw new Error('Server error ' + res.status);
                return res.json();
            })
            .then(function (data) {
                removeTyping();
                appendMessage(data.reply || 'Sorry, I have no answer for that.', 'bot');
            })
            .catch(function (err) {
                removeTyping();
                appendMessage(
                    '⚠️ Could not reach the Grammar Bot server.\nMake sure the Node.js backend is running on localhost:3000.',
                    'bot',
                    true
                );
            })
            .finally(function () {
                isBusy = false;
                if (sendBtn) sendBtn.disabled = false;
                if (!isOpen) {
                    unreadCount += 1;
                    if (fabBadge) {
                        fabBadge.textContent = unreadCount;
                        fabBadge.style.display = 'flex';
                    }
                }
            });
    }

    /* ── Event listeners ───────────────────── */
    if (fab) fab.addEventListener('click', function () {
        isOpen ? closeChat() : openChat();
    });

    if (navChatBtn) navChatBtn.addEventListener('click', openChat);

    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    if (backdrop) backdrop.addEventListener('click', closeChat);

    if (clearBtn) clearBtn.addEventListener('click', function () {
        if (messagesEl) messagesEl.innerHTML = '';
        if (suggestions) suggestions.style.display = 'flex';
        addWelcome();
    });

    if (sendBtn) sendBtn.addEventListener('click', function () {
        if (inputEl) sendMessage(inputEl.value);
    });

    if (inputEl) {
        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputEl.value);
            }
        });
        /* Auto-resize textarea */
        inputEl.addEventListener('input', function () {
            inputEl.style.height = 'auto';
            inputEl.style.height = Math.min(inputEl.scrollHeight, 110) + 'px';
        });
    }

    /* Quick suggestion chips */
    if (suggestions) {
        suggestions.querySelectorAll('.cw-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                var msg = chip.getAttribute('data-msg');
                if (msg) {
                    if (!isOpen) openChat();
                    sendMessage(msg);
                }
            });
        });
    }

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closeChat();
    });

    /* ── Welcome message ───────────────────── */
    function addWelcome() {
        appendMessage(
            "👋 Hi! I'm your Grammar Bot.\n\nAsk me anything about English grammar — conditionals, nouns, verbs, tenses, and more!\n\nTry one of the quick topics below, or type your own question.",
            'bot'
        );
    }

    /* ── Init ──────────────────────────────── */
    addWelcome();

}());
