// ======= Safe helpers =======
function $(id) {
  return document.getElementById(id);
}

// ======= Footer year =======
const yearEl = $("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ======= Quotes =======
const quotes = [
  { text: "Let go of the past and keep moving forward.", author: "Hsin-Chih Chang" },
  { text: "Start first, then get better.", author: "Personal motto" },
  { text: "Slow progress is still progress.", author: "Mindset" },
  { text: "Small steps every day lead to big changes.", author: "Self-growth" },
  { text: "Focus on what I can build today.", author: "Work ethic" }
];

let idx = 0;
let auto = true;
let timer = null;

const quoteText = $("quoteText");
const quoteAuthor = $("quoteAuthor");

function renderQuote(i) {
  if (!quoteText || !quoteAuthor) return;
  const q = quotes[i];
  quoteText.textContent = q.text;
  quoteAuthor.textContent = `— ${q.author}`;
}

function next() {
  idx = (idx + 1) % quotes.length;
  renderQuote(idx);
}

function prev() {
  idx = (idx - 1 + quotes.length) % quotes.length;
  renderQuote(idx);
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, 5000);
}

function stopAuto() {
  if (timer) clearInterval(timer);
  timer = null;
}

// Bind buttons (only if exist)
const btnPrev = $("btnPrev");
const btnNext = $("btnNext");
const btnToggleAuto = $("btnToggleAuto");
const btnRandomQuote = $("btnRandomQuote");

if (btnNext) btnNext.addEventListener("click", () => { next(); if (auto) startAuto(); });
if (btnPrev) btnPrev.addEventListener("click", () => { prev(); if (auto) startAuto(); });

if (btnToggleAuto) {
  btnToggleAuto.addEventListener("click", () => {
    auto = !auto;

    // Keep your original button text style (Chinese / English both ok)
    const isChineseUI = btnToggleAuto.textContent.includes("自動") || btnToggleAuto.textContent.includes("輪播");
    btnToggleAuto.textContent = isChineseUI
      ? `自動輪播：${auto ? "開" : "關"}`
      : `Auto: ${auto ? "On" : "Off"}`;

    if (auto) startAuto();
    else stopAuto();
  });
}

if (btnRandomQuote) {
  btnRandomQuote.addEventListener("click", () => {
    idx = Math.floor(Math.random() * quotes.length);
    renderQuote(idx);

    const quotesSection = document.getElementById("quotes");
    if (quotesSection) quotesSection.scrollIntoView({ behavior: "smooth" });

    if (auto) startAuto();
  });
}

// Init
renderQuote(idx);
if (auto) startAuto();

// ======= Theme Toggle =======
const themeToggle = $("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// ======= Skills Chart =======
const ctx = document.getElementById('skillsChart');
if (ctx) {
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Python', 'MATLAB', 'Web Dev', 'AI/ML', 'Engineering', 'Physics'],
      datasets: [{
        label: 'Skill Level',
        data: [80, 75, 70, 65, 85, 60],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}
