import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLifeStats } from "../features/memento-mori/hooks/useLifeStats";
import {
  BirthDateForm,
  StatsHeader,
  Highlights,
  SocialContext,
  NaturalWorld,
  CosmicPerspective,
  UniversalScale,
  WeekGrid,
  Glossary,
  Navbar,
  Footer,
} from "../features/memento-mori/components";

gsap.registerPlugin(ScrollTrigger);

const MementoMori = () => {
  const [birthDate, setBirthDate] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      setIsCalculated(true);
    }
  };

  useGSAP(
    () => {
      if (isCalculated) {
        // Fade-in general del contenedor
        gsap.from(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        // Animaciones SplitText SOLO para elementos visibles en viewport
        const splitElements = gsap.utils.toArray(".split-animate");

        splitElements.forEach((el) => {
          const chars = (el as HTMLElement).querySelectorAll(".split-char");

          gsap.fromTo(
            chars,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.01, // Reducido de 0.02 a 0.01
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: "top 80%",
                once: true, // Solo animar una vez
              },
            }
          );
        });

        // Animación simplificada del week grid - sin stagger para mejorar performance
        const weekContainer = containerRef.current?.querySelector(".week-grid-container");
        if (weekContainer) {
          gsap.fromTo(
            weekContainer,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: weekContainer,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }
    },
    { dependencies: [isCalculated], scope: containerRef }
  );

  const stats = useLifeStats(birthDate);

  const reset = () => {
    setIsCalculated(false);
    setBirthDate("");
  };

  if (!isCalculated || !stats) {
    return (
      <BirthDateForm
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        onCalculate={handleCalculate}
      />
    );
  }

  return (
    <div ref={containerRef} className="bg-[#FDFCFB] text-[#1D1D1F] pb-32">
      <Navbar onReset={reset} />

      <main className="max-w-6xl mx-auto px-6 pt-16 space-y-32">
        <StatsHeader stats={stats} />
        <Highlights stats={stats} />

        {/* Contexto Social y Mundo Natural */}
        <section className="grid md:grid-cols-2 gap-16 animate-in">
          <SocialContext stats={stats} />
          <NaturalWorld stats={stats} />
        </section>

        <CosmicPerspective stats={stats} />
        <UniversalScale stats={stats} />
        <WeekGrid stats={stats} />
        <Glossary />
        <Footer />
      </main>
    </div>
  );
};

export default MementoMori;
