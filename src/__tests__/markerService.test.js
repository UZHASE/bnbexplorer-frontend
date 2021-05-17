import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import * as markerService from '../services/markerService';

import Map from '../components/Map/Map';

// tests
test('compose id, case visible', () => {
  expect(markerService.composeId('1234') === '1234-visible');
});

test('compose id, case hidden', () => {
  expect(markerService.composeId('1234', true) === '1234-hidden');
});

test('test grabbing element positional data', () => {
  render(<Map />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
  const { left, top, height, width } = markerService.getElementPositionData(
    'map-container-inner'
  );
  // since no actual dimensions for 'getBoundingClientRect', expecting all of them to be equal to zero
  // https://stackoverflow.com/questions/38656541/change-element-size-using-jest
  expect(left === 0);
  expect(top === 0);
  expect(height === 0);
  expect(width === 0);
});

test('hoverbox style data, case hidden', () => {
  const response = markerService.getHoverBoxStyleData(true, 'some_id');
  // in case hidden, not style data is computed, hence expect default return
  expect(response.foldLeft === false);
  expect(response.foldTop === false);
  expect(response.markerOffsetTopComputed === 'unset');
});

test('hoverbox style data, case visible, expect 3 calls', () => {
  // NOTE: mock getElementPositionData for this particular call, since no actual elements,
  //  hence error at getBoundingClientRect.
  const spy = jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValue({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });

  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  // expecting mocked function to be called 3 times
  expect(spy).toHaveBeenCalledTimes(3);
  expect(response.foldLeft === false);
  expect(response.foldTop === false);
  expect(response.markerOffsetTopComputed === 'unset')
  // expecting false, false and 'unset' as answers, since no folds will happen when
  // all elements share exact same data. potentially look into returning different
  // values based on parameters? not sure if possible

  // restore to original function
  spy.mockRestore();
});
