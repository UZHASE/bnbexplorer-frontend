import { configure } from '@testing-library/dom';
import {
  getMappedCrimeData,
  getMappedRodentData,
  getMappedComplaintData,
} from '../services/mapService';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

const mockData = [
  {
    latitude: 50.0,
    longitude: 90.0,
  },
  { latitude: 10.0, longitude: 20.0 },
];

test('Empty Rodent data returns empty positions', () => {
  //check that if rodent data was provided, but the array is empty, that the positions will be empty as well
  expect(getMappedRodentData([])).toEqual({
    options: {
      gradient: ['rgba(0,0,255,0)', 'rgba(0, 0, 255, 1)'],
      opacity: 0.6,
      radius: 20,
    },
    positions: [],
  });
});

test('No Rodent data returns empty object', () => {
  //check that if no rodent data was provided from the backend,
  // that the resulting object will be empty
  expect(getMappedRodentData()).toEqual({});
});

test('Rodent data positions mapping', () => {
  //check that the mapping puts the position data into the correct format
  expect(getMappedRodentData(mockData)).toEqual({
    options: {
      gradient: ['rgba(0,0,255,0)', 'rgba(0, 0, 255, 1)'],
      opacity: 0.6,
      radius: 20,
    },
    positions: [
      { lat: 50.0, lng: 90.0 },
      { lat: 10.0, lng: 20.0 },
    ],
  });
});

test('Empty Crime data returns empty positions', () => {
  //check that if Crime data was provided, but the array is empty, that the positions will be empty as well
  expect(getMappedCrimeData([])).toEqual({
    positions: [],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
    },
  });
});

test('Crime data returns mapped positions', () => {
  expect(getMappedCrimeData(mockData)).toEqual({
    //check that the mapping puts the position data into the correct format
    positions: [
      { lat: 50.0, lng: 90.0 },
      { lat: 10.0, lng: 20.0 },
    ],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
    },
  });
});

test('No Crime data returns empty object', () => {
  //check that if no crime data was provided from the backend,
  // that the resulting object will be empty
  expect(getMappedCrimeData()).toEqual({});
});

test('Empty Complaints data returns empty positions', () => {
  //check that if Complaints data was provided, but the array is empty, that the positions will be empty as well
  expect(getMappedComplaintData([])).toEqual({
    positions: [],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(240, 40, 120, 0)', 'rgba(240, 40, 120, 1)'],
    },
  });
});

test('Complaints data returns mapped positions', () => {
  //check that the mapping puts the position data into the correct format
  expect(getMappedComplaintData(mockData)).toEqual({
    positions: [
      { lat: 50.0, lng: 90.0 },
      { lat: 10.0, lng: 20.0 },
    ],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(240, 40, 120, 0)', 'rgba(240, 40, 120, 1)'],
    },
  });
});

test('No Complaints data returns empty object', () => {
  //check that if no complaints data was provided from the backend,
  // that the resulting object will be empty
  expect(getMappedComplaintData()).toEqual({});
});
