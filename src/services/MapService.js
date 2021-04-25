export const getMappedCrimeData = (crimeData) => {
  return typeof crimeData !== 'undefined' && crimeData //verbose checking to make SonarQube happy ...
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

export const getMappedCleanlinessData = (cleanlinessData) => {
  return typeof cleanlinessData !== 'undefined' && cleanlinessData //verbose checking to make SonarQube happy ...
    ? {
        positions: cleanlinessData.map((e) => {
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
