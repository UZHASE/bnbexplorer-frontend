import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import { mount, shallow } from 'enzyme';

// import {
//   // getElementPositionData,
//   getHoverBoxStyleData,
//   composeId,
// } from '../services/markerService';

import * as markerService from '../services/markerService';

import Map from '../components/Map/Map';

// setup

// mock data
const searchResults = [
  {
    formatted_address: 'Example Road 15, Samplingen, 1234, Sampland',
    place_id: '4321_sample',
    icon:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    geometry: {
      viewport: {
        La: {
          g: -74.18365117989272,
          i: -74.18095152010727,
        },
        Ua: {
          g: 40.07910682010728,
          i: 40.08180647989273,
        },
      },
    },
  },
];

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

// jest.mock('../services/markerService', () => jest.fn());
// const getElementPositionData = jest.fn(() => {
//   return { left: 10, top: 20, height: 50, width: 100 };
// });

test('hoverbox style data, case visible, expect 3 calls', () => {
  // mocking getElementPositionData

  // jest.mock('../services/markerService', () => jest.fn());
  // const getElementPositionData = jest.fn(() => {
  //   return { left: 10, top: 20, height: 50, width: 100 };
  // });

  // const mockGetElementPositionData = jest
  //   .spyOn('../services/markerService.js', 'getElementPositionData', 'get')
  //   .mockImplementation(() => {
  //     // console.log(
  //     //   'getElementPositionData MOCK called with elementId:',
  //     //   elementId
  //     // );
  //     return { left: 10, top: 20, height: 100, width: 200 };
  //   });

  // jest.mock('../services/markerService.js', () => ({
  //   ...jest.requireActual('../services/markerService.js'),
  //   getElementPositionData: () => {
  //     return {
  //       left: 20,
  //       top: 30,
  //       height: 100,
  //       width: 200,
  //     };
  //   },
  // }));

  // const derp = getElementPositionData("bla")
  // console.log(derp)

  // NOTE: mock getElementPositionData for this particular call, since no actual elements,
  //  hence error at getBoundingClientRect
  const spy = jest
    .spyOn(markerService, 'getElementPositionData')
    .mockReturnValue({
      left: 10,
      top: 20,
      height: 100,
      width: 200,
    });
  // spy.mockReturnValue({
  //   left: 10,
  //   top: 20,
  //   height: 100,
  //   width: 200,
  // });

  const response = markerService.getHoverBoxStyleData(false, 'some_id');
  expect(spy).toHaveBeenCalledTimes(3);

  // restore to original function
  spy.mockRestore();

  console.log('response', response);
  // expect(response.foldLeft === false);
  // expect(response.foldTop === false);
  // expect(response.markerOffsetTopComputed === 'unset')
});
