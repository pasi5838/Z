const questions = [
  { q: "Hewan apa yang suka menggonggong?", a: "anjing" },
  { q: "Hewan apa yang hidup di air dan punya insang?", a: "ikan" },
  { q: "Hewan apa yang punya belalai panjang?", a: "gajah" },
  { q: "Hewan apa yang disebut raja hutan?", a: "singa" },
  { q: "Hewan apa yang melompat dan membawa anak di kantongnya?", a: "kanguru" }
];

for (let i = 0; i < 45; i++) {
  questions.push({ q: "Soal hewan ke-" + (i+6), a: "hewan" + (i+6) });
}

let current = 0;

function loadQuestion() {
  document.getElementById("question").innerText = questions[current].q;
}

function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  if (input === questions[current].a) {
    showConfetti();
    current++;
    if (current >= questions.length) {
      alert("Kamu menyelesaikan semua soal!");
      current = 0;
    }
    setTimeout(loadQuestion, 3000);
  } else {
    alert("Jawaban salah!");
  }
  document.getElementById("answer").value = "";
}

function restartGame() {
  current = 0;
  loadQuestion();
}

function showConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 2,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -p.size;
    });
  }

  let duration = 3000;
  const interval = setInterval(draw, 30);
  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, duration);
}

window.onload = loadQuestion;
