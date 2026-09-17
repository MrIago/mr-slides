// Captura quadros de um deck local (Vite) com Playwright, para conferir animação e layout em 1:1.
// uso: node capture.mjs --url http://localhost:5173/#/slide --presses 3 --wait 1500 --shots 700,700,1500 --clip 0,250,960,460 --out /tmp/frames/x
// presses: quantas setas antes da primeira captura · shots: esperas (ms) entre capturas sucessivas · clip: x,y,w,h opcional
import { chromium } from "/home/mriago/.bun/install/cache/playwright-core@1.60.0@@@1/index.mjs";
import { readdirSync, existsSync } from "node:fs"; import { join } from "node:path"; import { homedir } from "node:os";
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const base = join(homedir(), ".cache/ms-playwright");
const exe = readdirSync(base).filter(d => d.startsWith("chromium")).map(d => join(base, d, "chrome-linux64/chrome")).find(existsSync);
const b = await chromium.launch({ executablePath: exe, headless: true });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on("pageerror", e => console.log("ERR", e.message));
await p.goto(arg("url", "http://localhost:5173/")); await p.waitForTimeout(Number(arg("wait", 1500)));
for (let i = 0; i < Number(arg("presses", 0)); i++) { await p.keyboard.press("ArrowRight"); await p.waitForTimeout(Number(arg("gap", 400))); }
const clipArg = arg("clip", ""); const clip = clipArg ? (([x, y, width, height]) => ({ x, y, width, height }))(clipArg.split(",").map(Number)) : undefined;
const shots = arg("shots", "1500").split(",").map(Number); const out = arg("out", "/tmp/frame");
for (let k = 0; k < shots.length; k++) { await p.waitForTimeout(shots[k]); await p.screenshot({ path: `${out}${k}.png`, clip }); console.log(`${out}${k}.png`); }
await b.close();
