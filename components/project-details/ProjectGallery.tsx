import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
}

export default function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((src) => (
          <CarouselItem key={src} className="flex justify-center">
            <Image
              src={withBasePath(src)}
              alt={alt}
              width={400}
              height={300}
              className="rounded shadow"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
