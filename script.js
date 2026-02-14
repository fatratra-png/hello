// Canvas pour fond animé subtil (étoiles / particules légères)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.4 + 0.1,
    alpha: Math.random() * 0.5 + 0.3
  });
}

function animateBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  particles.forEach(p => {
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -p.size;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateBg);
}
animateBg();

// Génération de cœurs flottants avec tes assets
const heartsContainer = document.getElementById('hearts');
const heartImages = [
  'lovely_assets5.png',
  'lovely_assets6.png',
  'lovely_assets7.png',
  'lovely_assets8.png',
  'lovely_assets10.png',
  'lovely_assets11.png'
  // ajoute les tiens ici
];

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');

  const imgIndex = Math.floor(Math.random() * heartImages.length);
  heart.style.backgroundImage = `url(${heartImages[imgIndex]})`;

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.animationDuration = (Math.random() * 20 + 15) + 's';
  heart.style.animationDelay = Math.random() * 5 + 's';
  heart.style.opacity = Math.random() * 0.7 + 0.3;
  heart.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(${Math.random() * 0.6 + 0.7})`;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 30000);
}

// Spawn hearts toutes les 400-1200ms
setInterval(createHeart, 800);

// Texte qui s'affiche ligne par ligne
const lines = document.querySelectorAll('.line');
lines.forEach(line => {
  const delay = parseFloat(line.dataset.delay) * 1000;
  setTimeout(() => {
    line.classList.add('visible');
  }, delay);
});

// Bonus : clic → explosion de cœurs (mobile friendly)
document.addEventListener('click', (e) => {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('heart-particle');
      heart.style.backgroundImage = `url(${heartImages[Math.floor(Math.random()*heartImages.length)]})`;
      heart.style.left = e.clientX + 'px';
      heart.style.top = e.clientY + 'px';
      heart.style.transform = `translate(-50%, -50%) rotate(${Math.random()*360}deg)`;
      heart.style.animation = 'floatOut 2s forwards';
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }, i * 80);
  }
});

// Ajoute cette animation CSS dans style.css si tu veux → @keyframes floatOut { to { transform: translateY(-150vh) rotate(720deg); opacity: 0; } }
