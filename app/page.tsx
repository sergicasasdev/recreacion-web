import AboutGame from "@/components/sections/AboutGame";
import CityZones from "@/components/sections/CityZones";
import Community from "@/components/sections/Community";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Updates from "@/components/sections/Updates";
import Waitlist from "@/components/sections/Waitlist";

export default function Home() {
  return (
    <>
      <Hero />
      <Waitlist />
      <AboutGame />
      <CityZones />
      <Gallery />
      <Updates />
      <Community />
    </>
  );
}
