import Hero from "@/components/layout/hero";
import { Footer } from "@/components/layout/footer";
import { AvailabilityCard } from "@/components/layout/availability-card";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <AvailabilityCard />
      <Footer />
    </main>
  );
}
