import React, { useState, useMemo, useRef } from "react";
import {
  CaretRight,
  ArrowsClockwise,
  Heart,
  Sparkle,
  Brain,
  Globe,
  Star,
  Tree,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Componente helper para simular SplitText (sin licencia Club GSAP)
const SplitText = ({ children, className = "", charClass = "split-char" }: { children: string; className?: string; charClass?: string }) => {
  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((char, j) => (
            <span key={j} className={`inline-block ${charClass}`}>
              {char}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

interface Stats {
  livedWeeks: number;
  livedDays: number;
  percentage: string;
  remainingWeeks: number;
  hoursSlept: number;
  summersLeft: number;
  heartBeats: number;
  breaths: number;
  seasons: number;
  spaceTravelKM: number;
  galaxyTravelKM: number;
  lunarCycles: number;
  knownPeople: number;
  birthsSinceBirth: number;
  deathsSinceBirth: number;
  universeAgePercentage: string;
  redwoodPercentage: string;
  parentTimePercentage: string;
  parentYearsLeft: number;
  populationAtBirth: number;
  currentPopulation: number;
}

const MementoMori = () => {
  const [birthDate, setBirthDate] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para calcular población mundial aproximada según el año
  const getWorldPopulation = (year: number): number => {
    // Datos aproximados de población mundial en miles de millones
    const populationData: { [key: number]: number } = {
      1950: 2.5, 1955: 2.8, 1960: 3.0, 1965: 3.3, 1970: 3.7,
      1975: 4.1, 1980: 4.4, 1985: 4.9, 1990: 5.3, 1995: 5.7,
      2000: 6.1, 2005: 6.5, 2010: 6.9, 2015: 7.3, 2020: 7.8,
      2023: 8.0, 2024: 8.1, 2025: 8.2, 2026: 8.2
    };

    // Si el año está en los datos, retornarlo
    if (populationData[year]) return populationData[year];

    // Interpolación lineal para años intermedios
    const years = Object.keys(populationData).map(Number).sort((a, b) => a - b);
    const lowerYear = years.reverse().find(y => y <= year) || years[0];
    const upperYear = years.find(y => y > year) || years[years.length - 1];

    if (lowerYear === upperYear) return populationData[lowerYear];

    const ratio = (year - lowerYear) / (upperYear - lowerYear);
    return populationData[lowerYear] + ratio * (populationData[upperYear] - populationData[lowerYear]);
  };

  const EXPECTANCY_YEARS = 90;
  const WEEKS_IN_YEAR = 52;
  const TOTAL_WEEKS = EXPECTANCY_YEARS * WEEKS_IN_YEAR;

  const MILESTONES = [
    {
      label: "niñez",
      start: 0,
      end: 600,
      color: "bg-blue-50",
      borderColor: "border-blue-300",
      text: "las primeras 600 semanas. tiempo de juego donde otros resuelven tus problemas.",
    },
    {
      label: "adolescencia",
      start: 600,
      end: 1000,
      color: "bg-indigo-50",
      borderColor: "border-indigo-300",
      text: "400 semanas para encontrarte a ti mismo antes de la carga de la responsabilidad.",
    },
    {
      label: "vida laboral",
      start: 1000,
      end: 3400,
      color: "bg-amber-50",
      borderColor: "border-amber-300",
      text: "2,000 semanas dedicadas al trabajo adulto serio. el bloque principal de tu existencia.",
    },
    {
      label: "jubilación",
      start: 3400,
      end: TOTAL_WEEKS,
      color: "bg-emerald-50",
      borderColor: "border-emerald-300",
      text: "libertad tardía. aproximadamente las mismas semanas de ocio que tuviste de niño.",
    },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      setIsCalculated(true);
      window.scrollTo(0, 0);
    }
  };

  useGSAP(() => {
    if (isCalculated) {
      // Animación de entrada general
      gsap.from(".animate-in", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      
      // Efecto del grid con ScrollTrigger - solo contenedor, sin animar círculos individuales
      gsap.fromTo(".week-grid-container",
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".week-grid-container",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animaciones SplitText para títulos al hacer scroll
      const splitElements = gsap.utils.toArray<HTMLElement>(".split-animate");
      splitElements.forEach((el) => {
        // Animamos las palabras (.split-word) en lugar de caracteres para el efecto de caída rotando
        const targets = el.querySelectorAll(".split-word");
        
        gsap.fromTo(targets, 
          { 
            y: -100, 
            opacity: 0,
            rotation: () => gsap.utils.random(-80, 80) // Rotación aleatoria inicial fuerte
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, { dependencies: [isCalculated], scope: containerRef });

  const stats = useMemo<Stats | null>(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());

    const livedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const livedWeeks = Math.floor(livedDays / 7);
    const yearsLived = livedWeeks / 52;
    const percentage = ((livedWeeks / TOTAL_WEEKS) * 100).toFixed(1);

    const heartBeats = livedDays * 24 * 60 * 70;
    const breaths = livedDays * 24 * 60 * 16;
    const spaceTravelKM = livedDays * 2592000;
    const galaxyTravelKM = livedDays * 19000000;
    const lunarCycles = Math.floor(livedDays / 29.5);
    const knownPeople = Math.round((livedWeeks / TOTAL_WEEKS) * 80000);
    const birthsSinceBirth = Math.round(livedDays * 385000);
    const deathsSinceBirth = Math.round(livedDays * 165000);

    // Cálculo del tiempo restante con los padres
    const PARENT_AVG_AGE_DIFF = 28; // Diferencia promedio de edad
    const PARENT_LIFE_EXPECTANCY = 82; // Esperanza de vida promedio
    const VISITS_PER_YEAR = 2; // Semanas de visita al año
    
    const parentAge = yearsLived + PARENT_AVG_AGE_DIFF;
    const parentYearsLeft = Math.max(0, PARENT_LIFE_EXPECTANCY - parentAge);
    const totalWeeksWithParents = (yearsLived * VISITS_PER_YEAR) + (parentYearsLeft * VISITS_PER_YEAR);
    const weeksAlreadySpent = yearsLived * VISITS_PER_YEAR;
    const parentTimePercentage = totalWeeksWithParents > 0 
      ? ((weeksAlreadySpent / totalWeeksWithParents) * 100).toFixed(0)
      : "100";

    // Cálculo de población mundial
    const birthYear = birth.getFullYear();
    const currentYear = now.getFullYear();
    const populationAtBirth = getWorldPopulation(birthYear);
    const currentPopulation = getWorldPopulation(currentYear);

    return {
      livedWeeks,
      livedDays,
      percentage,
      remainingWeeks: Math.max(0, TOTAL_WEEKS - livedWeeks),
      hoursSlept: Math.floor(livedDays * 8),
      summersLeft: Math.max(0, EXPECTANCY_YEARS - Math.floor(yearsLived)),
      heartBeats,
      breaths,
      seasons: Math.floor(yearsLived * 4),
      spaceTravelKM,
      galaxyTravelKM,
      lunarCycles,
      knownPeople,
      birthsSinceBirth,
      deathsSinceBirth,
      universeAgePercentage: ((yearsLived / 13800000000) * 100).toFixed(10),
      redwoodPercentage: ((yearsLived / 3000) * 100).toFixed(2),
      parentTimePercentage,
      parentYearsLeft: Math.round(parentYearsLeft),
      populationAtBirth,
      currentPopulation,
    };
  }, [birthDate]);

  const reset = () => {
    setIsCalculated(false);
    setBirthDate("");
  };

  const getWeekStyles = (index: number) => {
    if (!stats) return "";
    
    // Semana actual parpadeando
    if (index === stats.livedWeeks) {
      return "bg-rose-500 border-rose-700 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse z-10 scale-125 ring-2 ring-rose-200";
    }

    if (index < stats.livedWeeks) {
      return "bg-neutral-300 border-neutral-800 shadow-sm";
    }
    const milestone = MILESTONES.find((m) => index >= m.start && index < m.end);
    return milestone
      ? `${milestone.color} ${milestone.borderColor}`
      : "bg-white border-neutral-200";
  };

  if (!isCalculated || !stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
        <div className="max-w-xl w-full text-center space-y-12 animate-in">
          <header className="space-y-4">
            <h1
              className="text-7xl md:text-9xl text-neutral-900 tracking-wider"
              style={{ fontFamily: "Staatliches" }}
            >
              EL VAGÓN DE COLA
            </h1>
            <p
              className="text-2xl text-neutral-500 italic px-4"
              style={{ fontFamily: "Instrument Serif" }}
            >
              el universo tira los dados cada día. hoy sigues aquí.
            </p>
          </header>

          <form
            onSubmit={handleCalculate}
            className="space-y-10 max-w-sm mx-auto"
          >
            <div className="space-y-3 text-left">
              <label
                className="text-xs uppercase tracking-[0.4em] text-neutral-400 font-bold ml-1"
                style={{ fontFamily: "Inter" }}
              >
                fecha de nacimiento
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-transparent border-b-2 border-neutral-900 py-4 text-4xl focus:outline-none transition-all appearance-none rounded-none"
                style={{ fontFamily: "Emilys Candy" }}
              />
            </div>

            <button
              type="submit"
              className="group w-full bg-neutral-900 text-white p-6 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 shadow-xl cursor-pointer"
            >
              <span
                className="text-3xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                CONTEMPLAR
              </span>
              <CaretRight size={24} weight="bold" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#FDFCFB] text-[#1D1D1F] pb-32">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50 animate-in">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span
            className="text-4xl tracking-widest"
            style={{ fontFamily: "Staatliches" }}
          >
            EL VAGÓN DE COLA.
          </span>
          <button
            onClick={reset}
            className="group flex items-center gap-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <span
              className="text-xs uppercase tracking-widest font-bold"
              style={{ fontFamily: "Inter" }}
            >
              reiniciar
            </span>
            <ArrowsClockwise size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16 space-y-32">
        {/* Resumen Principal */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left animate-in">
          <div className="space-y-1 p-6 border-l-4 border-blue-200">
            <h4
              className="split-animate text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              <SplitText>VIVIDO</SplitText>
            </h4>
            <p
              className="text-7xl text-neutral-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.livedWeeks}
            </p>
            <p
              className="text-xl italic text-neutral-500"
              style={{ fontFamily: "Instrument Serif" }}
            >
              semanas consumidas
            </p>
          </div>
          <div className="space-y-1 p-6 border-l-4 border-amber-200">
            <h4
              className="split-animate text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              <SplitText>RESTANTE</SplitText>
            </h4>
            <p
              className="text-7xl text-neutral-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.remainingWeeks}
            </p>
            <p
              className="text-xl italic text-neutral-500"
              style={{ fontFamily: "Instrument Serif" }}
            >
              semanas por vivir
            </p>
          </div>
          <div className="space-y-1 p-6 border-l-4 border-emerald-200">
            <h4
              className="split-animate text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              <SplitText>AVANCE</SplitText>
            </h4>
            <p
              className="text-7xl text-neutral-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.percentage}%
            </p>
            <p
              className="text-xl italic text-neutral-500"
              style={{ fontFamily: "Instrument Serif" }}
            >
              del total estimado
            </p>
          </div>
        </section>

        {/* Bloque de Aspectos Destacados */}
        <section className="space-y-12 animate-in">
          <h2
            className="split-animate text-5xl tracking-widest border-b border-neutral-200 pb-4"
            style={{ fontFamily: "Staatliches" }}
          >
            <SplitText>ASPECTOS DESTACADOS</SplitText>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p
                className="text-2xl italic leading-relaxed text-neutral-600"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Has vivido{" "}
                <span
                  className="text-4xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.livedWeeks}
                </span>{" "}
                semanas, que es el{" "}
                <span
                  className="text-3xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.percentage}%
                </span>{" "}
                de una vida completa.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
                  <span
                    className="text-lg italic text-neutral-500"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    Días de experiencia acumulada:
                  </span>
                  <span
                    className="text-2xl text-neutral-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {stats.livedDays.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
                  <span
                    className="text-lg italic text-neutral-500"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    Estaciones observadas:
                  </span>
                  <span
                    className="text-2xl text-neutral-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {stats.seasons}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
                  <span
                    className="text-lg italic text-neutral-500"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    Latidos de tu corazón aprox:
                  </span>
                  <span
                    className="text-2xl text-neutral-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {stats.heartBeats.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
                  <span
                    className="text-lg italic text-neutral-500"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    Respiraciones tomadas:
                  </span>
                  <span
                    className="text-2xl text-neutral-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {stats.breaths.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-lg flex flex-col justify-center space-y-6 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <Heart className="text-red-400" size={32} weight="fill" />
                <h3
                  className="text-4xl tracking-widest"
                  style={{ fontFamily: "Staatliches" }}
                >
                  EL VAGÓN DE COLA
                </h3>
              </div>
              <p
                className="text-2xl italic leading-relaxed opacity-90"
                style={{ fontFamily: "Instrument Serif" }}
              >
                {stats.parentYearsLeft > 0 ? (
                  <>
                    "Si ves a tus padres solo dos semanas al año, ya has vivido aproximadamente el{" "}
                    <span
                      className="text-3xl text-red-400 not-italic font-bold"
                      style={{ fontFamily: "Emilys Candy" }}
                    >
                      {stats.parentTimePercentage}%
                    </span>
                    {" "}del tiempo total que tendrás con ellos. Te quedan aproximadamente{" "}
                    <span
                      className="text-3xl text-amber-300 not-italic font-bold"
                      style={{ fontFamily: "Emilys Candy" }}
                    >
                      {stats.parentYearsLeft}
                    </span>
                    {" "}años con tus padres. No ignores el presente."
                  </>
                ) : (
                  "El tiempo es el recurso más valioso. Aprovecha cada momento con quienes amas."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Contexto Social y Mundo Natural */}
        <section className="grid md:grid-cols-2 gap-16 animate-in">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Globe className="text-blue-400" size={32} weight="duotone" />
              <h2
                className="split-animate text-4xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                <SplitText>CONTEXTO SOCIAL</SplitText>
              </h2>
            </div>
            <div className="space-y-6">
              <p
                className="text-xl italic text-neutral-600 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Desde tu nacimiento, la humanidad ha crecido de{" "}
                <span
                  className="text-2xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.populationAtBirth.toFixed(1)}
                </span>{" "}
                mil millones a más de{" "}
                <span
                  className="text-2xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.currentPopulation.toFixed(1)}
                </span>{" "}
                mil millones de personas.
              </p>
              <div className="p-8 rounded-lg space-y-4">
                <p
                  className="text-lg italic text-neutral-500"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  Has conocido aproximadamente a:
                </p>
                <p
                  className="text-5xl text-neutral-900"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.knownPeople.toLocaleString()}
                </p>
                <p
                  className="text-sm uppercase tracking-widest text-neutral-400 font-bold"
                  style={{ fontFamily: "Inter" }}
                >
                  individuos únicos
                </p>
              </div>
              <p
                className="text-lg italic text-neutral-500 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Han ocurrido{" "}
                <span
                  className="text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.birthsSinceBirth.toLocaleString()}
                </span>{" "}
                nacimientos y{" "}
                <span
                  className="text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.deathsSinceBirth.toLocaleString()}
                </span>{" "}
                muertes en el mundo desde que llegaste.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Tree className="text-emerald-500" size={32} weight="duotone" />
              <h2
                className="split-animate text-4xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                <SplitText>MUNDO NATURAL</SplitText>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-100 hover:scale-105 transition-transform">
                  <p
                    className="text-4xl text-emerald-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {stats.lunarCycles}
                  </p>
                  <p
                    className="text-sm italic text-emerald-700"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    ciclos lunares
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-100 hover:scale-105 transition-transform">
                  <p
                    className="text-4xl text-blue-900"
                    style={{ fontFamily: "Emilys Candy" }}
                  >
                    {Math.floor(stats.livedWeeks / 52)}
                  </p>
                  <p
                    className="text-sm italic text-blue-700"
                    style={{ fontFamily: "Instrument Serif" }}
                  >
                    vueltas al sol
                  </p>
                </div>
              </div>
              <p
                className="text-xl italic text-neutral-600 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Tu edad actual representa el{" "}
                <span
                  className="text-2xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.redwoodPercentage}%
                </span>{" "}
                de la vida potencial de una secuoya gigante.
              </p>
              <p
                className="text-lg italic text-neutral-500 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Tu cuerpo ha reemplazado casi todas sus células varias veces. No
                eres la misma materia con la que naciste.
              </p>
            </div>
          </div>
        </section>

        {/* Perspectiva Cósmica */}
        <section className="p-12 md:p-20 rounded-lg overflow-hidden relative animate-in">
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
              <Sparkle className="text-amber-400" size={32} weight="fill" />
              <h2
                className="split-animate text-5xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                <SplitText>PERSPECTIVA CÓSMICA</SplitText>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p
                  className="text-2xl italic leading-relaxed opacity-80"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  Desde tu nacimiento, la Tierra ha viajado aproximadamente:
                </p>
                <p
                  className="text-6xl text-amber-200"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.spaceTravelKM.toLocaleString()}
                </p>
                <p
                  className="text-xl uppercase tracking-widest"
                  style={{ fontFamily: "Staatliches" }}
                >
                  Kilómetros alrededor del Sol
                </p>
              </div>
              <div className="space-y-6">
                <p
                  className="text-2xl italic leading-relaxed opacity-80"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  Nuestro sistema solar se ha movido en la Vía Láctea:
                </p>
                <p
                  className="text-6xl text-indigo-300"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.galaxyTravelKM.toLocaleString()}
                </p>
                <p
                  className="text-xl uppercase tracking-widest"
                  style={{ fontFamily: "Staatliches" }}
                >
                  Kilómetros por la galaxia
                </p>
              </div>
            </div>

            <div className="pt-12 text-center space-y-4">
              <p
                className="text-2xl italic opacity-60 max-w-2xl mx-auto"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Toda tu vida es solo el{" "}
                <span
                  className="text-amber-400 not-italic font-bold"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.universeAgePercentage}%
                </span>{" "}
                de la edad del universo observable.
              </p>
            </div>
          </div>
        </section>

        {/* Nueva Sección: Escala Universal */}
        <section className="p-12 md:p-20 rounded-lg overflow-hidden relative animate-in">
          
          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h2
                className="text-6xl tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-amber-400"
                style={{ fontFamily: "Staatliches" }}
              >
                ESCALA UNIVERSAL
              </h2>
              <p
                className="text-xl italic opacity-70 max-w-3xl mx-auto"
                style={{ fontFamily: "Instrument Serif" }}
              >
                La inmensidad del cosmos pone en perspectiva nuestra existencia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-lg space-y-4">
                <div className="text-5xl text-purple-300">🌌</div>
                <h3
                  className="text-2xl tracking-wider text-purple-300"
                  style={{ fontFamily: "Staatliches" }}
                >
                  DIÁMETRO DEL UNIVERSO
                </h3>
                <p
                  className="text-5xl font-bold text-neutral-900"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  93 mil millones
                </p>
                <p
                  className="text-lg italic opacity-80"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  de años luz de diámetro observable
                </p>
              </div>

              <div className="p-8 rounded-lg space-y-4">
                <div className="text-5xl text-amber-300">⏳</div>
                <h3
                  className="text-2xl tracking-wider text-amber-300"
                  style={{ fontFamily: "Staatliches" }}
                >
                  EDAD DEL UNIVERSO
                </h3>
                <p
                  className="text-5xl font-bold text-neutral-900"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  13.8 mil millones
                </p>
                <p
                  className="text-lg italic opacity-80"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  de años desde el Big Bang
                </p>
              </div>

              <div className="p-8 rounded-lg space-y-4">
                <div className="text-5xl text-rose-300">👤</div>
                <h3
                  className="text-2xl tracking-wider text-rose-300"
                  style={{ fontFamily: "Staatliches" }}
                >
                  TU VIDA
                </h3>
                <p
                  className="text-5xl font-bold text-neutral-900 break-all leading-tight"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.universeAgePercentage}%
                </p>
                <p
                  className="text-lg italic opacity-80"
                  style={{ fontFamily: "Instrument Serif" }}
                >
                  de la edad del universo
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-lg">
              <p
                className="text-2xl md:text-3xl italic leading-relaxed text-center opacity-90"
                style={{ fontFamily: "Instrument Serif" }}
              >
                "La luz tarda <span className="text-amber-300 not-italic font-bold" style={{ fontFamily: "Emilys Candy" }}>93 mil millones de años</span> en cruzar el universo observable. 
                En esa escala infinita, tu vida es un destello imperceptible... 
                pero es <span className="text-purple-300 not-italic font-bold" style={{ fontFamily: "Emilys Candy" }}>tu</span> destello, 
                y merece ser vivido plenamente."
              </p>
            </div>
          </div>
        </section>

        {/* Grid de Vida */}
        <section className="space-y-10 pt-16 animate-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="split-animate text-6xl tracking-widest text-neutral-900"
              style={{ fontFamily: "Staatliches" }}
            >
              <SplitText>LA RED DEL TIEMPO</SplitText>
            </h2>

            <div className="flex flex-wrap gap-4 bg-white p-4 border-2 border-neutral-50 rounded-2xl shadow-sm">
              {MILESTONES.map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${m.color} border-2 ${m.borderColor}`}
                  ></div>
                  <span
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ fontFamily: "Inter" }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-300 border-2 border-neutral-800"></div>
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: "Inter" }}
                >
                  vivido
                </span>
              </div>
               <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-rose-700 animate-pulse"></div>
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: "Inter" }}
                >
                  ahora
                </span>
              </div>
            </div>
          </div>

          <div
            className="week-grid-container grid gap-0.5 sm:gap-1"
            style={{
              gridTemplateColumns: `repeat(${WEEKS_IN_YEAR}, minmax(0, 1fr))`,
            }}
          >
            {[...Array(TOTAL_WEEKS)].map((_, i) => (
              <div
                key={i}
                data-week-index={i}
                className={`week-grid-item aspect-square rounded-full transition-all duration-700 border-2 ${getWeekStyles(i)}`}
                title={`Semana ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Glosario Staatliches */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-neutral-100 pt-16 animate-in">
          {MILESTONES.map((m) => (
            <div
              key={m.label}
              className="space-y-4 p-4 hover:bg-white transition-colors rounded-xl"
            >
              <h4
                className="text-3xl tracking-widest border-b-2 border-neutral-900 inline-block mb-2"
                style={{ fontFamily: "Staatliches" }}
              >
                {m.label}
              </h4>
              <p
                className="text-xl italic text-neutral-600 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                {m.text}
              </p>
            </div>
          ))}
        </section>

        <footer className="pt-32 text-center space-y-12 animate-in">
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-20 bg-neutral-900"></div>
            <Brain size={32} weight="duotone" />
            <div className="h-1 w-20 bg-neutral-900"></div>
          </div>
          <p
            className="text-5xl italic text-neutral-400 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "Instrument Serif" }}
          >
            "la vida es un parpadeo en la escala cósmica. úsalo para lo que
            realmente importa."
          </p>
          <p
            className="text-xs uppercase tracking-[0.8em] text-neutral-300 font-bold"
            style={{ fontFamily: "Inter" }}
          >
            el vagón de cola • consciente
          </p>
        </footer>
      </main>
    </div>
  );
};

export default MementoMori;
