# Portfolio (MDX + Next.js)

Minimalist dark-mode portfolio with MDX, Next.js, and Tailwind. Includes reusable Header/Footer, a **Projects** hub (CTF, ML, Development, Misc), CTF write-ups organized by platform and game, search, and a terminal-style component for commands.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment (optional)

Copy `.env.local.example` to `.env.local` and set your GitHub and LinkedIn URLs:

- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`

Optional: `NEXT_PUBLIC_SYNTAX_HIGHLIGHTER=prism` or `rsh` for `<Terminal>` and `<CodeSnippet>` (default is `rsh`).

## Projects structure

- **`/projects`** — Hub with links to CTF, ML, Development, and Misc.
- **`/projects/ctf`** — CTF hub: platforms (OverTheWire, Hack The Box, TryHackMe).
- **`/projects/ctf/[platform]`** — Platform page listing games (e.g. Bandit, Leviathan).
- **`/projects/ctf/[platform]/[game]`** — Game page listing level write-ups.
- **`/projects/ctf/[platform]/[game]/[slug]`** — Individual write-up (MDX).

Breadcrumbs and header **Search** (client-side over the project index) are available on project pages. The single source of truth for the hierarchy is `lib/project-config.ts`.

## Adding a new CTF write-up

1. **Config**: In `lib/project-config.ts`, add a level entry to the right platform/game (e.g. under `ctfPlatforms.overthewire.games.bandit.levels`):
   ```ts
   { slug: "level-2", title: "Level 2", date: "2026-01-15" },
   ```
2. **Page**: Create `app/projects/ctf/[platform]/[game]/[slug]/page.mdx` (e.g. `app/projects/ctf/overthewire/bandit/level-2/page.mdx`). Use `content/ctf/template.mdx` as reference; fill in `<Terminal>` blocks with commands and output.

The write-up will appear on the game’s level list and in Search automatically.

## Terminal component

Use `<Terminal>` in MDX for commands and output (terminal-style, with prompt). Props: `title`, `prompt`, `language`, `command`, `output`, or `lines`. See existing CTF write-ups for examples.

## CodeSnippet component

Use `<CodeSnippet>` in MDX for code with **line numbers** (no terminal prompt). Good for Java, Python, Rust, Go, etc. Optional `output` shows multi-line output below the code.

```mdx
<CodeSnippet
  language="python"
  title="example.py"
  code={"def foo():\n    return 42"}
  output={"42"}
/>
```

Multi-line output: use `\n` in the string, e.g. `output={"Line 1\nLine 2\nLine 3"}`.

Props: `code`, `language` (e.g. `python`, `java`, `rust`, `go`), optional `title`, optional `output`. Respects `NEXT_PUBLIC_SYNTAX_HIGHLIGHTER`.

## Resume page

- **On-page content**: Edit `app/resume/page.mdx`; it renders as MDX on `/resume`.
- **PDF**: Put your resume PDF at `public/resume.pdf`. The page has "View as PDF" and "Download PDF". If `resume.pdf` is missing, those links 404 until you add it.

## Tech

- Next.js (App Router), MDX, Tailwind CSS, Lucide React
- Syntax highlighting: prism-react-renderer and react-syntax-highlighter (pluggable via env)
- Static export (`output: "export"`) for deployment to static hosts
