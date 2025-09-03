import React from "react";
import Piano from "./components/Piano";
import Controls from "./components/Controls";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>🎹 Keyboard Piano</h1>
      <Controls />
      <Piano />
    </div>
  );
}
