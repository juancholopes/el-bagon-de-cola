// Tipos de la aplicación Memento Mori

export interface Stats {
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
  visitsFutureTotal: number;
  stillLivingWithParents: boolean;
  populationAtBirth: number;
  currentPopulation: number;
}

export interface Milestone {
  label: string;
  start: number;
  end: number;
  color: string;
  borderColor: string;
  text: string;
}
