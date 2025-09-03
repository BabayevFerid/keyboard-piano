import React, { useState } from "react";
import Piano from "./components/Piano";
import Controls from "./components/Controls";
import Recorder from "./components/Recorder";

export default function App() {
  const [recorder] = useState(new Recorder());
  const [isRecording, setIsRecording] = useState(false);

  function handleStartRecording() {
    recorder.start();
    setIsRecording(true);
  }

  function handleStopRecording() {
    recorder.stop();
    setIsRecording(false);
  }

  function handlePlayRecording() {
    recorder.play();
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>🎹 Keyboard Piano</h1>

      {/* Kontrol paneli */}
      <Controls />

      {/* Piano klavişləri */}
      <Piano recorder={recorder} isRecording={isRecording} />

      {/* Recorder düymələri */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {!isRecording ? (
          <button onClick={handleStartRecording}>⏺ Start Recording</button>
        ) : (
          <button onClick={handleStopRecording}>⏹ Stop Recording</button>
        )}
        <button onClick={handlePlayRecording} disabled={recorder.events.length === 0}>
          ▶️ Play Recording
        </button>
      </div>
    </div>
  );
}
