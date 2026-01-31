import Link from "next/link";

type PlatformKey = "overthewire";

const platformLabels: Record<PlatformKey, string> = {
  overthewire: "OverTheWire",
};

type Walkthrough = { slug: string; title: string; date: string };

type BoxGroup = { boxType: string; items: Walkthrough[] };

const ctfSections: Record<PlatformKey, BoxGroup[]> = {
  overthewire: [
    { boxType: "Bandit", items: [{ slug: "bandit-level-0", title: "Level 0", date: "2025-12-12 23:44" }, 
      { slug: "bandit-level-1", title: "Level 1", date: "2025-12-12 23:51" }] },
    { boxType: "Leviathan", items: [] },
    { boxType: "Other", items: [] },
  ],
};

export default function CTFPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">CTF Captures</h1>
        <p className="mt-2 text-zinc-400">
          Write-ups from penetration testing and CTF machines, grouped by platform and box type.
        </p>
      </div>

      {(Object.keys(ctfSections) as PlatformKey[]).map((platformKey) => {
        const platformName = platformLabels[platformKey];
        const boxGroups = ctfSections[platformKey];

        return (
          <section key={platformKey} className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              {platformName}
            </h2>

            <div className="space-y-6">
              {boxGroups.map(({ boxType, items }) => (
                <div
                  key={boxType}
                  className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-4 md:p-5"
                >
                  <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3">
                    {boxType}
                  </h3>
                  {items.length > 0 ? (
                    <ul className="space-y-2">
                      {items.map(({ slug, title, date }) => (
                        <li key={slug}>
                          <Link
                            href={`/ctf/${slug}`}
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
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
