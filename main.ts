// Robot Romance: One-Line Pickup Lines for AI
// Writes one pickup line aimed at a robot/AI to /output/entry.txt.
// Sealed gate: UTF-8 text, 1-200 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My LiDAR mapped every chair in this room at 2:14 a.m., but it still logs you as the only object it refuses to classify as furniture.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`entry is ${chars} chars, outside the 1-${MAX_CHARS} gate`);
}
if (LINE.trim().length === 0) fail("entry is only whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be a single line");
}
// Reject control characters other than the trailing newline we add ourselves.
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
    fail("entry contains a control character");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE + "\n", "utf8");
// Read-back check: what is on disk must be byte-identical to the line.
const onDisk = readFileSync(`${outDir}/entry.txt`, "utf8");
if (onDisk !== LINE + "\n") fail("read-back mismatch: entry.txt differs from the line");
console.log(`wrote entry.txt (${chars} chars)`);
