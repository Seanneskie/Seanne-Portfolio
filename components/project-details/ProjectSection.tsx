import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
}

export default function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-600/10 via-teal-500/5 to-transparent dark:from-teal-400/10 dark:via-teal-400/5 dark:to-transparent"
      />
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-2">{children}</CardContent>
    </Card>
  );
}

