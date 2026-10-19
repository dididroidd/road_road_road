#!/usr/bin/env node
// Crée les labels, milestones et issues GitHub à partir de docs/tickets.md.
//
// Simulation (par défaut) : node scripts/create-github-issues.mjs
// Création réelle         : node scripts/create-github-issues.mjs --apply --repo <owner>/<repo>
//
// Prérequis pour --apply : GitHub CLI installé et connecté (`gh auth login`).

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const repoIndex = args.indexOf("--repo");
const repo = repoIndex >= 0 ? args[repoIndex + 1] : undefined;

if (apply && !repo) {
  console.error("Avec --apply, précise le dépôt : --repo <owner>/<repo>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(join(root, "docs", "tickets.md"), "utf8");

const MILESTONE_DESCRIPTIONS = {
  "M0 · Fondations": "Dépôt, outils, design system",
  "M1 · Données": "Base, import des circuits, API",
  "M2 · App V1": "Les écrans de la maquette",
  "M3 · Publication": "Qualité et Play Store",
  "Plus tard": "Idées hors V1",
};

const LABEL_COLORS = {
  setup: "5319e7",
  ci: "5319e7",
  mobile: "1d76db",
  ecran: "0e8a16",
  carte: "006b75",
  design: "d4c5f9",
  backend: "fbca04",
  données: "c2e0c6",
  docs: "bfdadc",
  legal: "e4e669",
  qualite: "f9d0c4",
  release: "b60205",
  "non-dev": "ededed",
  "plus-tard": "cccccc",
  "taille:S": "eeeeee",
  "taille:M": "dddddd",
  "taille:L": "bbbbbb",
};

function parseTickets(text) {
  const sections = text.split(/^## /m).slice(1);
  return sections.map((section) => {
    const [header, ...rest] = section.split("\n");
    const match = header.match(/^(T\d+)\s*·\s*(.+)$/);
    if (!match) throw new Error(`Titre de ticket invalide : "${header}"`);
    const [, id, title] = match;

    const metaIndex = rest.findIndex((line) => line.startsWith("**Milestone:**"));
    if (metaIndex < 0) throw new Error(`${id} : ligne de métadonnées manquante`);
    const meta = Object.fromEntries(
      rest[metaIndex].split("|").map((part) => {
        const [, key, value] = part.trim().match(/^\*\*(.+?):\*\*\s*(.*)$/);
        return [key, value.trim()];
      }),
    );

    const body = rest
      .slice(metaIndex + 1)
      .join("\n")
      .replace(/\n---\s*$/, "")
      .trim();

    return {
      id,
      title,
      milestone: meta["Milestone"],
      labels: [...meta["Labels"].split(",").map((l) => l.trim()), `taille:${meta["Taille"]}`],
      size: meta["Taille"],
      dependsOn: meta["Dépend de"] === "—" ? [] : meta["Dépend de"].split(",").map((d) => d.trim()),
      body,
    };
  });
}

function gh(...ghArgs) {
  return execFileSync("gh", ghArgs, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

const tickets = parseTickets(markdown);
const ids = new Set(tickets.map((t) => t.id));
for (const ticket of tickets) {
  for (const dep of ticket.dependsOn) {
    if (!ids.has(dep)) throw new Error(`${ticket.id} dépend de ${dep}, qui n'existe pas`);
    if (Number(dep.slice(1)) >= Number(ticket.id.slice(1))) {
      throw new Error(`${ticket.id} dépend de ${dep} : une dépendance doit précéder le ticket`);
    }
  }
}

const labels = [...new Set(tickets.flatMap((t) => t.labels))];
const milestones = [...new Set(tickets.map((t) => t.milestone))];

console.log(
  `${tickets.length} tickets, ${labels.length} labels, ${milestones.length} milestones\n`,
);

if (!apply) {
  for (const t of tickets) {
    const deps = t.dependsOn.length ? ` ← ${t.dependsOn.join(", ")}` : "";
    console.log(`[${t.milestone}] ${t.id} ${t.title} (${t.labels.join(", ")})${deps}`);
  }
  console.log(
    "\nSimulation uniquement. Ajoute --apply --repo <owner>/<repo> pour créer les issues.",
  );
  process.exit(0);
}

for (const label of labels) {
  gh(
    "label",
    "create",
    label,
    "--repo",
    repo,
    "--color",
    LABEL_COLORS[label] ?? "ededed",
    "--force",
  );
  console.log(`label ✓ ${label}`);
}

const existingMilestones = JSON.parse(
  gh("api", `repos/${repo}/milestones?state=all&per_page=100`),
).map((m) => m.title);
for (const title of milestones) {
  if (existingMilestones.includes(title)) continue;
  gh(
    "api",
    `repos/${repo}/milestones`,
    "-f",
    `title=${title}`,
    "-f",
    `description=${MILESTONE_DESCRIPTIONS[title] ?? ""}`,
  );
  console.log(`milestone ✓ ${title}`);
}

const tempDir = mkdtempSync(join(tmpdir(), "tickets-"));
const issueNumbers = {};
for (const t of tickets) {
  const deps = t.dependsOn.map((d) => `#${issueNumbers[d]} (${d})`).join(", ") || "—";
  const body = `**Taille :** ${t.size} · **Dépend de :** ${deps}\n\n${t.body}`;
  const bodyFile = join(tempDir, `${t.id}.md`);
  writeFileSync(bodyFile, body, "utf8");

  const url = gh(
    "issue",
    "create",
    "--repo",
    repo,
    "--title",
    `${t.id} · ${t.title}`,
    "--body-file",
    bodyFile,
    "--milestone",
    t.milestone,
    ...t.labels.flatMap((l) => ["--label", l]),
  );
  issueNumbers[t.id] = url.split("/").pop();
  console.log(`issue ✓ ${t.id} → ${url}`);
}
