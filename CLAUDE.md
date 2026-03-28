@AGENTS.md
# O'Pizza — Claude Code Rules

## Workflow
- Code directly on main branch, no worktrees, no feature branches
- Apply changes directly to local files, no pull requests
- Run dev server with `npm run dev` to test changes

## Focus
- Frontend only — no backend, no API routes, no database
- Every change must be visible in the browser immediately

## Tech stack
- Next.js 15, TypeScript, Tailwind CSS
- GSAP + ScrollTrigger for animations
- No other libraries unless explicitly asked

## Design system
- Background: #000000 black
- Text: #FFFFFF white
- Accent: #F5C518 golden yellow (details, borders, highlights)
- Headings font: Bebas Neue (Google Fonts)
- Body font: Inter (Google Fonts)
- Vibe: dark luxury street food, premium but accessible

## Code rules
- Mobile-first, fully responsive
- Clean components, one file per component in /components
- No inline styles — Tailwind classes only
- No console.log left in code
- TypeScript strict, no any

## Naming
- Components: PascalCase
- Files: kebab-case
- Variables: camelCase

## Images
- Pizza images go in /public/images/
- Use next/image for all images
- WebP format preferred