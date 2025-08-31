"use client";

import { useData } from "@/lib/use-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

export default function ServicesSection() {
  const { data, loading, error } = useData<Service[]>("services.json");

  if (loading)
    return <p className="text-black dark:text-white">Loading services...</p>;
  if (error || !data)
    return (
      <p className="text-red-600 dark:text-red-400">Failed to load services.</p>
    );

  return (
    <section className="space-y-4" aria-labelledby="services-title">
      <h1
        id="services-title"
        className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400"
      >
        Services
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((svc) => {
          const Icon = (Icons as Record<string, LucideIcon>)[svc.icon] ?? Icons.Code2;
          return (
            <Card
              key={svc.title}
              className="border-teal-600/10 bg-white/70 backdrop-blur-sm transition-shadow hover:shadow-md dark:border-teal-400/10 dark:bg-teal-900/20"
            >
              <CardHeader className="items-center text-center pb-2">
                <Icon className="mb-2 h-10 w-10 text-teal-600 dark:text-teal-400" />
                <CardTitle className="text-teal-800 dark:text-teal-200">
                  {svc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-gray-700 dark:text-gray-200">
                  {svc.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

