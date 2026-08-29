import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
export const docsRoot = resolve(repositoryRoot, "docs");

export function readRepositoryFile(path) {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

export function repositoryFileExists(path) {
  return existsSync(resolve(repositoryRoot, path));
}

export function listMarkdownFiles(directory = docsRoot) {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory()
      ? listMarkdownFiles(path)
      : extname(entry.name) === ".md"
        ? [path]
        : [];
  });
}

export function resolveMarkdownTarget(sourceFile, rawTarget) {
  const target = decodeURIComponent(rawTarget.split("#")[0].split("?")[0]);
  if (!target || /^(https?:|mailto:|tel:|data:)/.test(target)) {
    return null;
  }

  const absolute = target.startsWith("/")
    ? resolve(docsRoot, target.slice(1))
    : resolve(dirname(sourceFile), target);

  const candidates = extname(absolute)
    ? [absolute]
    : [absolute, `${absolute}.md`, resolve(absolute, "index.md")];

  return candidates.find((candidate) => existsSync(candidate)) ?? absolute;
}

export function markdownLinks(content) {
  return [
    ...content.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+['"][^'"]*['"])?\)/g),
  ].map((match) => match[1]);
}
