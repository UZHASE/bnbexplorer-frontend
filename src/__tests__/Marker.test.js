import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { mount } from 'enzyme';
import Marker from '../components/Map/Marker';
import RoomIcon from '@material-ui/icons/Room';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

// MOCKS
const setListingHandler = jest.fn(() => {
  // "empty" handler
  console.log('listing set in parent');
});

const place = {
  formatted_address: 'Sample Street, 1234, Samplingen, Sampleland',
  name: 'Example Location',
  icon:
    'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
};

const markerProps = {
  // mock props
  id: '1234',
  setListing: setListingHandler,
  // available types: marker, listings, recommendations, selected
  type: 'marker',
  place: place,
};

// TESTS
test('Marker, type: marker (search result)', () => {
  /*
  Test verifies that Markers for search results can be rendered
  */
  render(<Marker {...markerProps} />);
  expect(
    screen.getByTestId(`map-marker-${markerProps.id}-${markerProps.type}`)
  ).toBeInTheDocument();
});

test('Marker, type: recommendation', () => {
  /*
  Test verifies that Markers for recommendations can be rendered
  */
  let temp = markerProps;
  temp.type = 'recommendation';
  render(<Marker {...temp} />);
  expect(
    screen.getByTestId(`map-marker-${temp.id}-${temp.type}`)
  ).toBeInTheDocument();
});

test('Marker, type: listing', () => {
  /*
  Test verifies that Markers for listings can be rendered
  */
  let temp = markerProps;
  temp.type = 'listing';
  render(<Marker {...temp} />);
  expect(
    screen.getByTestId(`map-marker-${temp.id}-${temp.type}`)
  ).toBeInTheDocument();
});

test('Marker, type: selected', () => {
  /*
  Test verifies that Markers for a 'selected' listing can be rendered
  */
  let temp = markerProps;
  temp.type = 'selected';
  render(<Marker {...temp} />);
  expect(
    screen.getByTestId(`map-marker-${temp.id}-${temp.type}`)
  ).toBeInTheDocument();
});

test('Marker, simulate click', () => {
  /*
  Test verifies that listing marker is clickable
   */
  let temp = markerProps;
  temp.type = 'listing';
  const wrapper = mount(<Marker {...temp} />);
  wrapper.find(RoomIcon).simulate('click');
  // verify that handler was called exactly once
  expect(setListingHandler).toHaveBeenCalledTimes(1);
});

test('Marker, simulate click, no handler', () => {
  /*
  Test verifies that marker types that have no handler are not called
   */
  let temp = markerProps;
  temp.type = 'listing';
  const wrapper = mount(<Marker {...temp} />);
  // will reach handler -> verify that method 'clickHandler' is triggered
  wrapper.find(RoomIcon).simulate('click');
  expect(setListingHandler).toHaveBeenCalledTimes(1);
  // set handler to null, no additional calls. Since it was shown that 'clickHandler'
  // is called on click, the condition must be working now, since the test does
  // not error out.
  wrapper.setProps({ setListing: null });
  wrapper.find(RoomIcon).simulate('click');
  expect(setListingHandler).toHaveBeenCalledTimes(1);
});
