import assert from "node:assert/strict";
import test from "node:test";

import { readRepositoryFile, repositoryFileExists } from "./helpers.mjs";

test("GitHub Pages workflow tests and builds before deployment", () => {
  assert.equal(
    repositoryFileExists(".github/workflows/deploy-pages.yml"),
    true,
  );
  const workflow = readRepositoryFile(".github/workflows/deploy-pages.yml");

  for (const requiredStep of [
    "actions/checkout@v7",
    "actions/setup-node@v7",
    "npm ci",
    "npm test",
    "npm run docs:build",
    "actions/configure-pages@v6",
    "actions/upload-pages-artifact@v5",
    "actions/deploy-pages@v5",
  ]) {
    assert.match(
      workflow,
      new RegExp(requiredStep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `missing workflow step: ${requiredStep}`,
    );
  }
});

test("design system declares approved tokens, reduced motion and bundled fonts", () => {
  const styles = readRepositoryFile("docs/.vitepress/theme/custom.css");
  const theme = readRepositoryFile("docs/.vitepress/theme/index.ts");

  for (const token of [
    "--wr-color-ink",
    "--wr-color-brand",
    "--wr-color-warning",
    "--wr-radius-sm",
    "--wr-radius-md",
    "--wr-radius-lg",
    "--wr-motion-fast",
  ]) {
    assert.match(styles, new RegExp(token));
  }

  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(styles, /(?:linear|radial)-gradient\(/);
  assert.match(theme, /@fontsource-variable\/manrope/);
  assert.match(theme, /@fontsource-variable\/noto-sans-sc/);
  assert.match(theme, /@fontsource-variable\/jetbrains-mono/);
});
