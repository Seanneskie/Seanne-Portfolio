"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-teal-600/15 to-transparent dark:from-teal-400/15 dark:to-transparent"
      />
      <CardHeader className="relative z-10 p-0">
        <div className="flex items-center justify-between px-6 py-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
            Profile
          </CardTitle>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="h-px w-full bg-gradient-to-r from-neutral-200 to-transparent dark:from-neutral-800 dark:to-transparent" />
      </CardHeader>

      <CardContent className="relative z-10 p-6">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[25%_75%]">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
          </div>
          {/* Middle */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <Skeleton className="h-10 w-2/3" />
                  <Skeleton className="h-6 w-12 rounded-md" />
                </div>
              ))}
            </div>
            {/* Links row skeleton */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-9 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

