"use client";

import { type ReactElement } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { withBasePath } from "@/lib/utils";

export interface HighlightItem {
  src: string;
  label: string;
}

interface HighlightsProps {
  data: HighlightItem[];
}

export default function Highlights({ data }: HighlightsProps): ReactElement {
  if (data.length === 0) {
    return (
      <section id="highlights" className="space-y-4">
        <h2 className="text-2xl font-bold">Highlights</h2>
        <p className="text-muted-foreground">No photos available.</p>
      </section>
    );
  }

  return (
    <section id="highlights" className="min-w-0 space-y-4">
      <h2 className="text-2xl font-bold">Highlights</h2>
      <Carousel className="w-full min-w-0">
        <CarouselContent>
          {data.map((highlight) => (
            <CarouselItem key={highlight.src} className="basis-full">
              <div className="space-y-2">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={withBasePath(highlight.src)}
                    alt={highlight.label}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                  />
                </AspectRatio>
                {highlight.label && (
                  <p className="text-center text-sm text-teal-700 dark:text-teal-300">
                    {highlight.label}
                  </p>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
