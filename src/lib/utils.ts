/**
 * Calcula la población mundial aproximada según el año
 */
export const getWorldPopulation = (year: number): number => {
  // Datos aproximados de población mundial en miles de millones
  const populationData: { [key: number]: number } = {
    1950: 2.5,
    1955: 2.8,
    1960: 3.0,
    1965: 3.3,
    1970: 3.7,
    1975: 4.1,
    1980: 4.4,
    1985: 4.9,
    1990: 5.3,
    1995: 5.7,
    2000: 6.1,
    2005: 6.5,
    2010: 6.9,
    2015: 7.3,
    2020: 7.8,
    2023: 8.0,
    2024: 8.1,
    2025: 8.2,
    2026: 8.2,
  };

  // Si el año está en los datos, retornarlo
  if (populationData[year]) return populationData[year];

  // Interpolación lineal para años intermedios
  const years = Object.keys(populationData)
    .map(Number)
    .sort((a, b) => a - b);
  const lowerYear = years.reverse().find((y) => y <= year) || years[0];
  const upperYear = years.find((y) => y > year) || years[years.length - 1];

  if (lowerYear === upperYear) return populationData[lowerYear];

  const ratio = (year - lowerYear) / (upperYear - lowerYear);
  return (
    populationData[lowerYear] +
    ratio * (populationData[upperYear] - populationData[lowerYear])
  );
};
