import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { relative } from "node:path";
import test from "node:test";

import {
  docsRoot,
  listMarkdownFiles,
  markdownLinks,
  readRepositoryFile,
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

test("firmware guides describe only the supported USB maintenance flow", () => {
  const chinese = readRepositoryFile(
    "docs/guide/firmware-version-management.md",
  );
  const english = readRepositoryFile(
    "docs/en/guide/firmware-version-management.md",
  );

  assert.match(chinese, /屏幕亮度/);
  assert.match(chinese, /系统音量/);
  assert.match(chinese, /配对密钥/);
  assert.match(chinese, /USB 烧录已经开始/);
  assert.match(chinese, /不会改写设备/);
  assert.doesNotMatch(chinese, /OTA/);
  assert.doesNotMatch(chinese, /下载到设备中的 Application/);
  assert.doesNotMatch(chinese, /重新下载 Application/);

  assert.match(english, /screen brightness/i);
  assert.match(english, /system volume/i);
  assert.match(english, /pairing secret/i);
  assert.match(english, /USB flashing has started/i);
  assert.match(english, /does not modify the robot/i);
  assert.doesNotMatch(english, /OTA/);
  assert.doesNotMatch(english, /Applications downloaded to the robot/i);
  assert.doesNotMatch(english, /download Applications/i);
});
