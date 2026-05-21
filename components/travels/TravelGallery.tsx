"use client";

import * as React from "react";
import { withBasePath } from "@/lib/utils";

/* =============================================================================
   TravelGallery
   -----------------------------------------------------------------------------
   Unified photo + video gallery for a single travel entry. Photos and videos
   share one grid; clicking any tile opens a lightbox that renders the right
   media for the item:
     - image  -> <img>
     - video (local .mp4/.webm) -> <video controls autoplay>
     - video (YouTube/Vimeo URL) -> provider <iframe>

   Videos in the grid show a poster (or provider thumbnail) with a play badge.
   ========================================================================== */

interface PhotoItem {
  kind: "image";
  src: string;
  alt: string;
}

interface VideoItem {
  kind: "video";
  /** local file path OR a YouTube/Vimeo URL */
  src: string;
  poster?: string;
  alt: string;
  /** "file" | "youtube" | "vimeo" — resolved at build of the item list */
  provider: "file" | "youtube" | "vimeo";
  /** provider video id, for embeds */
  embedId?: string;
}

type GalleryItem = PhotoItem | VideoItem;

interface TravelGalleryProps {
  gallery: Array<{ src: string; alt: string }>;
  videos: Array<{ src: string; poster?: string; alt: string }>;
}

// --- provider detection -----------------------------------------------------

function parseYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function parseVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function toVideoItem(v: { src: string; poster?: string; alt: string }): VideoItem {
  const yt = parseYouTubeId(v.src);
  if (yt) return { kind: "video", ...v, provider: "youtube", embedId: yt };
  const vm = parseVimeoId(v.src);
  if (vm) return { kind: "video", ...v, provider: "vimeo", embedId: vm };
  return { kind: "video", ...v, provider: "file" };
}

/** Best-effort thumbnail for a video tile when no explicit poster is given. */
function videoThumb(item: VideoItem): string | null {
  if (item.poster) return withBasePath(item.poster);
  if (item.provider === "youtube" && item.embedId)
    return `https://img.youtube.com/vi/${item.embedId}/hqdefault.jpg`;
  // Vimeo thumbnails need an API call; fall back to a gradient placeholder.
  return null;
}

// --- component ---------------------------------------------------------------

export default function TravelGallery({ gallery, videos }: TravelGalleryProps): React.ReactElement {
  const items: GalleryItem[] = React.useMemo(
    () => [
      ...videos.map(toVideoItem),
      ...gallery.map((g): PhotoItem => ({ kind: "image", ...g })),
    ],
    [gallery, videos],
  );

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const next = React.useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );
  const prev = React.useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, next, prev]);

  if (items.length === 0) return <></>;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={`${item.kind}-${item.src}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block aspect-square w-full overflow-hidden rounded-md ring-1 ring-black/5 dark:ring-white/10"
            aria-label={item.kind === "video" ? `Play video: ${item.alt}` : `View photo: ${item.alt}`}
          >
            {item.kind === "image" ? (
              <img
                src={withBasePath(item.src)}
                alt={item.alt}
                className="h-full w-full object-cover transition group-hover:opacity-90"
                loading="lazy"
              />
            ) : (
              <VideoThumb item={item} />
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          item={items[openIndex]}
          index={openIndex}
          total={items.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}

// --- video tile --------------------------------------------------------------

function VideoThumb({ item }: { item: VideoItem }): React.ReactElement {
  const thumb = videoThumb(item);
  return (
    <>
      {thumb ? (
        <img
          src={thumb}
          alt={item.alt}
          className="h-full w-full object-cover transition group-hover:opacity-90"
          loading="lazy"
        />
      ) : item.provider === "file" ? (
        // No poster: let the browser paint the first frame.
        <video
          src={withBasePath(item.src)}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-500/20 to-cyan-500/20" />
      )}
      {/* Play badge */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 ring-2 ring-white/80 transition group-hover:bg-black/70">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-white" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </>
  );
}

// --- lightbox ----------------------------------------------------------------

function Lightbox({
  item,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}): React.ReactElement {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-[65] rounded-lg bg-white/85 p-2 text-gray-900 shadow-sm transition hover:bg-white"
        aria-label="Close (Esc)"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="pointer-events-none absolute left-1/2 top-4 z-[65] -translate-x-1/2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-900">
        {index + 1}/{total}
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 z-[65] -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-white" fill="none" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 z-[65] -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-white" fill="none" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Stage */}
      <div className="pointer-events-auto relative z-[64] mx-6 flex h-[82vh] w-[min(96vw,1280px)] items-center justify-center">
        <MediaStage item={item} />
      </div>
    </div>
  );
}

function MediaStage({ item }: { item: GalleryItem }): React.ReactElement {
  if (item.kind === "image") {
    return (
      <img
        src={withBasePath(item.src)}
        alt={item.alt}
        className="max-h-full max-w-full rounded-xl object-contain"
      />
    );
  }

  if (item.provider === "file") {
    return (
      <video
        src={withBasePath(item.src)}
        poster={item.poster ? withBasePath(item.poster) : undefined}
        className="max-h-full max-w-full rounded-xl"
        controls
        autoPlay
        playsInline
      />
    );
  }

  const embedSrc =
    item.provider === "youtube"
      ? `https://www.youtube.com/embed/${item.embedId}?autoplay=1`
      : `https://player.vimeo.com/video/${item.embedId}?autoplay=1`;

  return (
    <div className="aspect-video w-full max-w-full">
      <iframe
        src={embedSrc}
        title={item.alt}
        className="h-full w-full rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
