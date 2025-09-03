import React, { useState, useEffect } from "react";
import { playNote, stopNote, getNoteName } from "../utils/audio";

// QWERTY → MIDI mapping (2 oktava üçün nümunə)
const keyMap = {
  a: 60, // C4
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72, // C5
  o: 73,
  l: 74,
  p: 75,
  ";": 76,
};

export default function Piano({ recorder, isRecording }) {
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [keyPressed, setKeyPressed] = useState({});

  const keys = Array.from({ length: 24 }, (_, i) => 60 + i); // C4 → B5

  function noteOn(midi) {
    playNote(midi);
    setActiveNotes((prev) => new Set([...prev, midi]));
    if (isRecording) recorder.recordEvent("on", midi, 0.9);
  }

  function noteOff(midi) {
    stopNote(midi);
    setActiveNotes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(midi);
      return newSet;
    });
    if (isRecording) recorder.recordEvent("off", midi);
  }

  // Klaviatura inputları
  useEffect(() => {
    function handleKeyDown(e) {
      const midi = keyMap[e.key.toLowerCase()];
      if (midi && !keyPressed[e.key]) {
        setKeyPressed((prev) => ({ ...prev, [e.key]: true }));
        noteOn(midi);
      }
    }

    function handleKeyUp(e) {
      const midi = keyMap[e.key.toLowerCase()];
      if (midi) {
        setKeyPressed((prev) => ({ ...prev, [e.key]: false }));
        noteOff(midi);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording, keyPressed]);

  // Mouse inputları
  function handleMouseDown(midi) {
    noteOn(midi);
  }

  function handleMouseUp(midi) {
    noteOff(midi);
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
