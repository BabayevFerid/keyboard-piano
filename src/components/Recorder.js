// src/components/Recorder.js

import { playNote, stopNote } from "../utils/audio";

export default class Recorder {
  constructor() {
    this.events = [];
    this.isRecording = false;
    this.startTime = 0;
  }

  start() {
    this.events = [];
    this.isRecording = true;
    this.startTime = performance.now();
  }

  stop() {
    this.isRecording = false;
  }

  recordEvent(type, midi, velocity = 0.8) {
    if (!this.isRecording) return;
    const time = performance.now() - this.startTime;
    this.events.push({ type, midi, velocity, time });
  }

  async play() {
    if (this.events.length === 0) return;
    const start = performance.now();

    for (const ev of this.events) {
      const wait = ev.time - (performance.now() - start);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));

      if (ev.type === "on") {
        playNote(ev.midi, ev.velocity);
      } else if (ev.type === "off") {
        // burada sadələşdirilmişdir — realda midi ilə matching etmək olar
        stopNote([...Array.from(new Map())][0]);
      }
    }
  }
}
