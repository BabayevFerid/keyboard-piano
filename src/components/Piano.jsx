import React, { useState } from "react";
import { playNote, stopNote, getNoteName } from "../utils/audio";

export default function Piano({ recorder, isRecording }) {
  const [activeNotes, setActiveNotes] = useState(new Set());

  const keys = Array.from({ length: 24 }, (_, i) => 60 + i); // 2 oktava (C4 – B5)

  function handleMouseDown(midi) {
    const key = playNote(midi);
    setActiveNotes(new Set([...activeNotes, midi]));

    if (isRecording) recorder.recordEvent("on", midi, 0.9);
  }

  function handleMouseUp(midi) {
    stopNote(midi);
    const newSet = new Set(activeNotes);
    newSet.delete(midi);
    setActiveNotes(newSet);

    if (isRecording) recorder.recordEvent("off", midi);
  }

  return (
    <div style={{ display: "flex", position: "relative", height: "200px" }}>
      {keys.map((midi) => {
        const isSharp = [1, 3, 6, 8, 10].includes(midi % 12);
        const style = {
          width: isSharp ? "30px" : "50px",
          height: isSharp ? "120px" : "200px",
          background: isSharp ? "black" : "white",
          border: "1px solid #333",
          position: "relative",
          zIndex: isSharp ? 2 : 1,
          marginLeft: isSharp ? "-15px" : "0",
          color: isSharp ? "white" : "black",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontSize: "10px",
          cursor: "pointer",
          boxShadow: activeNotes.has(midi)
            ? "inset 0px 0px 10px yellow"
            : "none",
        };
        return (
          <div
            key={midi}
            style={style}
            onMouseDown={() => handleMouseDown(midi)}
            onMouseUp={() => handleMouseUp(midi)}
          >
            {getNoteName(midi)}
          </div>
        );
      })}
    </div>
  );
}
