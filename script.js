const assets = document.getElementById("assets");
const heart = document.getElementById("heart");
const tap = document.getElementById("tap");
const title = document.getElementById("title");
const lines = document.querySelectorAll(".line");
const final = document.getElementById("final");
const bgHeart = document.getElementById("bgHeart");

const files = [
  "lovely_assets1.png",
  "lovely_assets6.png",
  "lovely_assets7.png",
  "lovely_assets8.png"
];

// FLOATING PARTICLES
function spawnAsset(){
  const el=document.createElement("div");
  el.className="asset";
  el.style.backgroundImage=`url(${files[Math.random()*files.length|0]})`;
  const s=30+Math.random()*50;
  el.style.width=el.style.height=s+"px";
  el.style.left=Math.random()*100+"vw";
  el.style.animationDuration=(40+Math.random()*40)+"s";
  assets.appendChild(el);
  setTimeout(()=>el.remove(),90000);
}
for(let i=0;i<20;i++)setTimeout(spawnAsset,i*400);
setInterval(spawnAsset,1200);

// TEXT REVEAL + CINEMA MODE
setTimeout(()=>{
  title.classList.add("show");

  // HEART DISAPPEAR
  heart.classList.add("fade-out");
  tap.style.opacity=0;

  // DARK LOVE MODE
  document.body.classList.add("love-mode");

  // BACKGROUND HEART
  setTimeout(()=>bgHeart.classList.add("show"),3000);

  // LINES
  lines.forEach(l=>{
    setTimeout(()=>l.classList.add("show"), l.dataset.delay*1000);
  });
},1500);

// HEART EXPLOSION
heart.onclick=()=>{
  const r=heart.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;

  for(let i=0;i<40;i++){
    const p=document.createElement("div");
    p.className="asset";
    p.style.backgroundImage=`url(${files[Math.random()*files.length|0]})`;
    p.style.width=p.style.height=(20+Math.random()*40)+"px";
    p.style.left=cx+"px";
    p.style.top=cy+"px";

    const a=Math.random()*Math.PI*2;
    const d=150+Math.random()*250;
    const x=Math.cos(a)*d;
    const y=Math.sin(a)*d;

    assets.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.transition="1.6s";
      p.style.transform=`translate(${x}px,${y}px) scale(.2)`;
      p.style.opacity=0;
    });
    setTimeout(()=>p.remove(),2500);
  }
};

// FINAL CONFESSION
setTimeout(()=>{
  final.innerHTML = "Ghostie why are you sooooooo💜";
  final.classList.add("show");
},18000);
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const loveSound = document.getElementById("loveSound");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

// FORMULE COEUR ❤️
function heartShape(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

function createHeartFirework() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < 400; i++) {
    const t = (Math.PI * 2) * (i / 400);
    const p = heartShape(t);

    particles.push({
      x: cx,
      y: cy,
      vx: p.x * 6,
      vy: p.y * 6,
      alpha: 1,
      size: 3 + Math.random()*2
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx * 0.02;
    p.y += p.vy * 0.02;
    p.alpha -= 0.004;

    ctx.fillStyle = `rgba(255, 100, 255, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fill();
  });

  particles = particles.filter(p => p.alpha > 0);
  requestAnimationFrame(animateFireworks);
}
const countdown = document.getElementById("countdown");

// TIMELINE CINEMA
setTimeout(startFinalSequence, 20000); // après tes messages

function startFinalSequence() {

  // CINEMA BLACKOUT
  document.body.classList.add("blackout");

  // Countdown
  let count = 3;
  countdown.classList.add("show");
  countdown.innerText = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.innerText = count;
    } else {
      clearInterval(timer);
      countdown.classList.remove("show");
      launchFireworks();
    }
  }, 1000);
}

function launchFireworks() {
  canvas.style.display = "block";

  // Play music
  loveSound.currentTime = 0;
  loveSound.volume = 0.9;
  loveSound.play();

  // Fireworks
  createHeartFirework();
  animateFireworks();

  // MULTIPLE HEARTS
  setInterval(createHeartFirework, 2000);

  // Messages après 30s
  setTimeout(showFinalMessages, 30000);
}
function showFinalMessages() {
  final.innerHTML = `
    Itokiana 💜<br>
    Tu es mon endroit préféré dans ce monde.<br>
    Je t’aime.
  `;
  final.classList.add("show");
}
if (count === 1) {
  document.body.style.animation = "shake .4s";
}
