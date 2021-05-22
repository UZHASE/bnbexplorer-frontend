import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import * as markerService from '../services/markerService';

import Map from '../components/Map/Map';

// TESTS
test('compose id, case visible', () => {
  /*
  This test verifies that the 'composeId' function returns the proper value in case
  a component is visible.
   */
  expect(markerService.composeId('1234') === '1234-visible');
});

test('compose id, case hidden', () => {
  /*
  This test verifies that the 'composeId' function returns the proper value in case
  a component is hidden.
 */
  expect(markerService.composeId('1234', true) === '1234-hidden');
});

test('test grabbing element positional data', () => {
  /*
  This test verifies the basic implementation and returns of the 'getElementPositionData'
  function. As explained below, since the elements do not have dimensions, all return
  values will be zero. The important thing here then is that all of the expected properties
  (left, top, ...) are returned.
   */
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

/*
NOTE: Context for all tests concerning the 'HoverBox'
For some Context: 'getHoverBoxStyleData' determines in which direction the Element that shows up when
hovering over a search result on the map should 'fold', meaning where in relation to the marker on the map
it should appear. Available are two axis:
  - horizontal -> options: left, right
  - vertical -> options: top, bottom
With the default configuration being bottom-right. The 'fold' is determined based on the position of the marker
in question on the map component. 4 quadrants are drawn (think of it as a cartesian coordinate system with the zero
being centered in the map) with each quadrant having a different 'fold'. This prevents the element that appears
on hover to clip out of the map.

Since the element that holds the information about the search-result has a differing amount of information, its
height when rendered is variable. Hence each 'HoverBox' has a 'hidden twin' that is rendered so the respective
height can be read from it. For those 'hidden twins', the fold is irrelevant but they are still passed through
the function.
 */

test('HoverBox style data, case hidden', () => {
  /*
  For context see block comment above.

  This case then verifies that default values are returned and no calculations are performed on the 'hidden twins'
   */
  const response = markerService.getHoverBoxStyleData(true, 'some_id');
  // in case hidden, not style data is computed, hence expect default return
  expect(response.foldLeft === false);
  expect(response.foldTop === false);
  expect(response.markerOffsetTopComputed === 'unset');
});

test('HoverBox style data, case visible, expect 3 calls', () => {
  /*
  For context see block comment above.

  This test then concerns the case where the element the function is called upon is an actual visible 'HoverBox'.
  This means the calculation will run its full course. This full course of the function includes 3 calls to
  'getElementPositionData'. Since that function will error out if no actual element can be measured it is mocked.
  This test then can only verify that 3 calls to the 'getElementPositionData' function have been made
 */
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
  // expecting false, false and 'unset' as answers, since no actual dimensions

  // restore to original function
  spy.mockRestore();
});

test('HoverBox style data, case visible, upper right quadrant', () => {
  /*
  For context see block comment above.

  This test concerns the case where the element the function is called upon is an actual visible 'HoverBox'.
  This means the calculation will run its full course. This full course of the function includes 3 calls to
  'getElementPositionData'. The return values are mocked to position the marker in the upper right quadrant.
 */

  // mocks first call which is about the positional data of the map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });
  // mocks second call which is about the positional data of the marker on the map
  // -> left and top are the only relevant values here, set so that in upper right quadrant of map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 110, // 200 width of map -> 110 > (200/2) -> right half
      top: 20, // 100 height of map -> 20 < (100/2) -> top half
      height: 24,
      width: 24,
    });
  // mocks third call which is about the positional data of hidden HoverBox twin to grab the height
  // only relevant value here is height
  // (since foldTop is false though, the value will not be incorporated into the calculation)
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 0,
      top: 0,
      height: 76,
      width: 130,
    });


  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  expect(response.foldLeft === true);
  expect(response.foldTop === false);
  expect(response.markerOffsetTopComputed === 'unset')
  // upper right quadrant -> fold bottom-left to avoid clipping. also means markerOffsetTopComputed
  // is not relevant (since no foldTop), hence will be 'unset'
});

test('HoverBox style data, case visible, upper left quadrant', () => {
  /*
  For context see block comment above.

  This test concerns the case where the element the function is called upon is an actual visible 'HoverBox'.
  This means the calculation will run its full course. This full course of the function includes 3 calls to
  'getElementPositionData'. The return values are mocked to position the marker in the upper left quadrant.
 */

  // mocks first call which is about the positional data of the map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });
  // mocks second call which is about the positional data of the marker on the map
  // -> left and top are the only relevant values here, set so that in upper left quadrant of map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10, // 200 width of map -> 10 < (200/2) -> left half
      top: 20, // 100 height of map -> 20 < (100/2) -> top half
      height: 24,
      width: 24,
    });
  // mocks third call which is about the positional data of hidden HoverBox twin to grab the height
  // only relevant value here is height
  // (since foldTop is false though, the value will not be incorporated into the calculation)
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 0,
      top: 0,
      height: 76,
      width: 130,
    });


  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  expect(response.foldLeft === false);
  expect(response.foldTop === false);
  expect(response.markerOffsetTopComputed === 'unset')
  // upper left quadrant -> fold bottom-right to avoid clipping. also means markerOffsetTopComputed
  // is not relevant (since no foldTop), hence will be 'unset'
});

test('HoverBox style data, case visible, bottom left quadrant', () => {
  /*
  For context see block comment above.

  This test concerns the case where the element the function is called upon is an actual visible 'HoverBox'.
  This means the calculation will run its full course. This full course of the function includes 3 calls to
  'getElementPositionData'. The return values are mocked to position the marker in the bottom left quadrant.
 */

  // mocks first call which is about the positional data of the map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });
  // mocks second call which is about the positional data of the marker on the map
  // -> left and top are the only relevant values here, set so that in bottom left quadrant of map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10, // 200 width of map -> 10 < (200/2) -> left half
      top: 80, // 100 height of map -> 80 > (100/2) -> bottom half
      height: 24,
      width: 24,
    });
  // mocks third call which is about the positional data of hidden HoverBox twin to grab the height
  // only relevant value here is height
  // since foldTop is ture though, the value is relevant and will be incorporated into the calculation
  const hiddenHeight = 76;
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 0,
      top: 0,
      height: hiddenHeight,
      width: 130,
    });


  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  expect(response.foldLeft === false);
  expect(response.foldTop === true);
  // expected offset (since foldTop true) is calculated by adding the offsetMargin (constant value)
  // to the height of the third return on the spy call for 'getElementPositionData')
  const offsetMargin = 8;
  const expectedOffsetTop = `-${hiddenHeight + offsetMargin}px`
  expect(response.markerOffsetTopComputed === expectedOffsetTop)
  // lower left quadrant -> fold top-right to avoid clipping. also means markerOffsetTopComputed
  // is relevant and will be computed in pixels
});

test('HoverBox style data, case visible, bottom right quadrant', () => {
  /*
  For context see block comment above.

  This test concerns the case where the element the function is called upon is an actual visible 'HoverBox'.
  This means the calculation will run its full course. This full course of the function includes 3 calls to
  'getElementPositionData'. The return values are mocked to position the marker in the bottom right quadrant.
 */

  // mocks first call which is about the positional data of the map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });
  // mocks second call which is about the positional data of the marker on the map
  // -> left and top are the only relevant values here, set so that in bottom right quadrant of map
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 110, // 200 width of map -> 110 < (200/2) -> right half
      top: 80, // 100 height of map -> 80 > (100/2) -> bottom half
      height: 24,
      width: 24,
    });
  // mocks third call which is about the positional data of hidden HoverBox twin to grab the height
  // only relevant value here is height
  // since foldTop is true though, the value is relevant and will be incorporated into the calculation
  const hiddenHeight = 76;
  jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValueOnce({
      left: 0,
      top: 0,
      height: hiddenHeight,
      width: 130,
    });


  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  expect(response.foldLeft === true);
  expect(response.foldTop === true);
  // expected offset (since foldTop true) is calculated by adding the offsetMargin (constant value)
  // to the height of the third return on the spy call for 'getElementPositionData')
  const offsetMargin = 8;
  const expectedOffsetTop = `-${hiddenHeight + offsetMargin}px`
  expect(response.markerOffsetTopComputed === expectedOffsetTop)
  // lower right quadrant -> fold top-left to avoid clipping. also means markerOffsetTopComputed
  // is relevant and will be computed in pixels
});