/**
 * Single source of truth for Projects hierarchy: sections (CTF, ML, etc.),
 * CTF platforms/games/levels, and a flat search index.
 */

export type LevelEntry = { slug: string; title: string; date: string };

export type GameEntry = {
  label: string;
  levels: LevelEntry[];
};

export type PlatformEntry = {
  label: string;
  games: Record<string, GameEntry>;
};

export type ProjectSection = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export const projectSections: ProjectSection[] = [
  {
    id: "ctf",
    label: "CTF",
    href: "/projects/ctf",
    description: "Write-ups from penetration testing and CTF machines.",
  },
  {
    id: "ml",
    label: "ML",
    href: "/projects/ml",
    description: "Machine learning and data science projects.",
  },
  {
    id: "development",
    label: "Development",
    href: "/projects/development",
    description: "Software development and language notes.",
  },
  {
    id: "misc",
    label: "Misc",
    href: "/projects/misc",
    description: "Other projects and experiments.",
  },
];

export type PlatformKey = "overthewire" | "hackthebox" | "tryhackme";

export const ctfPlatformLabels: Record<PlatformKey, string> = {
  overthewire: "OverTheWire",
  hackthebox: "Hack The Box",
  tryhackme: "TryHackMe",
};

export const ctfPlatforms: Record<PlatformKey, PlatformEntry> = {
  overthewire: {
    label: "OverTheWire",
    games: {
      bandit: {
        label: "Bandit",
        levels: [
          { slug: "level-00", title: "Level 0 → Level 1", date: "2025-12-12 23:44" },
          { slug: "level-01", title: "Level 1 → Level 2", date: "2025-12-12 23:51" },
          { slug: "level-02", title: "Level 2 → Level 3", date: "2025-12-13 00:01" },
          { slug: "level-03", title: "Level 3 → Level 4", date: "2025-12-13 00:06" },
          { slug: "level-04", title: "Level 4 → Level 5", date: "2025-12-13 00:14" },
          { slug: "level-05", title: "Level 5 → Level 6", date: "2025-12-13 00:28" },
          { slug: "level-06", title: "Level 6 → Level 7", date: "2025-12-13 00:35" },
        ],
      },
      leviathan: { label: "Leviathan", levels: [] },
      other: { label: "Other", levels: [] },
    },
  },
  hackthebox: {
    label: "Hack The Box",
    games: {
      sample: {
        label: "Sample",
        levels: [{ slug: "sample", title: "Sample Machine", date: "2026-01-30" }],
      },
    },
  },
  tryhackme: {
    label: "TryHackMe",
    games: {},
  },
};

export type SearchIndexEntry = {
  path: string;
  title: string;
  breadcrumb: string;
};

/** Flat search index for all project write-ups and section pages. */
export function getSearchIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  // Section pages
  for (const section of projectSections) {
    entries.push({
      path: section.href,
      title: section.label,
      breadcrumb: `Projects > ${section.label}`,
    });
  }

  // CTF: platform pages
  for (const [platformKey, platform] of Object.entries(ctfPlatforms)) {
    entries.push({
      path: `/projects/ctf/${platformKey}`,
      title: platform.label,
      breadcrumb: `Projects > CTF > ${platform.label}`,
    });

    // CTF: game pages and level write-ups
    for (const [gameKey, game] of Object.entries(platform.games)) {
      entries.push({
        path: `/projects/ctf/${platformKey}/${gameKey}`,
        title: game.label,
        breadcrumb: `Projects > CTF > ${platform.label} > ${game.label}`,
      });

      for (const level of game.levels) {
        entries.push({
          path: `/projects/ctf/${platformKey}/${gameKey}/${level.slug}`,
          title: level.title,
          breadcrumb: `Projects > CTF > ${platform.label} > ${game.label} > ${level.title}`,
        });
      }
    }
  }

  return entries;
}

/** All platform keys for type-safe iteration. */
export const platformKeys: PlatformKey[] = [
  "overthewire",
  "hackthebox",
  "tryhackme",
];

/** Get game key from platform (e.g. 'bandit' from overthewire). */
export function getGameKeys(platformKey: PlatformKey): string[] {
  return Object.keys(ctfPlatforms[platformKey].games);
}

/** Get level slugs for a platform+game. */
export function getLevelSlugs(
  platformKey: PlatformKey,
  gameKey: string
): LevelEntry[] {
  const game = ctfPlatforms[platformKey]?.games[gameKey];
  return game?.levels ?? [];
}
