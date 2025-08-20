# Creating Custom Project Detail Pages

This guide explains how to add a new project detail page by cloning the provided `ProjectTemplate` and customizing the reusable sections.

## 1. Clone the template

1. Copy `components/project-details/ProjectTemplate.tsx` to a new file in the same folder. For example:
   ```bash
   cp components/project-details/ProjectTemplate.tsx components/project-details/MyProject.tsx
   ```
2. Rename the default exported function to match your project, e.g. `MyProject`.
3. Update the `<ProjectOverview>` props (`imageSrc`, `alt`) and its children to describe your project.
4. Edit or remove the `<ProjectSection>` blocks and fill them with your content.

## 2. Add project assets

Place screenshots or other static files inside `public/static`. You can organize images in sub‑folders if desired:

```
public/
└── static/
    └── my-project/
        └── screenshot.png
```

Reference these assets in your `ProjectOverview` with a root‑relative path (e.g. `/static/my-project/screenshot.png`).

## 3. Register the project

Add an entry in `public/data/projects.json` so the project appears in listings. Include a unique `details` slug pointing to your page directory:

```json
{
  "title": "My Project",
  "image": "/static/my-project/screenshot.png",
  "alt": "My Project screenshot",
  "description": "Short summary…",
  "tags": ["Tag1", "Tag2"],
  "details": "project-details/my-project"
}
```

## 4. Create the page route

Create a folder under `app/project-details/<slug>/` and add a `page.tsx` that imports your customized component:

```tsx
import MyProject from "@/components/project-details/MyProject";

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <MyProject />
    </main>
  );
}
```

The `<slug>` directory must match the `details` field in `public/data/projects.json`.

With these steps your new project detail page will be served at `/project-details/<slug>`.
