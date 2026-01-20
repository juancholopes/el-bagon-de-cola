import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronRight,
  RefreshCw,
  Heart,
  Sparkles,
  Brain,
  Globe,
  Stars,
  TreeDeciduous,
} from "lucide-react";

const App = () => {
  const [birthDate, setBirthDate] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);

  // Cargar Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Staatliches&family=Instrument+Serif:ital@0;1&family=Emilys+Candy&family=Inter:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

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

  const handleCalculate = (e) => {
    e.preventDefault();
    if (birthDate) {
      setIsCalculated(true);
      window.scrollTo(0, 0);
    }
  };

  const stats = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now - birth);

    const livedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const livedWeeks = Math.floor(livedDays / 7);
    const yearsLived = livedWeeks / 52;
    const percentage = ((livedWeeks / TOTAL_WEEKS) * 100).toFixed(1);

    // Cálculos dinámicos basados en la entrada del usuario
    const heartBeats = livedDays * 24 * 60 * 70; // 70 bpm promedio
    const breaths = livedDays * 24 * 60 * 16; // 16 respiraciones por minuto promedio
    const spaceTravelKM = livedDays * 2592000; // Tierra viaja ~2.5M km al día
    const galaxyTravelKM = livedDays * 19000000; // Sistema solar viaja ~19M km al día
    const lunarCycles = Math.floor(livedDays / 29.5);
    const knownPeople = Math.round((livedWeeks / TOTAL_WEEKS) * 80000);
    const birthsSinceBirth = Math.round(livedDays * 385000); // nacimientos diarios globales aprox
    const deathsSinceBirth = Math.round(livedDays * 165000); // muertes diarias globales aprox

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
    };
  }, [birthDate]);

  const reset = () => {
    setIsCalculated(false);
    setBirthDate("");
  };

  const getWeekStyles = (index) => {
    if (index < stats.livedWeeks) {
      return "bg-neutral-300 border-neutral-800 shadow-sm";
    }
    const milestone = MILESTONES.find((m) => index >= m.start && index < m.end);
    return milestone
      ? `${milestone.color} ${milestone.borderColor}`
      : "bg-white border-neutral-200";
  };

  if (!isCalculated) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 select-none">
        <div className="max-w-xl w-full text-center space-y-12">
          <header className="space-y-4">
            <h1
              className="text-7xl md:text-9xl text-neutral-900 tracking-wider"
              style={{ fontFamily: "Staatliches" }}
            >
              MEMENTO MORI
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
              className="group w-full bg-neutral-900 text-white p-6 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 shadow-xl"
            >
              <span
                className="text-3xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                CONTEMPLAR
              </span>
              <ChevronRight size={24} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1F] pb-32">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span
            className="text-4xl tracking-widest"
            style={{ fontFamily: "Staatliches" }}
          >
            MEMENTO MORI.
          </span>
          <button
            onClick={reset}
            className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors"
          >
            <span
              className="text-xs uppercase tracking-widest font-bold"
              style={{ fontFamily: "Inter" }}
            >
              reiniciar
            </span>
            <RefreshCw size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16 space-y-32">
        {/* Resumen Principal */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-1 p-6 border-l-4 border-blue-200">
            <h4
              className="text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              VIVIDO
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
              className="text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              RESTANTE
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
              className="text-xl tracking-widest text-neutral-400"
              style={{ fontFamily: "Staatliches" }}
            >
              AVANCE
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
        <section className="space-y-12">
          <h2
            className="text-5xl tracking-widest border-b border-neutral-200 pb-4"
            style={{ fontFamily: "Staatliches" }}
          >
            ASPECTOS DESTACADOS DE LA VIDA
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

            <div className="bg-neutral-900 text-white p-12 rounded-[2.5rem] flex flex-col justify-center space-y-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <Heart className="text-red-400" size={32} />
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
                "Si ves a tus padres solo dos semanas al año, es probable que ya
                hayas vivido más del 90% del tiempo total que te queda con
                ellos. No ignores el presente."
              </p>
            </div>
          </div>
        </section>

        {/* Contexto Social y Mundo Natural */}
        <section className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Globe className="text-blue-400" size={32} />
              <h2
                className="text-4xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                CONTEXTO SOCIAL
              </h2>
            </div>
            <div className="space-y-6">
              <p
                className="text-xl italic text-neutral-600 leading-relaxed"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Desde tu nacimiento, la humanidad ha crecido de 6,900 millones a
                más de{" "}
                <span
                  className="text-2xl text-neutral-900 not-italic"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  8
                </span>{" "}
                mil millones de personas.
              </p>
              <div className="bg-white p-8 border-2 border-neutral-50 rounded-2xl space-y-4 shadow-sm">
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
              <TreeDeciduous className="text-emerald-500" size={32} />
              <h2
                className="text-4xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                MUNDO NATURAL
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100">
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
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
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
        <section className="bg-[#111] text-white p-12 md:p-20 rounded-[3rem] shadow-2xl overflow-hidden relative">
          <Stars className="absolute top-10 right-10 opacity-20" size={120} />
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
              <Sparkles className="text-amber-400" size={32} />
              <h2
                className="text-5xl tracking-widest"
                style={{ fontFamily: "Staatliches" }}
              >
                PERSPECTIVA CÓSMICA
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

            <div className="pt-12 border-t border-white/10 text-center space-y-4">
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

        {/* Grid de Vida */}
        <section className="space-y-10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="text-6xl tracking-widest text-neutral-900"
              style={{ fontFamily: "Staatliches" }}
            >
              LA RED DEL TIEMPO
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
            </div>
          </div>

          <div
            className="grid gap-0.5 sm:gap-1"
            style={{
              gridTemplateColumns: `repeat(${WEEKS_IN_YEAR}, minmax(0, 1fr))`,
            }}
          >
            {[...Array(TOTAL_WEEKS)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-full transition-all duration-700 border-2 ${getWeekStyles(i)}`}
                title={`Semana ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Glosario Staatliches */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-neutral-100 pt-16">
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

        <footer className="pt-32 text-center space-y-12">
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-20 bg-neutral-900"></div>
            <Brain size={32} />
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
            memento mori • consciente
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
