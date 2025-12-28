"use client";

import * as React from "react";
import { type ReactElement } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { openMailTo } from "@/lib/profile";
import { toast } from "sonner";
import type { ProfileData } from "./types";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";

export default function BackgroundCard({ profile }: { profile: ProfileData }): ReactElement {
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  // Dots state
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const slides = [
    "I’m a dedicated Django Web App Developer with hands-on full-stack experience. I build seamless, user-friendly systems that turn real-world problems into simple, reliable workflows.",
    "I bridge technical depth and business needs—leveraging Next.js 15, React, and Django. I’ve shipped systems like a vessel inventory platform and a government information system.",
    "Recent projects improved operational efficiency by 70%+ and streamlined data workflows by 50%+. I earned Cum Laude honors and won multiple national competitions.",
    "I’m excited to keep growing in full-stack and welcome introductions or advice. I love contributing to innovative, collaborative teams.",
  ];

  return (
    <Card id="background" className="relative overflow-hidden">
      {/* subtle backdrop wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-600/10 via-teal-500/5 to-transparent dark:from-teal-400/10 dark:via-teal-400/5 dark:to-transparent"
      />

      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
          Background
        </CardTitle>
      </CardHeader>

      <div className="absolute inset-x-0 top-[52px] h-px bg-gradient-to-r from-teal-600/20 to-transparent dark:from-teal-400/20 dark:to-transparent" />

      <CardContent className="relative z-10">
        {/* Image on the RIGHT; ensure no overlap with z-index + spacing */}
        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
          {/* LEFT: Description carousel (serif, centered, larger) */}
          <div className="relative z-10 flex flex-col gap-6">
            <Carousel
              opts={{ loop: true, align: "start" }}
              plugins={[autoplay.current]}
              setApi={setApi}
              className="w-full"
              onMouseEnter={() => autoplay.current?.stop()}
              onMouseLeave={() => autoplay.current?.play()}
              aria-roledescription="carousel"
            >
              <CarouselContent className="pb-2">
                {slides.map((text, i) => (
                  <CarouselItem key={i} className="px-1">
                    <div className="rounded-xl border border-neutral-200/60 bg-neutral-50/70 p-5 text-center backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/60 sm:p-7 md:p-8">
                      <p className="mx-auto max-w-2xl font-serif text-base leading-relaxed text-black sm:text-lg md:text-xl dark:text-white">
                        {text}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* DOTS (no page buttons) */}
            <div className="mt-4 flex justify-center gap-2 md:justify-start">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === current
                      ? "bg-teal-600 dark:bg-teal-400"
                      : "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* CTAs — spaced to avoid any overlap */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button
                size="sm"
                onClick={() => openMailTo(profile.email)}
                className={[
                  "group gap-2 text-white",
                  "bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500",
                  "bg-[length:200%_200%] animate-gradient-x",
                  "shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300",
                  "hover:-translate-y-0.5",
                  "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                ].join(" ")}
              >
                <Mail className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                Hire Me
              </Button>

              {profile.links?.resume && (
                <Button
                  size="sm"
                  asChild
                  variant="outline"
                  className={[
                    "gap-2",
                    "ring-1 ring-teal-600/30 dark:ring-teal-400/30",
                    "hover:bg-teal-600/10 dark:hover:bg-teal-400/10",
                    "bg-[length:200%_100%] hover:animate-shine",
                    "transition-[background-position,transform] hover:-translate-y-0.5",
                  ].join(" ")}
                  onClick={() => toast.info("Opening resume…")}
                >
                  <a
                    href={profile.links.resume.startsWith("/") ? withBasePath(profile.links.resume) : profile.links.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* RIGHT: Portrait image (fixed crop & position) */}
          <div className="order-first overflow-hidden rounded-xl ring-1 ring-teal-600/20 shadow-sm dark:ring-teal-400/20 sm:order-last lg:order-none">
            <div className="relative aspect-[3/4] w-full min-h-[14rem] overflow-hidden rounded-xl sm:min-h-[18rem] md:min-h-[20rem]">
              <Image
                src={withBasePath("/static/image_2.webp")}
                alt="Profile portrait"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 32vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
