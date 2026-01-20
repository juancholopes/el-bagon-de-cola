import { useMemo } from "react";
import type { Stats } from "../../../lib/types";
import {
  EXPECTANCY_YEARS,
  TOTAL_WEEKS,
  PARENT_AVG_AGE_DIFF,
  PARENT_LIFE_EXPECTANCY,
  VISITS_PER_YEAR,
} from "../../../lib/constants";
import { getWorldPopulation } from "../../../lib/utils";

export const useLifeStats = (birthDate: string): Stats | null => {
  return useMemo<Stats | null>(() => {
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
    const parentAge = yearsLived + PARENT_AVG_AGE_DIFF;
    const parentYearsLeft = Math.max(0, PARENT_LIFE_EXPECTANCY - parentAge);
    const totalWeeksWithParents =
      yearsLived * VISITS_PER_YEAR + parentYearsLeft * VISITS_PER_YEAR;
    const weeksAlreadySpent = yearsLived * VISITS_PER_YEAR;
    const parentTimePercentage =
      totalWeeksWithParents > 0
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
};
