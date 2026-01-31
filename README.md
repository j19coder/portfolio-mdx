# Portfolio (MDX + Next.js)

Minimalist dark-mode portfolio with MDX, Next.js, and Tailwind. Includes reusable Header/Footer, CTF write-up pages, and a terminal-style component for commands.

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

## Resume page

- **On-page content**: Edit `app/resume/page.mdx` and paste your resume (headings, lists, paragraphs). It renders as MDX on `/resume`.
- **PDF**: Put your resume PDF at `public/resume.pdf`. The page has "View as PDF" (opens in a new tab) and "Download PDF" (downloads the file). If `resume.pdf` is missing, those links will 404 until you add it.

## Adding a new CTF write-up

1. Copy the template: use the content of `content/ctf/template.mdx` as reference.
2. Create a new page: `app/ctf/[machine-slug]/page.mdx` (e.g. `app/ctf/legacy/page.mdx`).
3. Paste the template, replace the title and metadata, and fill in `<Terminal>` blocks with your commands and output.
4. Add an entry to the list in `app/ctf/page.tsx` in the `captures` array so the new write-up appears on the CTF index.

Example entry:

```ts
{ slug: "legacy", title: "Legacy", platform: "HTB", date: "2025-01" },
```

## Tech

- Next.js (App Router), MDX, Tailwind CSS, Lucide React
- Syntax highlighting: prism-react-renderer and react-syntax-highlighter (pluggable)
