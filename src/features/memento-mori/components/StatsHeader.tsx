import React from "react";
import type { Stats } from "../../../lib/types";
import { SplitText } from "../../../components/SplitText";

interface StatsHeaderProps {
  stats: Stats;
}

export const StatsHeader = React.memo(({ stats }: StatsHeaderProps) => {
  return (
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
          style={{ fontFamily: "Ephesis" }}
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
          style={{ fontFamily: "Ephesis" }}
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
          style={{ fontFamily: "Ephesis" }}
        >
          del total estimado
        </p>
      </div>
    </section>
  );
});
