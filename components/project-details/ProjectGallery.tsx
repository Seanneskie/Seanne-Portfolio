"use client";

import * as React from "react";
import { type ReactElement } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn, withBasePath } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectGalleryProps {
  images: Array<{ src: string; alt: string }>;
  showThumbnails?: boolean;
  className?: string;
  enableLightbox?: boolean;
}

export default function ProjectGallery({
  images,
  showThumbnails = true,
  className,
  enableLightbox = true,
}: ProjectGalleryProps): ReactElement {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const openLightbox = (i: number) => {
    if (!enableLightbox) return;
    setIndex(i);
    setLightboxOpen(true);
  };

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setIndex(api.selectedScrollSnap());
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!api) return;
    if (e.key === "ArrowRight") api.scrollNext();
    if (e.key === "ArrowLeft") api.scrollPrev();
  };

  return (
    <>
      <div
        className={cn(
          "group relative rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur",
          "shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.04]",
          className
        )}
        tabIndex={0}
        onKeyDown={handleKey}
        aria-roledescription="carousel"
        aria-label="Project image gallery"
      >
        {/* Edge fade */}
        <span className="pointer-events-none absolute inset-y-5 left-4 w-10 rounded-l-2xl bg-gradient-to-r from-background to-transparent opacity-70" />
        <span className="pointer-events-none absolute inset-y-5 right-4 w-10 rounded-r-2xl bg-gradient-to-l from-background to-transparent opacity-70" />

        {/* Slide counter */}
        <div className="absolute right-5 top-5 z-20 rounded-full bg-foreground/80 px-2 py-0.5 text-xs font-medium text-background">
          {index + 1}/{count || images.length}
        </div>

        <Carousel className="w-full" opts={{ loop: true, align: "start", duration: 16 }} setApi={setApi}>
          <CarouselContent className="ml-0">
            {images.map((img, i) => (
              <CarouselItem key={img.src} className="basis-full">
                <motion.figure
                  className="relative overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <AspectRatio ratio={4 / 3} className="bg-muted/40">
                    <Image
                      src={withBasePath(img.src)}
                      alt={`${img.alt} (${i + 1}/${images.length})`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      draggable={false}
                      onClick={() => openLightbox(i)}
                    />
                  </AspectRatio>
                </motion.figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        </Carousel>

        {/* Dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-foreground/80" : "w-2 bg-foreground/30 hover:bg-foreground/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={`thumb-${img.src}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 transition",
                  i === index ? "outline-none ring-2 ring-teal-500" : "hover:ring-2 hover:ring-foreground/40"
                )}
                aria-label={`View thumbnail ${i + 1}`}
              >
                <Image src={withBasePath(img.src)} alt={img.alt} fill className="object-cover" sizes="96px" draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        images={images}
        startIndex={index}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(i) => {
          setIndex(i);
          api?.scrollTo(i);
        }}
      />
    </>
  );
}

/* =======================
   Lightbox (modal) with zoom & pan
   ======================= */

function Lightbox({
  images,
  startIndex = 0,
  open,
  onClose,
  onIndexChange,
}: {
  images: Array<{ src: string; alt: string }>;
  startIndex?: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = React.useState(startIndex);
  const [scale, setScale] = React.useState(1);
  const [tx, setTx] = React.useState(0);
  const [ty, setTy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const dragRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (open) {
      setIndex(startIndex);
      resetTransform();
    }
  }, [open, startIndex]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const maxScale = 4;
  const minScale = 1;

  const resetTransform = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  const zoomBy = (delta: number) => {
    setScale((s) => clamp(s + delta, minScale, maxScale));
    if (scale + delta <= 1.01) {
      setTx(0);
      setTy(0);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -0.2 : 0.2;
    zoomBy(direction);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragRef.current = { x: e.clientX - tx, y: e.clientY - ty };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragRef.current) return;
    setTx(e.clientX - dragRef.current.x);
    setTy(e.clientY - dragRef.current.y);
  };

  const onMouseUp = () => {
    setDragging(false);
    dragRef.current = null;
  };

  const onDoubleClick = () => {
    setScale((s) => {
      const next = s > 1 ? 1 : 2.5;
      if (next === 1) {
        setTx(0);
        setTy(0);
      }
      return next;
    });
  };

  const next = () => {
    const i = (index + 1) % images.length;
    setIndex(i);
    onIndexChange?.(i);
    resetTransform();
  };

  const prev = () => {
    const i = (index - 1 + images.length) % images.length;
    setIndex(i);
    onIndexChange?.(i);
    resetTransform();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85" onClick={onClose} />

          {/* Toolbar */}
          <div className="pointer-events-auto absolute right-4 top-4 z-[65] flex items-center gap-2">
            <ToolbarButton onClick={() => zoomBy(-0.25)} title="Zoom out">
              <ZoomOut className="h-5 w-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => zoomBy(+0.25)} title="Zoom in">
              <ZoomIn className="h-5 w-5" />
            </ToolbarButton>
            <ToolbarButton onClick={resetTransform} title="Reset">
              <RotateCcw className="h-5 w-5" />
            </ToolbarButton>
            <ToolbarButton onClick={onClose} title="Close (Esc)">
              <X className="h-5 w-5" />
            </ToolbarButton>
          </div>

          {/* Counter */}
          <div className="pointer-events-none absolute left-1/2 top-4 z-[65] -translate-x-1/2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-900">
            {index + 1}/{images.length}
          </div>

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="pointer-events-auto absolute left-4 top-1/2 z-[65] -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto absolute right-4 top-1/2 z-[65] -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Stage */}
          <div
            className={cn(
              "pointer-events-auto relative z-[64] mx-6 flex h-[82vh] w-[min(96vw,1280px)] select-none items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10",
              dragging && "cursor-grabbing"
            )}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onDoubleClick={onDoubleClick}
            style={{ touchAction: "none" }}
          >
            <Image
              key={images[index].src}
              src={withBasePath(images[index].src)}
              alt={`${images[index].alt} (zoomed ${index + 1}/${images.length})`}
              fill
              sizes="100vw"
              className="pointer-events-none object-contain"
              draggable={false}
            />
            {/* Transform layer */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                transformOrigin: "center center",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="rounded-lg bg-white/85 p-2 text-gray-900 shadow-sm transition hover:bg-white"
    >
      {children}
    </button>
  );
}
    