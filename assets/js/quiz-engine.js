/* ============================================================
   QUIZ-ENGINE.JS
   ============================================================
   Ye file har test HTML page use karti hai. Test page ko sirf
   ek QUIZ_CONFIG object define karke initQuiz(QUIZ_CONFIG) call
   karna hota hai — baaki sab (timer, navigation, scoring,
   review) ye engine sambhal leta hai.

   QUIZ_CONFIG format:
   {
     title: "Test ka naam",
     durationMinutes: 15,          // 0 = no timer
     questions: [
       {
         q: "Question text",
         options: ["Option A", "Option B", "Option C", "Option D"],
         answer: 0,                 // index of correct option
         explanation: "Optional explanation text"
       },
       ...
     ]
   }
   ============================================================ */

let QUIZ_STATE = {
    config: null,
    current: 0,
    userAnswers: [],   // index selected per question, null = unanswered
    submitted: false,
    timerInterval: null,
    secondsLeft: 0
};

function initQuiz(config) {
    QUIZ_STATE.config = config;
    QUIZ_STATE.userAnswers = new Array(config.questions.length).fill(null);
    QUIZ_STATE.current = 0;
    QUIZ_STATE.submitted = false;

    document.getElementById('quizTitleText').textContent = config.title;

    if (config.durationMinutes && config.durationMinutes > 0) {
        QUIZ_STATE.secondsLeft = config.durationMinutes * 60;
        startTimer();
    } else {
        const timerEl = document.getElementById('quizTimer');
        if (timerEl) timerEl.style.display = 'none';
    }

    renderJumpGrid();
    renderQuestion();
}

function startTimer() {
    updateTimerDisplay();
    QUIZ_STATE.timerInterval = setInterval(() => {
        QUIZ_STATE.secondsLeft--;
        updateTimerDisplay();
        if (QUIZ_STATE.secondsLeft <= 0) {
            clearInterval(QUIZ_STATE.timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const el = document.getElementById('quizTimer');
    if (!el) return;
    const m = Math.floor(QUIZ_STATE.secondsLeft / 60);
    const s = QUIZ_STATE.secondsLeft % 60;
    el.innerHTML = `<i class="far fa-clock"></i> ${m}:${s.toString().padStart(2, '0')}`;
    el.classList.toggle('low', QUIZ_STATE.secondsLeft <= 60);
}

function renderJumpGrid() {
    const grid = document.getElementById('jumpGrid');
    if (!grid) return;
    grid.innerHTML = QUIZ_STATE.config.questions.map((_, i) => {
        const answered = QUIZ_STATE.userAnswers[i] !== null;
        const isCurrent = i === QUIZ_STATE.current;
        return `<button class="jump-btn${answered ? ' answered' : ''}${isCurrent ? ' current' : ''}" onclick="goToQuestion(${i})">${i + 1}</button>`;
    }).join('');
}

function goToQuestion(i) {
    QUIZ_STATE.current = i;
    renderQuestion();
}

function renderQuestion() {
    const q = QUIZ_STATE.config.questions[QUIZ_STATE.current];
    const total = QUIZ_STATE.config.questions.length;
    const selected = QUIZ_STATE.userAnswers[QUIZ_STATE.current];

    document.getElementById('questionCounter').textContent =
        `પ્રશ્ન ${QUIZ_STATE.current + 1} / ${total}`;

    document.getElementById('progressFill').style.width =
        `${((QUIZ_STATE.current + 1) / total) * 100}%`;

    document.getElementById('questionText').textContent = q.q;

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    document.getElementById('optionList').innerHTML = q.options.map((opt, idx) => {
        const isSelected = selected === idx;
        return `
            <div class="option-item${isSelected ? ' selected' : ''}" onclick="selectOption(${idx})">
                <span class="opt-letter">${letters[idx]}</span>
                <span>${opt}</span>
            </div>`;
    }).join('');

    document.getElementById('prevBtn').disabled = QUIZ_STATE.current === 0;
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    if (QUIZ_STATE.current === total - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }

    renderJumpGrid();
}

function selectOption(idx) {
    QUIZ_STATE.userAnswers[QUIZ_STATE.current] = idx;
    renderQuestion();
}

function nextQuestion() {
    if (QUIZ_STATE.current < QUIZ_STATE.config.questions.length - 1) {
        QUIZ_STATE.current++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (QUIZ_STATE.current > 0) {
        QUIZ_STATE.current--;
        renderQuestion();
    }
}

function submitQuiz() {
    if (QUIZ_STATE.timerInterval) clearInterval(QUIZ_STATE.timerInterval);
    QUIZ_STATE.submitted = true;

    const questions = QUIZ_STATE.config.questions;
    let correct = 0, wrong = 0, skipped = 0;
    questions.forEach((q, i) => {
        const ans = QUIZ_STATE.userAnswers[i];
        if (ans === null) skipped++;
        else if (ans === q.answer) correct++;
        else wrong++;
    });
    const pct = Math.round((correct / questions.length) * 100);

    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('resultBody').style.display = 'block';

    document.getElementById('resultCircle').style.setProperty('--pct', pct);
    document.getElementById('resultPct').textContent = pct + '%';
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = wrong;
    document.getElementById('resultSkipped').textContent = skipped;

    // Build review list
    const reviewHTML = questions.map((q, i) => {
        const ans = QUIZ_STATE.userAnswers[i];
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const optsHTML = q.options.map((opt, idx) => {
            let cls = '';
            if (idx === q.answer) cls = 'correct';
            else if (idx === ans && ans !== q.answer) cls = 'wrong';
            return `<div class="option-item ${cls}"><span class="opt-letter">${letters[idx]}</span><span>${opt}</span></div>`;
        }).join('');
        const explanationHTML = q.explanation
            ? `<div class="explanation"><strong>સમજૂતી:</strong> ${q.explanation}</div>` : '';
        return `
            <div class="question-card">
                <div class="question-counter">પ્રશ્ન ${i + 1}</div>
                <h3>${q.q}</h3>
                <div class="option-list">${optsHTML}</div>
                ${explanationHTML}
            </div>`;
    }).join('');
    document.getElementById('reviewList').innerHTML = reviewHTML;
}

function retryQuiz() {
    document.getElementById('resultBody').style.display = 'none';
    document.getElementById('quizBody').style.display = 'block';
    initQuiz(QUIZ_STATE.config);
}

