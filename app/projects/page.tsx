import Link from "next/link";
import { projectSections } from "@/lib/project-config";

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">Projects</h1>
        <p className="mt-2 text-zinc-400">
          CTF write-ups, ML experiments, development notes, and more.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projectSections.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="block rounded-lg border border-zinc-700 bg-zinc-900/40 p-5 transition hover:border-zinc-600 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <h2 className="text-xl font-semibold text-zinc-100">{section.label}</h2>
            <p className="mt-2 text-sm text-zinc-400">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
