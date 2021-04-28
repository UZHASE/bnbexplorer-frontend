export const DEFAULT_FILTER_SETTINGS = {
  minPrice: 50,
  maxPrice: 100,
  minDuration: 3,
};

export const DURATION_SCALE = {
  1: 1,
  2: 3,
  3: 5,
  4: 7,
  5: 10,
  6: 14,
  7: 30,
  8: 90,
  9: 180,
};

export const DURATION_MARKS = () => {
  return Object.keys(DURATION_SCALE).map((e) => {
    return {
      value: e,
      label: e % 2 === 0 ? DURATION_SCALE[e].toString() : '',
    };
  });
};
