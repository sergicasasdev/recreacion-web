import AboutGame from "@/components/sections/AboutGame";
import CityZones from "@/components/sections/CityZones";
import Community from "@/components/sections/Community";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Updates from "@/components/sections/Updates";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutGame />
      <CityZones />
      <Gallery />
      <Updates />
      <Community />
    </>
  );
}
