// The <html> tag lives in the single root layout, so Next emits lang="en"
// dir="ltr" for every exported page. Rewrite it on every Arabic page, so
// crawlers read the correct language and direction straight from the HTML,
// without executing any JavaScript.
import { readFile, writeFile } from "node:fs/promises";

const OUT = new URL("../out/", import.meta.url);

// Every Arabic route emitted by the export. Add here when a new /ar page ships.
const ARABIC_PAGES = ["ar.html", "ar/privacy.html", "ar/terms.html", "ar/dpa.html"];

let patchedCount = 0;

for (const page of ARABIC_PAGES) {
  const file = new URL(page, OUT);
  const html = await readFile(file, "utf8");
  const patched = html.replace(/<html lang="en" dir="ltr"/, '<html lang="ar" dir="rtl"');

  if (patched === html) {
    console.error(`postbuild: <html lang="en" dir="ltr"> not found in out/${page}`);
    process.exit(1);
  }

  await writeFile(file, patched);
  patchedCount += 1;
}

console.log(`postbuild: ${patchedCount} Arabic pages -> lang="ar" dir="rtl"`);
