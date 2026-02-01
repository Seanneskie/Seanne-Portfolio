"use client";

import type { JSX } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/utils";

export default function BannerActions(): JSX.Element {
  return (
    <>
      <Button asChild size="lg" className="rounded-full">
        <Link href="/projects">
          View Projects
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild size="lg" className="rounded-full">
        <a
          href={withBasePath("/static/pdfs/canete_resume.pdf")}
          target="_blank"
          rel="noreferrer"
          onClick={() => toast.info("Opening resume")}
        >
          View Resume
        </a>
      </Button>
      <Button asChild size="lg" className="rounded-full">
        <Link href="/contact">Contact Me</Link>
      </Button>
    </>
  );
}
