import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { relative } from "node:path";
import test from "node:test";

import {
  docsRoot,
  listMarkdownFiles,
  markdownLinks,
  resolveMarkdownTarget,
} from "./helpers.mjs";

test("documentation corpus is substantial and bilingual", () => {
  const files = listMarkdownFiles();
  const relativePaths = files.map((file) =>
    relative(docsRoot, file).replaceAll("\\", "/"),
  );

  assert.ok(
    files.length >= 12,
    `expected at least 12 Markdown pages, found ${files.length}`,
  );
  assert.ok(
    relativePaths.some((path) => path.startsWith("en/")),
    "English documentation is missing",
  );
  assert.ok(
    relativePaths.some((path) => !path.startsWith("en/")),
    "Chinese documentation is missing",
  );
});

test("all local Markdown links resolve to committed files", () => {
  const failures = [];

  for (const file of listMarkdownFiles()) {
    const content = readFileSync(file, "utf8");
    for (const link of markdownLinks(content)) {
      const target = resolveMarkdownTarget(file, link);
      if (target && !target.startsWith(docsRoot)) {
        failures.push(`${relative(docsRoot, file)} escapes docs root: ${link}`);
      } else if (target && !readFileSyncSafe(target)) {
        failures.push(`${relative(docsRoot, file)} -> ${link}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});

function readFileSyncSafe(path) {
  try {
    readFileSync(path);
    return true;
  } catch {
    return false;
  }
}

test("public pages do not contain unfinished placeholders", () => {
  const forbidden = [/\bTODO\b/i, /待补充/, /lorem ipsum/i, /\[placeholder\]/i];
  const failures = [];

  for (const file of listMarkdownFiles()) {
    const content = readFileSync(file, "utf8");
    for (const pattern of forbidden) {
      if (pattern.test(content)) {
        failures.push(`${relative(docsRoot, file)} contains ${pattern}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});
