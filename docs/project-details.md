# Creating Custom Project Detail Pages

This guide explains how to add a new project detail page using the shared
`ProjectOverview` / `ProjectSection` building blocks. Most metadata
(title, tags, period, GitHub link, live link, collaborators) is auto-loaded
from `public/data/projects.json` — your component only owns the body content.

## 1. Add the project to `public/data/projects.json`

```json
{
  "title": "My Project",
  "image": "/static/my-project/screenshot.png",
  "alt": "My Project screenshot",
  "description": "Short summary…",
  "tags": ["Tag1", "Tag2"],
  "github": "https://github.com/me/my-project",
  "githubLabel": "View on GitHub",
  "link": "https://my-project.example.com",
  "details": "project-details/my-project",
  "period": "2026",
  "collaborators": null,
  "images": ["/my-project/images/1.png"]
}
```

The `details` slug (without the `project-details/` prefix) drives:

- The dynamic route at `/project-details/<slug>`
- Auto-population of `<ProjectOverview slug="<slug>" />`
- Prev/next navigation

### Field reference

| Field | Required | Description |
| ----- | -------- | ----------- |
| `title` | Yes | Project name displayed in listings and the detail header. |
| `image` | Yes | Thumbnail image path for the project card and OG preview. |
| `alt` | Yes | Accessible description of the thumbnail image. |
| `description` | Yes | Short summary shown on the project card and meta description. |
| `tags` | Yes | Array of technologies or keywords (rendered as pills on the detail page). |
| `details` | Yes | Route slug `project-details/<slug>`. |
| `collaborators` | Optional | Names of collaborators; use `null` if none. |
| `github` | Optional | Link to repository or external resource. |
| `githubLabel` | Optional | Label for the github button. Defaults to "View on GitHub". |
| `link` | Optional | Live demo URL — rendered as a separate "Live demo" button. |
| `period` | Optional | Development timeline (rendered with a calendar icon next to the title). |
| `images` | Optional | Array of screenshot paths for the gallery. |

## 2. Add project assets

Place screenshots under `public/<slug>/images/` and list them in
`public/<slug>/images/images.json` so `getGalleryImages` can resolve them.
You can also use static placeholders under `public/static/`.

## 3. Create the project component

Copy `components/project-details/ProjectTemplate.tsx` and customize:

```tsx
import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectHighlights from "./ProjectHighlights";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "my-project";

export default async function MyProject() {
  const images = await getGalleryImages(SLUG, "My Project screenshot");
  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="One-sentence pitch."
      />

      <ProjectHighlights items={[{ label: "Users", value: "1k+" }]} />

      <ProjectSection title="Introduction">
        <p>...</p>
      </ProjectSection>
    </div>
  );
}
```

The `slug` prop wires up tags, period, collaborators, GitHub, and live-demo
buttons automatically. You can override anything by passing the matching prop
explicitly.

## 4. Register the slug

In `app/project-details/[slug]/page.tsx`, add an entry to `projectDetailConfig`:

```ts
"my-project": {
  loader: () => import("@/components/project-details/MyProject"),
  title: "My Project",
  description: "Short summary used for SEO metadata.",
  sections: ["Introduction", "Architecture", "Deployment"],
},
```

The `sections` array drives the sticky table of contents on the right side
of the page (visible at `lg` and up). Section titles are auto-slugified to
ids by `slugifySection` so anchor links work without manual id wiring.

## 5. Components available

| Component | Purpose |
| --- | --- |
| `ProjectOverview` | Hero header — image gallery, title, tags, period, action buttons. |
| `ProjectSection` | Anchored content card with `h2` heading and hash link. |
| `ProjectGallery` | Carousel + lightbox; auto-used by `ProjectOverview` when images.length > 0. |
| `ProjectHighlights` | Optional 4-up stat tiles for headline metrics. |
| `ProjectTOC` | Sticky table of contents (driven by the `sections` array on the route). |
| `ProjectNav` | Auto-rendered prev/next links at the bottom of every detail page. |
