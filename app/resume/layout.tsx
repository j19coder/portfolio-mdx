export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-zinc-800 pb-4">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          View as PDF
        </a>
        <a
          href="/resume.pdf"
          download="resume.pdf"
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Download PDF
        </a>
      </div>
      <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 px-6 py-6 shadow-sm md:px-8 md:py-8">
        <article className="resume-content">{children}</article>
      </div>
    </div>
  );
}
