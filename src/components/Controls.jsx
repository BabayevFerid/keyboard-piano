import React, { useState } from "react";

export default function Controls() {
  const [sustain, setSustain] = useState(false);
  const [octave, setOctave] = useState(4);

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
      <button onClick={() => setSustain(!sustain)}>
        Sustain: {sustain ? "On" : "Off"}
      </button>
      <div>
        Octave:
        <button onClick={() => setOctave(octave - 1)}>-</button>
        <span style={{ margin: "0 10px" }}>{octave}</span>
        <button onClick={() => setOctave(octave + 1)}>+</button>
      </div>
    </div>
  );
}
