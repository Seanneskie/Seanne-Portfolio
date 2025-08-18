"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useData } from "@/lib/use-data";

interface Achievement {
  icon: string;
  title: string;
  description: string;
}

// Framer Motion v11 expects an Easing (function or [x1,y1,x2,y2])
const EASE_OUT: NonNullable<Transition["ease"]> = [0.16, 1, 0.3, 1];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

export default function Awards() {
  const { data, loading, error } = useData<Achievement[]>("achievements.json");

  if (loading) return <p className="text-black dark:text-white">Loading awards...</p>;
  if (error || !data) return <p className="text-red-600 dark:text-red-400">Failed to load awards.</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
        Awards
      </h1>

      <div className="relative">
        {/* Gradient timeline spine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-0 h-full w-px
                     bg-gradient-to-b from-teal-500 via-teal-500/40 to-transparent
                     dark:from-teal-400 dark:via-teal-400/40"
        />

        <ol role="list" className="space-y-8">
          {data.map((achievement, idx) => (
            <motion.li
              key={`${achievement.title}-${idx}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative pl-12"
            >
              {/* Pin with glow + subtle pulse */}
              <span
                className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full 
                           bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-lg
                           ring-8 ring-white dark:ring-gray-900"
                aria-hidden="true"
              >
                <span className="absolute h-8 w-8 rounded-full bg-teal-500/30 blur-[6px]" />
                <span className="absolute h-8 w-8 rounded-full animate-ping bg-teal-400/40" />
                <i className={`${achievement.icon} relative z-[1] text-sm text-white`} />
              </span>

              {/* Card body */}
              <Card
                className="group border border-teal-500/10 bg-white/60 backdrop-blur
                           transition-all duration-300 hover:-translate-y-0.5
                           hover:border-teal-500/30 hover:shadow-lg
                           dark:bg-gray-900/60"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200">
                      {achievement.title}
                    </h3>
                    <span
                      className="mt-1 h-1 w-14 shrink-0 rounded-full
                                 bg-gradient-to-r from-teal-500 to-cyan-400
                                 opacity-70 transition-opacity duration-300
                                 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-2 text-base text-gray-700 dark:text-gray-200">
                    {achievement.description}
                  </p>

                  <div
                    className="mt-4 h-px w-0 bg-gradient-to-r from-teal-500/50 to-cyan-400/50
                               transition-all duration-300 group-hover:w-full"
                    aria-hidden="true"
                  />
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
