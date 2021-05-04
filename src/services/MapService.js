export const getMappedCrimeData = (crimeData) => {
  return crimeData
    ? {
        positions: crimeData.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
        },
      }
    : {};
};

export const getMappedRodentData = (rodentData) => {
  return rodentData
    ? {
        positions: rodentData.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(0,0,255,0)', 'rgba(0, 0, 255, 1)'],
        },
      }
    : {};
};

export const switchesTooltips = {
  rodent: 'Rat encounters in New York',
  transit: 'Transit options in New York',
  crime: 'Locations of crime occurrences in New York',
};
