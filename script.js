const canvas = document.getElementById('court');
const ctx = canvas.getContext('2d');

const positions = [
  { x: 300, y: 50 },    // PG
  { x: 100, y: 150 },   // SG
  { x: 500, y: 150 },   // SF
  { x: 150, y: 300 },   // PF
  { x: 450, y: 300 }    // C
];

const steps = [
  {
    desc: "Step 1: PG passes to either wing.",
    move: [[0, 300, 50]],
    pass: [0, 1]
  },
  {
    desc: "Step 2: PG and low post screen away.",
    move: [[0, 450, 300], [3, 300, 150]]
  },
  {
    desc: "Step 3-4: Opposite wing cuts to high post.",
    move: [[2, 300, 100]]
  },
  {
    desc: "Step 5: Opposite low post rotates.",
    move: [[4, 150, 300]]
  },
  {
    desc: "Reset if no option: High post to PG.",
    move: [[2, 300, 50]],
    pass: [1, 2]
  }
];

let currentStep = 0;

function drawCourt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ddd";
  ctx.beginPath();
  ctx.arc(300, 350, 60, 0, Math.PI, true);
  ctx.stroke();
  ctx.closePath();
}

function drawPlayers() {
  const labels = ['PG', 'SG', 'SF', 'PF', 'C'];
  positions.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = "#3498db";
    ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(labels[i], p.x - 12, p.y + 5);
  });
}

function drawPass(from, to) {
  ctx.strokeStyle = "#e74c3c";
  ctx.beginPath();
  ctx.moveTo(positions[from].x, positions[from].y);
  ctx.lineTo(positions[to].x, positions[to].y);
  ctx.stroke();
}

function runStep() {
  drawCourt();
  if (steps[currentStep].move) {
    steps[currentStep].move.forEach(([index, x, y]) => {
      positions[index] = { x, y };
    });
  }
  drawPlayers();
  if (steps[currentStep].pass) {
    drawPass(...steps[currentStep].pass);
  }
  document.getElementById('stepDesc').innerText = steps[currentStep].desc;
}

function nextStep() {
  if (currentStep < steps.length - 1) currentStep++;
  runStep();
}

function prevStep() {
  if (currentStep > 0) currentStep--;
  runStep();
}

runStep();
