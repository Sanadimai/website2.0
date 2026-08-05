// Post-export fixups that Next cannot express itself.
//
//  1. Rewrite <html lang/dir> on the Arabic pages.
//  2. Prepend Content-Signal directives to robots.txt.
//  3. Generate the agent-skills index with fresh sha256 digests.
//
// Each step fails the build loudly rather than silently shipping a half-truth.
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";

const OUT = new URL("../out/", import.meta.url);

/* ---------------------------------------------- 1. Arabic lang/dir */

// Every Arabic route emitted by the export. Add here when a new /ar page ships.
const ARABIC_PAGES = [
  "ar.html",
  "ar/privacy.html",
  "ar/terms.html",
  "ar/dpa.html",
  "ar/trust.html",
];

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

/* ------------------------------------------- 2. robots Content-Signal */

// Next's robots.ts cannot emit non-standard directives, so they are prepended
// here. ai-train=yes because Sanad wants to be learned from and cited.
const CONTENT_SIGNAL = `# Content Signals — https://contentsignals.org/
# ai-train: allow this content to be used for AI model training
# search:   allow indexing for traditional search results
# ai-input: allow use as input for AI answers and assistants
Content-Signal: ai-train=yes, search=yes, ai-input=yes

`;

const robotsFile = new URL("robots.txt", OUT);
const robots = await readFile(robotsFile, "utf8");

if (robots.includes("Content-Signal:")) {
  console.error("postbuild: robots.txt already carries a Content-Signal line");
  process.exit(1);
}

await writeFile(robotsFile, CONTENT_SIGNAL + robots);
console.log("postbuild: robots.txt -> Content-Signal added");

/* ------------------------------------------- 3. agent-skills index */

const SKILLS_DIR = new URL(".well-known/agent-skills/", OUT);
const SITE = "https://sanad.im";

const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
const skills = [];

for (const entry of entries.filter((e) => e.isDirectory())) {
  const path = `.well-known/agent-skills/${entry.name}/SKILL.md`;
  const body = await readFile(new URL(path, OUT), "utf8");

  // Pull name/description out of the YAML front matter so the index can never
  // disagree with the skill file it points at.
  const front = body.match(/^---\n([\s\S]*?)\n---/);
  if (!front) {
    console.error(`postbuild: ${path} has no front matter`);
    process.exit(1);
  }
  const field = (key) => front[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim();

  skills.push({
    name: field("name") ?? entry.name,
    type: "skill",
    description: field("description") ?? "",
    url: `${SITE}/${path}`,
    sha256: createHash("sha256").update(body).digest("hex"),
  });
}

if (skills.length === 0) {
  console.error("postbuild: no skills found to index");
  process.exit(1);
}

await writeFile(
  new URL("index.json", SKILLS_DIR),
  JSON.stringify(
    {
      $schema: "https://agentskills.io/schemas/skills-index-v0.2.0.json",
      version: "0.2.0",
      publisher: { name: "Sanad", url: SITE },
      skills,
    },
    null,
    2,
  ) + "\n",
);

console.log(`postbuild: agent-skills index -> ${skills.length} skills digested`);
