import { MyStory } from "@/components/profile";
import { getSkills, getServices } from "@/lib/get-data";

export default function MyStoryPage() {
  const skills = getSkills();
  const services = getServices();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <MyStory skills={skills} services={services} />
    </main>
  );
}
