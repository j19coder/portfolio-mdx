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

Optional: `NEXT_PUBLIC_SYNTAX_HIGHLIGHTER=prism` or `rsh` for the `<Terminal>` component (default is `rsh`).

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

## Resume page

- **On-page content**: Edit `app/resume/page.mdx`; it renders as MDX on `/resume`.
- **PDF**: Put your resume PDF at `public/resume.pdf`. The page has "View as PDF" and "Download PDF". If `resume.pdf` is missing, those links 404 until you add it.

## Tech

- Next.js (App Router), MDX, Tailwind CSS, Lucide React
- Syntax highlighting: prism-react-renderer and react-syntax-highlighter (pluggable via env)
- Static export (`output: "export"`) for deployment to static hosts
