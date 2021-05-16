import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import Map from '../components/Map/Map';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

const listings = [
  { id: 652371, latitude: 40.75743, longitude: -73.96939 },
  { id: 652648, latitude: 40.74189, longitude: -73.97833 },
  { id: 652691, latitude: 40.76934, longitude: -73.98464 },
  { id: 1478946, latitude: 40.75029, longitude: -73.99556 },
  { id: 1479283, latitude: 40.75028, longitude: -73.99533 },
];



test('renders empty map', () => {
  render(<Map />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
});

test('renders map with listings', () => {
  render(<Map listings={listings} />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
});

