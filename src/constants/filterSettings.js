// key: index of slider mark,
// value: scaled up value
// achieves a less cluttered slider by introducing well-defined marks and a custom scale
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

export const DEFAULT_FILTER_SETTINGS = {
  priceMin: 50,
  priceMax: 100,
  minNights: 5,
  availability: 90,
  listingsPerHost: 1,
};

// the maximum value (price) for the pricerange slider that is shown
export const RANGEMAX = 500;

export const CURRENCY = '$';
