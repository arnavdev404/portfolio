"use client";

import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEffects from "@/components/BackgroundEffects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import LearningJourney from "@/components/LearningJourney";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />
      <SocialSidebar />

      <div className="page-content relative z-10 flex-1 md:pl-16">
        <main>
          <Hero />
          <About />
          <Projects />
          <LearningJourney />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
