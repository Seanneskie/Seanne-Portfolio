import { type ReactElement } from "react";

import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

const FALLBACK_IMAGE = "/static/placeholders/ai.png";

/**
 * Renders the detailed breakdown of the LLM Restaurant Finder pipeline.
 *
 * The component orchestrates screenshot loading with graceful fallbacks so the
 * page remains accessible even if project assets are temporarily unavailable.
 *
 * @returns ReactElement describing the LLM Restaurant Finder implementation.
 * @example
 * ```tsx
 * <LlmRestaurantFinder />
 * ```
 */
export default async function LlmRestaurantFinder(): Promise<ReactElement> {
  const alt = "LLM Restaurant Finder screenshot";
  let rawImages: string[] = [];

  try {
    rawImages = await getProjectImages("llm-restaurant-finder");
  } catch (error) {
    console.error("Unable to load LLM Restaurant Finder screenshots:", error);
  }

  const images = (rawImages.length ? rawImages : [FALLBACK_IMAGE]).map((src) => ({
    src,
    alt,
  }));

  return (
    <div className="space-y-12">
      <ProjectOverview
        title="LLM Restaurant Finder"
        images={images}
      >
        <p>
          <strong>Overview:</strong> LLM Restaurant Finder turns conversational
          prompts into structured restaurant hunts by funneling each request
          through a TypeScript Hono API. Google Gemini generates a JSON command
          that captures cuisine, price, and location intents, while Zod guards
          the shape before any network call occurs.
        </p>
        <p>
          <strong>Flow:</strong> Once validated, the command is mapped to
          Foursquare Places API parameters, searched, optionally enriched with
          detail lookups, and normalized for the client experience.
        </p>
        <p>
          <strong>Collaborators:</strong> Solo build.
        </p>
        <p>
          <strong>Tech Stack:</strong> Hono, Google Gemini, Foursquare Places
          API, Zod, TypeScript.
        </p>
      </ProjectOverview>

      <ProjectSection title="Natural-Language Intake">
        <p>
          A lightweight Hono route receives user prompts and metadata via a
          JSON payload. The handler trims whitespace, assigns default geolocation
          hints when a user omits them, and tags each request with a correlation
          ID that threads through the rest of the pipeline for observability.
        </p>
      </ProjectSection>

      <ProjectSection title="Gemini Schema Validation">
        <p>
          The sanitized prompt is embedded into a Gemini-provided system prompt
          that instructs the model to answer strictly with JSON matching a Zod
          schema. Gemini responses are parsed back into TypeScript, validated
          again on the server, and any deviations trigger a user-facing
          remediation message instead of continuing with unreliable data.
        </p>
      </ProjectSection>

      <ProjectSection title="Parameter Mapping to Foursquare">
        <p>
          Valid JSON commands hydrate a mapper that translates abstract cuisine,
          mood, and budget directives into concrete Foursquare filter sets.
          Localized price tiers, radius units, and category IDs are all resolved
          here so the Places API receives deterministic parameters.
        </p>
      </ProjectSection>

      <ProjectSection title="Search and Optional Enrichment">
        <p>
          The primary request hits the Foursquare Places search endpoint to
          gather a candidate list. When Gemini flags the need for ambience or
          operating-hours insights, the service fans out detail calls per place,
          caching responses to stay within rate limits.
        </p>
      </ProjectSection>

      <ProjectSection title="Normalization">
        <p>
          Aggregated data is flattened into a uniform card model with consistent
          distance, rating, and address fields. Zod schemas enforce that partial
          responses still surface predictable keys, enabling a resilient React
          presentation layer.
        </p>
      </ProjectSection>

      <ProjectSection title="Access-Code Gate">
        <p>
          Before any Gemini tokens are spent, middleware checks for a rotating
          access code stored in environment variables. Requests missing or using
          outdated codes receive a 401 response, shielding both the LLM and
          Foursquare quotas from untrusted traffic.
        </p>
      </ProjectSection>

      <ProjectSection title="Deployment">
        <p>
          The API is deployed on Render using the Node.js 20 runtime. Build
          hooks install dependencies, run linting, and then start the Hono
          server as a long-lived process with environment variables providing
          Gemini and Foursquare credentials.
        </p>
      </ProjectSection>

      <ProjectSection title="Known Limitations">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Gemini occasionally over-specifies filters, leading to sparse
            results in smaller cities; fallback prompts ask users to broaden the
            query.
          </li>
          <li>
            Foursquare Places API quotas cap burst throughput, so enrichment is
            throttled when rate limits approach their ceiling.
          </li>
          <li>
            Access-code distribution remains manual, which can slow onboarding
            for collaborators.
          </li>
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}
