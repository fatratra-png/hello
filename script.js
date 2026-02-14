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
