import { configure } from '@testing-library/dom';
import {
  getMappedCrimeData,
  getMappedRodentData,
  getMappedComplaintsData,
} from '../services/mapService';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

test('Rodent data returns empty positions', () => {
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
  expect(getMappedRodentData()).toEqual({});
});

test('Crime data returns empty positions', () => {
  expect(getMappedCrimeData([])).toEqual({
    positions: [],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
    },
  });
});

test('No Crime data returns empty object', () => {
  expect(getMappedCrimeData()).toEqual({});
});

test('Complaints data returns empty positions', () => {
  expect(getMappedComplaintsData([])).toEqual({
    positions: [],
    options: {
      radius: 20,
      opacity: 0.6,
      gradient: ['rgba(240,40,120,0)', 'rgba(240,140,120,1)'],
    },
  });
});

test('No Complaints data returns empty object', () => {
  expect(getMappedComplaintsData()).toEqual({});
});
