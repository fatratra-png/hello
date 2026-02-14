const assetsContainer = document.getElementById('assetsContainer');
const mainHeart = document.getElementById('mainHeart');
const finalMsg = document.getElementById('finalMsg');
const instruction = document.getElementById('instruction');

const assetFiles = [
  'lovely_assets1.png',
  'lovely_assets5.png',
  'lovely_assets6.png',
  'lovely_assets7.png',
  'lovely_assets8.png',
  'lovely_assets10.png',
  'lovely_assets11.png'
];

// Crée 20–30 assets qui flottent lentement
function createFloatingAsset() {
  const asset = document.createElement('div');
  asset.classList.add('asset');

  const file = assetFiles[Math.floor(Math.random() * assetFiles.length)];
  asset.style.backgroundImage = `url(${file})`;

  // Position aléatoire + taille aléatoire
  const size = Math.random() * 40 + 40; // 40–80px
  asset.style.width = size + 'px';
  asset.style.height = size + 'px';

  asset.style.left = Math.random() * 100 + 'vw';
  asset.style.top = Math.random() * 120 + 'vh'; // un peu en dehors

  // Animation CSS différente pour chaque
  const duration = Math.random() * 40 + 50; // 50–90s pour être lent
  const delay = Math.random() * 10;
  const rotate = Math.random() * 360;

  asset.style.animation = `float ${duration}s linear infinite`;
  asset.style.animationDelay = `-${delay}s`;
  asset.style.transform = `rotate(${rotate}deg)`;

  assetsContainer.appendChild(asset);

  // On enlève quand ils sortent vraiment de l'écran
  setTimeout(() => {
    if (asset.getBoundingClientRect().top > window.innerHeight * 1.5) {
      asset.remove();
    }
  }, (duration + delay) * 1000 + 2000);
}

// Animation CSS pour le flottement (à ajouter dans style.css)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes float {
    0%   { transform: translateY(0) rotate(0deg); }
    25%  { transform: translateY(-30vh) rotate(15deg); }
    50%  { transform: translateY(-70vh) rotate(-20deg); }
    75%  { transform: translateY(-40vh) rotate(10deg); }
    100% { transform: translateY(-120vh) rotate(0deg); }
  }
`, styleSheet.cssRules.length);

// Génère les assets flottants en continu
setInterval(createFloatingAsset, 1200); // un nouveau toutes les ~1.2s

// Au chargement, on en met déjà quelques-uns
for (let i = 0; i < 18; i++) {
  setTimeout(createFloatingAsset, i * 800);
}

// === FEU D'ARTIFICE AU CLIC ===
mainHeart.addEventListener('click', (e) => {
  // Cache l'instruction
  instruction.style.opacity = '0';

  // Explosion de particules
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 40; i++) {  // 40 particules
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.classList.add('asset');

      const file = assetFiles[Math.floor(Math.random() * assetFiles.length)];
      particle.style.backgroundImage = `url(${file})`;

      const size = Math.random() * 30 + 30;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 180 + 120;
      const vx = Math.cos(angle) * distance;
      const vy = Math.sin(angle) * distance;

      particle.style.transition = `all ${Math.random() * 1.2 + 1.2}s ease-out`;
      assetsContainer.appendChild(particle);

      // Lance la particule
      setTimeout(() => {
        particle.style.transform = `translate(${vx}px, ${vy}px) rotate(${Math.random() * 720 - 360}deg) scale(0.3)`;
        particle.style.opacity = '0';
      }, 50);

      setTimeout(() => particle.remove(), 3000);
    }, i * 30); // petit délai pour effet cascade
  }

  // Affiche le message final après 1.5–2s
  setTimeout(() => {
    finalMsg.classList.add('visible');
  }, 1800);
});