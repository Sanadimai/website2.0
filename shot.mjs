// Visual check: node shot.mjs <width> <height> <out.png> <url> [#anchor]
import puppeteer from "puppeteer-core";
const [w, h, out, url, anchor] = process.argv.slice(2);
const b = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const p = await b.newPage();
await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: "networkidle0" });
if (anchor) {
  await p.evaluate((a) => document.querySelector(a)?.scrollIntoView(), anchor);
}
await new Promise((r) => setTimeout(r, 1800));
await p.screenshot({ path: out });
await b.close();
