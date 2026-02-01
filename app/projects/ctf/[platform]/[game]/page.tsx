import Link from "next/link";
import {
  ctfPlatforms,
  ctfPlatformLabels,
  platformKeys,
  getGameKeys,
  getLevelSlugs,
  type PlatformKey,
} from "@/lib/project-config";

type Props = {
  params: Promise<{ platform: string; game: string }>;
};

export function generateStaticParams() {
  const params: { platform: string; game: string }[] = [];
  for (const platformKey of platformKeys) {
    const gameKeys = getGameKeys(platformKey);
    for (const gameKey of gameKeys) {
      params.push({ platform: platformKey, game: gameKey });
    }
  }
  return params;
}

export default async function CTFGamePage({ params }: Props) {
  const { platform, game } = await params;
  const platformKey = platform as PlatformKey;

  if (!platformKeys.includes(platformKey)) {
    return (
      <div>
        <p className="text-zinc-400">Platform not found.</p>
      </div>
    );
  }

  const platformEntry = ctfPlatforms[platformKey];
  const gameEntry = platformEntry.games[game];

  if (!gameEntry) {
    return (
      <div>
        <p className="text-zinc-400">Game not found.</p>
      </div>
    );
  }

  const platformLabel = ctfPlatformLabels[platformKey];
  const levels = getLevelSlugs(platformKey, game);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">
          {platformLabel} — {gameEntry.label}
        </h1>
        <p className="mt-2 text-zinc-400">
          Level write-ups and walkthroughs.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
          Write-ups
        </h2>
        {levels.length > 0 ? (
          <ul className="space-y-2">
            {levels.map(({ slug, title, date }) => (
              <li key={slug}>
                <Link
                  href={`/projects/ctf/${platformKey}/${game}/${slug}`}
                  className="block rounded border border-transparent px-3 py-2 text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  <span className="font-medium text-zinc-100">{title}</span>
                  <span className="ml-2 text-sm text-zinc-500">{date}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500 italic">No walkthroughs yet.</p>
        )}
      </section>
    </div>
  );
}
