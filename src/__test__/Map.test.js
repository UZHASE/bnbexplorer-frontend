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

const selected = {
  area: 'Forest Hills',
  availability: 140,
  host: { id: 627678, name: 'Nathan', numOfListings: 1 },
  id: 3199681,
  images: [],
  latitude: 40.73381,
  longitude: -73.85366,
  minNights: 7,
  name: 'Bright & Sunny FULLY FURNISHED Room',
  neighbourhood: 'Queens',
  numOfReviews: 2,
  price: 50,
  roomType: 'Private room',
};

const recommendations = [
  {
    area: 'Forest Hills',
    availability: 140,
    host: { id: 627678, name: 'Nathan', numOfListings: 1 },
    id: 3199681,
    images: [],
    latitude: 40.73381,
    longitude: -73.85366,
    minNights: 7,
    name: 'Bright & Sunny FULLY FURNISHED Room',
    neighbourhood: 'Queens',
    numOfReviews: 2,
    price: 50,
    roomType: 'Private room',
  },
  {
    area: 'Bushwick',
    availability: 134,
    host: { id: 15714652, name: 'Tejal', numOfListings: 1 },
    id: 5181492,
    images: [],
    latitude: 40.70041,
    longitude: -73.93816,
    minNights: 11,
    name: 'Spacious, sunny, private loft bdrm!',
    neighbourhood: 'Brooklyn',
    numOfReviews: 21,
    price: 70,
    roomType: 'Private room',
  },
];

test('renders empty map', () => {
  render(<Map />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
});

test('renders map with listings', () => {
  render(<Map listings={listings} />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
  expect(screen.getByTestId('map-marker-652371-listings')).toBeInTheDocument();
});

test('renders map with recommendations', () => {
  render(<Map listings={listings} recommendations={recommendations} />);
  expect(screen.getByTestId('map-container-inner')).toBeInTheDocument();
  expect(
    screen.getByTestId('map-marker-3199681-recommendations'),
  ).toBeInTheDocument();
});

test('renders map with selected', () => {
  render(<Map selected={selected} />);
  expect(screen.getByTestId('map-marker-3199681-icon-selected')).toHaveStyle(
    'color: rgb(255, 255, 0)',
  );
});
