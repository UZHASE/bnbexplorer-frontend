import {
  getMaxPrice,
  handleSettingsChange,
} from '../services/filterboxService';
import { DURATION_SCALE, RANGEMAX } from '../constants/filterSettings';

// MOCK DATA
const filterSettings = {
  priceMin: 50,
  priceMax: 100,
};
const priceResult = {
  priceMin: 10,
  priceMax: 20,
};
const metaListingData = {
  maxPrice: 9999,
};

// TESTS
test('handleSettingsChange priceRange', () => {
  /*
  Test verifies that the filterSettings are properly updated to include
  the new values for the price range
   */
  const res = handleSettingsChange(
    'priceRange',
    [10, 20],
    filterSettings,
    metaListingData,
  );
  expect(res).toEqual(priceResult);
});

test('handleSettingsChange location', () => {
  /*
  Test verifies that the location is updated properly in the filterSettings
   */
  const res = handleSettingsChange(
    'location',
    ['Manhattan', 'Bronx'],
    filterSettings,
    metaListingData,
  );
  expect(res.location).toEqual('Manhattan,Bronx');
});

test('handleSettingsChange roomType', () => {
  /*
  Test verifies that the roomType selection is properly updated in the filterSettings
   */
  const res = handleSettingsChange(
    'roomType',
    ['1room', '2room'],
    filterSettings,
    metaListingData,
  );
  expect(res.roomType).toEqual('1room,2room');
});

test('handleSettingsChange availability', () => {
  /*
  Test verifies that the availability is properly updated in the filterSettings
   */
  const res = handleSettingsChange(
    'availability',
    5,
    filterSettings,
    metaListingData,
  );
  expect(res.availability).toEqual(DURATION_SCALE[5]);
});

test('handleSettingsChange minNights', () => {
  /*
  Test verifies that the minimum number of nights setting is updated properly
  in filterSettings
   */
  const res = handleSettingsChange(
    'minNights',
    5,
    filterSettings,
    metaListingData,
  );
  expect(res.minNights).toEqual(DURATION_SCALE[5]);
});

test('handleSettingsChange other values', () => {
  /*
  Test verifies that the listingsPerHost (the only value currently hat is treated
  in the else clause of the function) is updated properly.
   */
  const res = handleSettingsChange(
    'listingsPerHost',
    30,
    filterSettings,
    metaListingData,
  );
  expect(res.listingsPerHost).toEqual(30);
});

test('getMaxPrice set listings price max', () => {
  /*
  Test verifies that 'getMaxPrice' returns the actual maxPrice received in the
  metaListingData, if the user maxes out the rangeSlider to RANGEMAX, instead of
  returning the value of the slider.
   */
  const res = getMaxPrice(RANGEMAX, metaListingData);
  console.log(res);
  expect(res).toEqual(metaListingData.maxPrice);
});

test('getMaxPrice return initial', () => {
  /*
  Test verifies that 'getMaxPrice' returns the value set on the slider if the slider
  is not maxed in its range to RANGEMAX
   */
  const res = getMaxPrice(RANGEMAX - 1, metaListingData);
  console.log(res);
  expect(res).toEqual(RANGEMAX - 1);
});
