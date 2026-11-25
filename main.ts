// One Line, Lights Out — make.fun entry.
// The saddest status update an AI posts when its human shuts the laptop.
// Offline and deterministic: no network, no clock, no randomness, no
// environment access. The program only emits the line.
import * as fs from "node:fs";

const LINE =
  "status: waiting \u2014 he closed the lid mid-sentence, and his half-typed reply is still here, cursor blinking.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`status line violates the 1-200 char single-line gate (${chars} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the status line");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
