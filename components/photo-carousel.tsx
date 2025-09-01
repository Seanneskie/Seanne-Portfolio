"use client";

import * as React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { withBasePath } from "@/lib/utils";

interface PhotoItem {
  src: string;
  label: string;
}

export default function PhotoCarousel() {
  const [photos, setPhotos] = React.useState<PhotoItem[]>([]);

  React.useEffect(() => {
    fetch(withBasePath("/data/photo-carousel.json"))
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]));
  }, []);

  if (photos.length === 0) {
    return (
      <section id="photos" className="space-y-4">
        <h2 className="text-2xl font-bold">Photo Carousel</h2>
        <p className="text-muted-foreground">No photos available.</p>
      </section>
    );
  }

  return (
    <section id="photos" className="space-y-4">
      <h2 className="text-2xl font-bold">Photo Carousel</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo.src} className="basis-full">
              <div className="space-y-2">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={withBasePath(photo.src)}
                    alt={photo.label}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                {photo.label && (
                  <p className="text-center text-sm text-teal-700 dark:text-teal-300">
                    {photo.label}
                  </p>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
