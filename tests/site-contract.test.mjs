import assert from "node:assert/strict";
import test from "node:test";

import { readRepositoryFile, repositoryFileExists } from "./helpers.mjs";

const requiredPages = [
  "docs/index.md",
  "docs/guide/getting-started.md",
  "docs/guide/client-and-device.md",
  "docs/guide/firmware-version-management.md",
  "docs/sdk/index.md",
  "docs/troubleshooting/index.md",
  "docs/en/index.md",
  "docs/en/guide/getting-started.md",
  "docs/en/guide/client-and-device.md",
  "docs/en/guide/firmware-version-management.md",
  "docs/en/sdk/index.md",
  "docs/en/troubleshooting/index.md",
];

test("official documentation exposes the required Chinese and English entry points", () => {
  for (const page of requiredPages) {
    assert.equal(
      repositoryFileExists(page),
      true,
      `missing required page: ${page}`,
    );
  }
});

test("site navigation is shared data and every navigation target exists", async () => {
  const navigationModule = await import("../docs/.vitepress/navigation.mjs");
  const { siteNavigation } = navigationModule;

  assert.deepEqual(Object.keys(siteNavigation).sort(), ["en", "zh"]);

  for (const [locale, navigation] of Object.entries(siteNavigation)) {
    assert.ok(
      navigation.nav.length >= 4,
      `${locale} top navigation is incomplete`,
    );
    assert.ok(
      Object.keys(navigation.sidebar).length >= 3,
      `${locale} sidebar is incomplete`,
    );

    const links = [
      ...navigation.nav.map((item) => item.link),
      ...Object.values(navigation.sidebar).flatMap((groups) =>
        groups.flatMap((group) => group.items.map((item) => item.link)),
      ),
    ];

    for (const link of links) {
      const localizedPath =
        link === "/" ? "docs/index.md" : `docs${link.replace(/\/$/, "")}.md`;
      const indexPath = link === "/" ? "docs/index.md" : `docs${link}index.md`;
      assert.ok(
        repositoryFileExists(localizedPath) || repositoryFileExists(indexPath),
        `${locale} navigation target does not exist: ${link}`,
      );
    }
  }
});

test("VitePress config enables project Pages, local search, locales and social source link", () => {
  const config = readRepositoryFile("docs/.vitepress/config.mts");

  assert.match(config, /base:\s*['"]\/WatcheRobot-Docs\/['"]/);
  assert.match(config, /provider:\s*['"]local['"]/);
  assert.match(config, /locales:\s*\{/);
  assert.match(config, /https:\/\/github\.com\/orulink-ai\/WatcheRobot-Docs/);
  assert.match(config, /cleanUrls:\s*true/);
});

test("each VitePress 2 locale owns its rendered navigation and sidebar", () => {
  const config = readRepositoryFile("docs/.vitepress/config.mts");
  const localeBlockStart = config.indexOf("  locales: {");
  const globalThemeStart = config.indexOf(
    "\n  themeConfig: {",
    localeBlockStart,
  );
  const localeBlock = config.slice(localeBlockStart, globalThemeStart);

  assert.match(
    localeBlock,
    /root:\s*\{[\s\S]*?themeConfig:\s*\{[\s\S]*?nav:\s*siteNavigation\.zh\.nav/,
  );
  assert.match(
    localeBlock,
    /en:\s*\{[\s\S]*?themeConfig:\s*\{[\s\S]*?nav:\s*siteNavigation\.en\.nav/,
  );
  assert.match(
    localeBlock,
    /en:\s*\{[\s\S]*?footer:\s*\{[\s\S]*?WatcheRobot official documentation/,
  );
  assert.doesNotMatch(
    config.slice(globalThemeStart),
    /locales:\s*\{[\s\S]*?nav:/,
  );
});

test("firmware version guide explains Factory Reset in user-facing language", () => {
  const guide = readRepositoryFile("docs/guide/firmware-version-management.md");
  const englishGuide = readRepositoryFile(
    "docs/en/guide/firmware-version-management.md",
  );

  for (const requiredConcept of [
    "客户端切换版本",
    "恢复出厂设置",
    "固件版本不会改变",
    "操作前",
    "操作步骤",
    "操作完成后",
    "OTA 自动回滚",
    "有线救援",
  ]) {
    assert.match(
      guide,
      new RegExp(requiredConcept),
      `missing concept: ${requiredConcept}`,
    );
  }

  for (const requiredConcept of [
    "Factory Reset",
    "firmware version does not change",
    "Before you start",
    "Steps",
    "After the reset",
  ]) {
    assert.match(
      englishGuide,
      new RegExp(requiredConcept),
      `missing English concept: ${requiredConcept}`,
    );
  }

  for (const internalTerm of [
    "当前实现",
    "建议保留",
    "产品文案",
    "nvs_flash_erase",
    "/spiffs/app_center",
  ]) {
    assert.doesNotMatch(
      guide,
      new RegExp(internalTerm),
      `internal implementation language leaked into user docs: ${internalTerm}`,
    );
  }

  for (const internalTerm of [
    "current implementation",
    "should remain available",
    "Product copy",
    "nvs_flash_erase",
    "/spiffs/app_center",
  ]) {
    assert.doesNotMatch(
      englishGuide,
      new RegExp(internalTerm, "i"),
      `internal implementation language leaked into English user docs: ${internalTerm}`,
    );
  }
});
