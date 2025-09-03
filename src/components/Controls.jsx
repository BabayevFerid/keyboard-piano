import React, { useState } from "react";
import { startMetronome, stopMetronome } from "../utils/metronome";

export default function Controls() {
  const [sustain, setSustain] = useState(false);
  const [octave, setOctave] = useState(4);
  const [bpm, setBpm] = useState(120);
  const [isMetronome, setIsMetronome] = useState(false);

  function toggleMetronome() {
    if (isMetronome) {
      stopMetronome();
      setIsMetronome(false);
    } else {
      startMetronome(bpm);
      setIsMetronome(true);
    }
  }

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
      {/* Sustain */}
      <button onClick={() => setSustain(!sustain)}>
        Sustain: {sustain ? "On" : "Off"}
      </button>

      {/* Oktava dəyişmə */}
      <div>
        Octave:
        <button onClick={() => setOctave(octave - 1)}>-</button>
        <span style={{ margin: "0 10px" }}>{octave}</span>
        <button onClick={() => setOctave(octave + 1)}>+</button>
      </div>

      {/* Metronom */}
      <div>
        <label>BPM: </label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          style={{ width: "60px", marginRight: "10px" }}
        />
        <button onClick={toggleMetronome}>
          {isMetronome ? "🛑 Stop" : "▶️ Start"} Metronome
        </button>
      </div>
    </div>
  );
}
