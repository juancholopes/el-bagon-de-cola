import React, { useMemo } from "react";
import type { Stats } from "../../../lib/types";
import { MILESTONES, WEEKS_IN_YEAR, TOTAL_WEEKS } from "../../../lib/constants";
import { SplitText } from "../../../components/SplitText";

interface WeekGridProps {
  stats: Stats;
}

// Memoizar el componente para evitar re-renders
export const WeekGrid = React.memo(({ stats }: WeekGridProps) => {
  // Precalcular todos los estilos para evitar cálculos en cada render
  const weekStyles = useMemo(() => {
    return Array.from({ length: TOTAL_WEEKS }, (_, i) => {
      // Semana actual parpadeando
      if (i === stats.livedWeeks) {
        return "bg-rose-500 border-rose-700 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse z-10 scale-125 ring-2 ring-rose-200";
      }

      if (i < stats.livedWeeks) {
        return "bg-neutral-300 border-neutral-800 shadow-sm";
      }
      
      const milestone = MILESTONES.find((m) => i >= m.start && i < m.end);
      return milestone
        ? `${milestone.color} ${milestone.borderColor}`
        : "bg-white border-neutral-200";
    });
  }, [stats.livedWeeks]);

  return (
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
          willChange: "opacity, transform", // Optimización para animaciones
        }}
      >
        {weekStyles.map((style, i) => (
          <div
            key={i}
            data-week-index={i}
            className={`week-grid-item aspect-square rounded-full border-2 ${style}`}
            style={{ willChange: "transform" }}
            title={`Semana ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
});
