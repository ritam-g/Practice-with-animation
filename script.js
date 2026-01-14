const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 🌈 Cloudy bouncing drops
const drops = [];
const dropCount = 15;

for (let i = 0; i < dropCount; i++) {
  drops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.8,
    baseSize: 20 + Math.random() * 40,
    speedY: 1 + Math.random() * 2,
    direction: 1, // 1 = down, -1 = up
    offset: Math.random() * 100,
    alpha: 0.4 + Math.random() * 0.3,
    h: Math.random() * 360,
    s: 70,
    l: 70
  });
}

// 🎞️ Animation
let time = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.02;

  drops.forEach(d => {
    // move up & down
    d.y += d.speedY * d.direction;

    // bounce at bottom
    if (d.y + d.baseSize > canvas.height) {
      d.y = canvas.height - d.baseSize;
      d.direction *= -1; // go up
      d.h = Math.random() * 360; // change color on bounce
    }

    // bounce at top
    if (d.y - d.baseSize < 0) {
      d.y = d.baseSize;
      d.direction *= -1; // go down
      d.h = Math.random() * 360; // change color on bounce
    }

    // smooth morphing (soft cloud effect)
    const rx = d.baseSize + Math.sin(time + d.offset) * d.baseSize * 0.5;
    const ry = d.baseSize + Math.cos(time + d.offset) * d.baseSize * 0.3;

    ctx.beginPath();
    ctx.ellipse(d.x, d.y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${d.h}, ${d.s}%, ${d.l}%, ${d.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
