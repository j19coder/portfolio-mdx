import Link from "next/link";
import {
  ctfPlatformLabels,
  platformKeys,
  type PlatformKey,
} from "@/lib/project-config";

export default function CTFHubPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">CTF Captures</h1>
        <p className="mt-2 text-zinc-400">
          Write-ups from penetration testing and CTF machines, grouped by
          platform and game.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
          Platforms
        </h2>
        <ul className="space-y-3">
          {platformKeys.map((platformKey) => {
            const label = ctfPlatformLabels[platformKey as PlatformKey];
            return (
              <li key={platformKey}>
                <Link
                  href={`/projects/ctf/${platformKey}`}
                  className="block rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  <span className="font-medium text-zinc-100">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
