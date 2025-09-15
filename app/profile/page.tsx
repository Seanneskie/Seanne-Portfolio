import Profile, { CardCounters, MyStory, TechComparison } from "@/components/profile";
import OtherSkills from "@/components/profile/OtherSkills";

export default function ProfilePage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-12 space-y-16">
      <Profile />
      {/* <CardCounters /> */}
      <MyStory />
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
          Other Skills
        </h2>
        <OtherSkills />
      </section>
      <TechComparison />
    </main>
  );
}
