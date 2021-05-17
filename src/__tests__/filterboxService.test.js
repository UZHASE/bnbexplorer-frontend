import {
  getMaxPrice,
  handleSettingsChange,
} from '../services/filterboxService';
import { DURATION_SCALE, RANGEMAX } from '../constants/filterSettings';

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

test('handleSettingsChange priceRange', () => {
  const res = handleSettingsChange(
    'priceRange',
    [10, 20],
    filterSettings,
    metaListingData,
  );
  expect(res).toEqual(priceResult);
});

test('handleSettingsChange location', () => {
  const res = handleSettingsChange(
    'location',
    ['Manhattan', 'Bronx'],
    filterSettings,
    metaListingData,
  );
  expect(res.location).toEqual('Manhattan,Bronx');
});

test('handleSettingsChange roomType', () => {
  const res = handleSettingsChange(
    'roomType',
    ['1room', '2room'],
    filterSettings,
    metaListingData,
  );
  expect(res.roomType).toEqual('1room,2room');
});

test('handleSettingsChange availability', () => {
  const res = handleSettingsChange(
    'availability',
    5,
    filterSettings,
    metaListingData,
  );
  expect(res.availability).toEqual(DURATION_SCALE[5]);
});
test('handleSettingsChange minNights', () => {
  const res = handleSettingsChange(
    'minNights',
    5,
    filterSettings,
    metaListingData,
  );
  expect(res.minNights).toEqual(DURATION_SCALE[5]);
});

test('handleSettingsChange other values', () => {
  const res = handleSettingsChange(
    'listingsPerHost',
    30,
    filterSettings,
    metaListingData,
  );
  expect(res.listingsPerHost).toEqual(30);
});

test('getMaxPrice set listings price max', () => {
  const res = getMaxPrice(RANGEMAX, metaListingData);
  console.log(res);
  expect(res).toEqual(metaListingData.maxPrice);
});

test('getMaxPrice return initial', () => {
  const res = getMaxPrice(RANGEMAX - 1, metaListingData);
  console.log(res);
  expect(res).toEqual(RANGEMAX - 1);
});
