# AGENTS Instructions

These guidelines help the CODEX and other contributors work effectively within this repository.

## Development
- Use TypeScript and follow the existing project structure.
- Style components with Tailwind CSS when possible.
- Prefer functional React components and hooks.
- Keep code formatted via the repository's ESLint configuration; no separate formatting tool is required.

## Design System
- Use the [shadcn/ui](https://ui.shadcn.com) component library built on Radix primitives; reuse or extend components under `components/ui`.
- Follow the existing color scheme: base Tailwind `slate` palette with light mode `bg-white`/`text-black` and dark mode `bg-gray-900`/`text-white`. Use `teal` accents for focus and selection states.

## Project Details
Follow this process to add a new project detail page:

1. Copy `components/project-details/ProjectTemplate.tsx` to a new file in the same folder and rename the exported component.
2. Place screenshots or other assets under `public/static/<project>/`.
3. Register the project in `public/data/projects.json` with a unique `details` slug.
4. Create `app/project-details/<slug>/page.tsx` that imports and renders your component.

Refer to `docs/project-details.md` for complete instructions.

## Commit Practices
- Write clear, descriptive commit messages.
- Each commit should represent a single logical change.

## Required Checks
- Run the linter: `npm run lint`.
- Run the test suite: `npm test`.
- Ensure all checks pass before committing changes.
