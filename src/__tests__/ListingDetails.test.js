import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import ListingDetails from '../components/ListingDetails';

// setup

// mock data
const listing = {
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

const listingWithImages = {
  area: 'Forest Hills',
  availability: 140,
  host: { id: 627678, name: 'Nathan', numOfListings: 1 },
  id: 3199681,
  images: [
    'https://a0.muscache.com/im/pictures/5cf02a45-25d8-47c6-8c8b-c61949238dc0.jpg',
    'https://a0.muscache.com/im/pictures/3d3a87bc-9a2c-47b7-8a36-22969be34e5d.jpg',
  ],
  latitude: 40.73381,
  longitude: -73.85366,
  minNights: 7,
  name: 'Bright & Sunny FULLY FURNISHED Room',
  neighbourhood: 'Queens',
  numOfReviews: 2,
  price: 50,
  roomType: 'Private room',
};

const clickHandler = () => {
  console.log('test-click registered');
};

// tests
test('call ListingDetails without props', () => {
  render(<ListingDetails />);
  expect(screen.getByTestId('listing-details-no-content')).toBeInTheDocument();
});

test('call ListingDetails with props, no reviews', () => {
  render(
    <ListingDetails
      listing={listing}
      onClick={clickHandler}
      showReviews={false}
    />
  );
  // check for overarching ListingDetails element
  expect(screen.getByTestId('listing-details-container')).toBeInTheDocument();
  // check for one of the listing sub-elements in child component(ListingInfoItem)
  expect(
    screen.getByTestId('listing-info-item-Host-label')
  ).toBeInTheDocument();
  expect(
    screen.getByTestId('listing-info-item-Host-value')
  ).toBeInTheDocument();
  // check for no-review item of child component (ListingInfoItem)
  expect(
    screen.getByTestId('listing-info-item-review-no-review')
  ).toBeInTheDocument();
});

test('call ListingDetails with props, has reviews', () => {
  render(
    <ListingDetails
      listing={listing}
      onClick={clickHandler}
      showReviews={true}
    />
  );
  // check for overarching ListingDetails element
  expect(screen.getByTestId('listing-details-container')).toBeInTheDocument();
  // check for one of the listing sub-elements in child component(ListingInfoItem)
  expect(
    screen.getByTestId('listing-info-item-Host-label')
  ).toBeInTheDocument();
  expect(
    screen.getByTestId('listing-info-item-Host-value')
  ).toBeInTheDocument();
  // check for has-review item of child component (ListingInfoItem)
  expect(
    screen.getByTestId('listing-info-item-review-has-review')
  ).toBeInTheDocument();
});

test('call ListingDetails with props, has Images', () => {
  render(<ListingDetails listing={listingWithImages} />);
  // check for the existence of the images in the carousel
  expect(
    screen.getByTestId(`listing-image-${listingWithImages.images[0]}`)
  ).toBeInTheDocument();
  expect(
    screen.getByTestId(`listing-image-${listingWithImages.images[1]}`)
  ).toBeInTheDocument();
});
