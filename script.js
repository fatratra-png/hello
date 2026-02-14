// ELEMENTS
const assets = document.getElementById("assets");
const heart = document.getElementById("heart");
const tap = document.getElementById("tap");
const title = document.getElementById("title");
const lines = document.querySelectorAll(".line");
const final = document.getElementById("final");
const bgHeart = document.getElementById("bgHeart");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const loveSound = document.getElementById("loveSound");
const countdown = document.getElementById("countdown");
const messageBox = document.querySelector(".message-box");

// Canvas size
canvas.width = innerWidth;
canvas.height = innerHeight;
window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

// ASSETS
const files = [
  "lovely_assets1.png",
  "lovely_assets6.png",
  "lovely_assets7.png",
  "lovely_assets8.png",
];

// AUDIO UNLOCK
document.body.addEventListener(
  "click",
  () => {
    loveSound.play().then(() => {
      loveSound.pause();
      loveSound.currentTime = 0;
    });
  },
  { once: true },
);

// FLOATING PARTICLES
function spawnAsset() {
  const el = document.createElement("div");
  el.className = "asset";
  el.style.backgroundImage = `url(${files[(Math.random() * files.length) | 0]})`;
  const s = 30 + Math.random() * 50;
  el.style.width = el.style.height = s + "px";
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 40 + Math.random() * 40 + "s";
  assets.appendChild(el);
  setTimeout(() => el.remove(), 90000);
}
for (let i = 0; i < 20; i++) setTimeout(spawnAsset, i * 400);
setInterval(spawnAsset, 1200);

// =====================
// 🎬 TEXT TIMELINE
// =====================

// Show intro messages
setTimeout(() => {
  title.classList.add("show");
  heart.classList.add("fade-out");
  tap.style.opacity = 0;

  lines.forEach((l) => {
    setTimeout(() => l.classList.add("show"), l.dataset.delay * 1000);
  });
}, 1500);

// 🔥 17s → EVERYTHING DISAPPEARS + GHOSTIE
setTimeout(() => {
  title.style.opacity = 0;
  lines.forEach((l) => (l.style.opacity = 0));
  bgHeart.style.opacity = 0;

  final.innerHTML = `Ghostie why are you sooooooo 💜<br>`;
  final.classList.add("show");
}, 17000);

// ⏱️ 18s → COUNTDOWN
setTimeout(startCountdown, 18000);

function startCountdown() {
  final.classList.remove("show");

  let c = 3;
  countdown.style.display = "flex";
  countdown.classList.add("show");
  countdown.innerText = c;

  const timer = setInterval(() => {
    c--;
    if (c > 0) {
      countdown.innerText = c;
    } else {
      clearInterval(timer);
      countdown.classList.remove("show");
      countdown.style.display = "none";
      launchFireworks();
    }
  }, 1000);
}

// =====================
// ❤️ HEART FIREWORKS
// =====================
let particles = [];

function heartShape(t) {
  const x = 16 * Math.sin(t) ** 3;
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
  return { x, y };
}

function createHeartFirework() {
  const cx = canvas.width / (2 * (window.devicePixelRatio || 1));
  const cy = canvas.height / (2 * (window.devicePixelRatio || 1));

  const COUNT = innerWidth < 500 ? 200 : innerWidth < 1200 ? 350 : 600;
  for (let i = 0; i < COUNT; i++) {
    const t = (Math.PI * 2 * i) / 400;
    const p = heartShape(t);

    const scale = innerWidth < 500 ? 3.5 : innerWidth < 1000 ? 5 : 7;
    particles.push({
      x: cx,
      y: cy,
      vx: p.x * scale,
      vy: p.y * scale,
      alpha: 1,
      size: 3 + Math.random() * 2,
      hue: 300 + Math.random() * 60,
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.vx * 0.02;
    p.y += p.vy * 0.02;
    p.alpha -= 0.004;

    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsl(${p.hue},100%,70%)`;
    ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.alpha})`;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter((p) => p.alpha > 0);
  requestAnimationFrame(animateFireworks);
}

// =====================
// 🎆 LAUNCH FIREWORKS
// =====================
function launchFireworks() {
  canvas.style.display = "block";

  // 🔥 FORCE HIDE ALL TEXT FOREVER
  title.style.display = "none";
  lines.forEach((l) => (l.style.display = "none"));
  final.style.display = "none";
  messageBox.style.display = "none";
  bgHeart.style.display = "none";

  // Play music
  loveSound.currentTime = 0;
  loveSound.volume = 1;
  loveSound.play().catch(() => console.log("Audio blocked"));

  createHeartFirework();
  animateFireworks();
  setInterval(createHeartFirework, 2000);

  // After 25s → draw her name
  setTimeout(() => {
    particles = [];
    createTextParticles("ITOKIANA");
    animateTextParticles();
  }, 25000);
}

// =====================
// ✨ TEXT PARTICLES (NAME)
// =====================
const textCanvas = document.getElementById("textCanvas");
const tctx = textCanvas.getContext("2d");
textCanvas.width = innerWidth;
textCanvas.height = innerHeight;

let textParticles = [];

function createTextParticles(text) {
  textCanvas.width = innerWidth;
  textCanvas.height = innerHeight;

  tctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  const fontSize = Math.min(innerWidth / 5, 200);

  tctx.fillStyle = "white";
  tctx.textAlign = "center";
  tctx.textBaseline = "middle";
  tctx.font = `900 ${fontSize}px 'Baloo 2', sans-serif`;
  tctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

  const img = tctx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  textParticles = [];
  const gap = innerWidth < 500 ? 7 : innerWidth < 1200 ? 4 : 2;

  for (let y = 0; y < textCanvas.height; y += gap) {
    for (let x = 0; x < textCanvas.width; x += gap) {
      const i = (y * textCanvas.width + x) * 4;
      if (img[i] > 200) {
        textParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tx: x,
          ty: y,
          size: 2 + Math.random() * 1.5,
          alpha: 0,
        });
      }
    }
  }
}

function animateTextParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 15;
  ctx.shadowColor = "#ff66ff";

  textParticles.forEach((p) => {
    p.x += (p.tx - p.x) * 0.07;
    p.y += (p.ty - p.y) * 0.07;
    p.alpha = Math.min(1, p.alpha + 0.02);

    ctx.fillStyle = `rgba(255,120,255,${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateTextParticles);
}
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("resize", resizeCanvas);
heart.addEventListener("click", () => {
  loveSound.currentTime = 0;
  loveSound.play().catch(() => {});
});
if (navigator.vibrate) {
  navigator.vibrate([200, 100, 200, 100, 200]);
}
console.log("DPR:", window.devicePixelRatio);
