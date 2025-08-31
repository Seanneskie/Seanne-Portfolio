"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useData } from "@/lib/use-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface WorkExperience {
  company: string;
  project: string;
  period: string;
  images: { src: string; alt: string }[];
}

export default function WorkExperienceCarousel() {
  const { data, loading, error } = useData<WorkExperience[]>("work-experiences.json");

  if (loading) {
    return <p>Loading work experiences...</p>;
  }

  if (error || !data) {
    return <p className="text-red-600 dark:text-red-400">Failed to load work experiences.</p>;
  }

  return (
    <section className="space-y-6" aria-labelledby="work-carousel-title">
      <h2
        id="work-carousel-title"
        className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400"
      >
        Work Experiences
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((exp) => (
          <Card
            key={`${exp.company}-${exp.project}-${exp.period}`}
            className="overflow-hidden border-teal-600/10 bg-white/70 shadow-sm backdrop-blur-sm dark:border-teal-400/10 dark:bg-teal-900/20"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-teal-800 dark:text-teal-200">
                {exp.company}
              </CardTitle>
              <p className="text-sm text-gray-700 dark:text-gray-300">{exp.project}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{exp.period}</p>
            </CardHeader>
            <CardContent>
              {exp.images.length > 0 && (
                <Carousel className="w-full" opts={{ align: "start" }}>
                  <CarouselContent>
                    {exp.images.map((img) => (
                      <CarouselItem key={img.src}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-md">
                          <Image
                            src={withBasePath(img.src)}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 shadow-sm" />
                  <CarouselNext className="right-2 top-1/2 -translate-y-1/2 shadow-sm" />
                </Carousel>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

