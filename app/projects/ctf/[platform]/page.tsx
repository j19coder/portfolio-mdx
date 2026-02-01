import Link from "next/link";
import {
  ctfPlatforms,
  ctfPlatformLabels,
  platformKeys,
  getGameKeys,
  type PlatformKey,
} from "@/lib/project-config";

type Props = {
  params: Promise<{ platform: string }>;
};

export function generateStaticParams() {
  return platformKeys.map((platform) => ({ platform }));
}

export default async function CTFPlatformPage({ params }: Props) {
  const { platform } = await params;
  const platformKey = platform as PlatformKey;

  if (!platformKeys.includes(platformKey)) {
    return (
      <div>
        <p className="text-zinc-400">Platform not found.</p>
      </div>
    );
  }

  const platformEntry = ctfPlatforms[platformKey];
  const label = ctfPlatformLabels[platformKey];
  const gameKeys = getGameKeys(platformKey);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">{label}</h1>
        <p className="mt-2 text-zinc-400">
          Write-ups grouped by wargame or box type.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
          Games
        </h2>
        {gameKeys.length > 0 ? (
          <ul className="space-y-3">
            {gameKeys.map((gameKey) => {
              const game = platformEntry.games[gameKey];
              return (
                <li key={gameKey}>
                  <Link
                    href={`/projects/ctf/${platformKey}/${gameKey}`}
                    className="block rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    <span className="font-medium text-zinc-100">
                      {game.label}
                    </span>
                    {game.levels.length > 0 && (
                      <span className="ml-2 text-sm text-zinc-500">
                        ({game.levels.length} write-up
                        {game.levels.length !== 1 ? "s" : ""})
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-zinc-500">No games yet.</p>
        )}
      </section>
    </div>
  );
}
