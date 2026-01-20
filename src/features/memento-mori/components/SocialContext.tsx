import React from "react";
import type { Stats } from "../../../lib/types";
import { Globe } from "@phosphor-icons/react";
import { SplitText } from "../../../components/SplitText";

interface SocialContextProps {
  stats: Stats;
}

export const SocialContext = React.memo(({ stats }: SocialContextProps) => {
  return (
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
          style={{ fontFamily: "Ephesis" }}
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
            style={{ fontFamily: "Ephesis" }}
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
          style={{ fontFamily: "Ephesis" }}
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
  );
});
