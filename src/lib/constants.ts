import type { Milestone } from "./types";

export const EXPECTANCY_YEARS = 90;
export const WEEKS_IN_YEAR = 52;
export const TOTAL_WEEKS = EXPECTANCY_YEARS * WEEKS_IN_YEAR;

export const PARENT_AVG_AGE_DIFF = 28;
export const PARENT_LIFE_EXPECTANCY = 82;
export const VISITS_PER_YEAR = 2;

export const MILESTONES: Milestone[] = [
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
