import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import FilterBox from '../components/FilterBox';
import { getMappedRodentData } from '../services/mapService';
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
