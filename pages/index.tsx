import HeroSection from "@/components/Hero/page";
import EventsSection from "@/components/Event/page";
import Layout from "@/components/Layout/page";
import EventCategory from "@/components/EventCategory/page";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <EventCategory />
      <EventsSection />
    </Layout>
  );
}
