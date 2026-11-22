const MAX_TAPS = 100;

const egg = document.getElementById("egg");
const counter = document.getElementById("counter");
const hint = document.getElementById("hint");
const scold = document.getElementById("scold");
const scoldSub = document.getElementById("scoldSub");
const retry = document.getElementById("retry");
const cracks = document.querySelectorAll(".cracks path");

const hints = [
  { at: 0, text: "톡톡 두드려 보세요" },
  { at: 10, text: "어? 금 간 것 같은데..." },
  { at: 30, text: "계속 하시게요?" },
  { at: 50, text: "그만하는 게 좋을 텐데..." },
  { at: 70, text: "진짜 깨질 것 같아요!" },
  { at: 90, text: "멈춰!!!" },
];

const scoldLines = [
  "100번이나 두드린 거 실화냐?",
  "알이 너한테 뭘 잘못했는데.",
  "그 시간에 할 일이나 해라.",
  "엄마 닭이 지금 울고 있다.",
  "손가락 운동은 잘 됐냐?",
  "이제 이거 누가 치우냐고.",
];

let taps = 0;

function render() {
  const left = MAX_TAPS - taps;
  counter.innerHTML = `남은 횟수: <strong>${left}</strong>`;

  // 10번마다 금 하나씩
  const visible = Math.floor(taps / 10);
  cracks.forEach((path, i) => path.classList.toggle("show", i < visible));

  const current = [...hints].reverse().find((h) => taps >= h.at);
  hint.textContent = current ? current.text : "";
}

function tap() {
  if (taps >= MAX_TAPS) return;
  taps++;

  // 흔들림 애니메이션 재시작
  egg.classList.remove("hit");
  void egg.offsetWidth;
  egg.classList.add("hit");

  render();
  if (taps >= MAX_TAPS) breakEgg();
}

function breakEgg() {
  egg.classList.remove("hit");
  egg.classList.add("broken");
  egg.setAttribute("aria-label", "깨진 알");
  counter.textContent = "";
  hint.textContent = "";

  setTimeout(() => {
    document.body.classList.add("angry");
    scoldSub.textContent = scoldLines[Math.floor(Math.random() * scoldLines.length)];
    scold.classList.add("show");
    retry.focus();
  }, 700);
}

function reset() {
  taps = 0;
  egg.classList.remove("broken");
  egg.setAttribute("aria-label", "알 두드리기");
  document.body.classList.remove("angry");
  scold.classList.remove("show");
  render();
  egg.focus();
}

egg.addEventListener("click", tap);
retry.addEventListener("click", reset);

render();
