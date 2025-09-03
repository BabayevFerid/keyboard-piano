let audioCtx = null;
let intervalId = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

export function startMetronome(bpm = 120, onTick = () => {}) {
  initAudio();
  stopMetronome(); // əgər işləyirsə dayandır

  const interval = (60 / bpm) * 1000; // ms-də
  intervalId = setInterval(() => {
    playClick();
    onTick();
  }, interval);
}

export function stopMetronome() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function playClick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(1000, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.05); // qısa "click"
}
