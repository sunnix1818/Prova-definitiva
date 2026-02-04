export const NATION_PRESETS = {
  Francia: { population: 30000000, economy: 120, tech: 1.2, armyRatio: 0.008 },
  Prussia: { population: 18000000, economy: 90, tech: 1.4, armyRatio: 0.01 },
  Russia:  { population: 45000000, economy: 70, tech: 0.9, armyRatio: 0.012 }
};

export function createNation(name) {
  const base = NATION_PRESETS[name] || {
    population: 5000000,
    economy: 50,
    tech: 1,
    armyRatio: 0.006
  };

  return {
    name,
    population: base.population,
    economy: base.economy,
    tech: base.tech,
    money: base.population * 0.02,
    troops: Math.floor(base.population * base.armyRatio),
    diplomacy: {}
  };
}
