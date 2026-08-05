// The <html> tag lives in the single root layout, so Next emits lang="en"
// dir="ltr" for every exported page. Rewrite it on the Arabic page only, so
// crawlers read the correct language and direction straight from the HTML,
// without executing any JavaScript.
import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../out/ar.html", import.meta.url);
const html = await readFile(file, "utf8");
const patched = html.replace(/<html lang="en" dir="ltr"/, '<html lang="ar" dir="rtl"');

if (patched === html) {
  console.error('postbuild: <html lang="en" dir="ltr"> not found in out/ar.html');
  process.exit(1);
}

await writeFile(file, patched);
console.log('postbuild: out/ar.html -> lang="ar" dir="rtl"');
