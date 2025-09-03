let audioCtx = null;
let masterGain = null;
const activeNotes = new Map();

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.9;
    masterGain.connect(audioCtx.destination);
  }
}

export function playNote(midi, velocity = 0.8) {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = midiToFreq(midi);

  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(velocity, now + 0.01);
  gain.gain.linearRampToValueAtTime(velocity * 0.7, now + 0.3);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(now);

  const key = midi + "_" + Math.random();
  activeNotes.set(key, { osc, gain });
  return key;
}

export function stopNote(key) {
  if (!activeNotes.has(key)) return;
  const { osc, gain } = activeNotes.get(key);
  const now = audioCtx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
  osc.stop(now + 0.5);
  activeNotes.delete(key);
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function getNoteName(midi) {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const n = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  return names[n] + octave;
}
