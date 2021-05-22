import { configure } from '@testing-library/dom';
import { clickListingHandler, loadListingsData } from '../services/appService';
import Api from '../lib/Http/Api';

configure({ testIdAttribute: 'id' });

const defaultFilterSettings = {
  priceMin: 50,
  priceMax: 100,
  hostId: 1234,
  listingsPerHost: 10,
};
const listingResponseData = {
  id: 500,
  price: 100,
  host: { id: 190921808, name: 'John', numOfListings: 47 },
};

const reviewResponseData = {
  id: 121700042,
  listingId: 16401944,
  text:
    "I never met Guelma.  I met a girl names Christine. Don't know if she owned the house, or who she was.",
};

const recommendationResponseData = [
  {
    area: "Hell's Kitchen",
    availability: 355,
    host: { id: 190921808, name: 'John', numOfListings: 47 },
    id: 25834662,
    images: [],
    latitude: 40.75545,
    longitude: -73.99556,
    minNights: 7,
    name: 'Cozy large room at the heart of NYC 41D4',
    neighbourhood: 'Manhattan',
    numOfReviews: 8,
    price: 62,
    roomType: 'Private room',
  },
];

const listingsResponseData = [
  { id: 652371, latitude: 40.75743, longitude: -73.96939 },
  { id: 652648, latitude: 40.74189, longitude: -73.97833 },
  { id: 652691, latitude: 40.76934, longitude: -73.98464 },
  { id: 1478946, latitude: 40.75029, longitude: -73.99556 },
];

test('clickListingHandler returns listing, review & recommendations', () => {
  // check that when a listing is clicked, clickListingHandler will lead to a
  // data request for this listing, reviews and also recommendations

  //listing get
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: listingResponseData,
  });
  //reviews get
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: reviewResponseData,
  });
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: recommendationResponseData,
  });

  return clickListingHandler('1234', defaultFilterSettings).then((data) =>
    expect(data).toEqual({
      listingResponseData,
      reviewResponseData,
      recommendationResponseData,
    }),
  );
});

test('clickListingHandler returns listing, review & recommendations and catches no recommendations', () => {
  // check that when a listing is clicked, clickListingHandler will lead to a
  // data request, and if recommendations had an error, i.e. filters too restricted, an empty array is returned
  // and subsequently a new call will be made to with less strict filter criteria

  //first the listings call
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: listingResponseData,
  });
  //second is for the reviews
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: reviewResponseData,
  });
  //recommendations returns [] => error or too strict
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: [],
  });
  //try again with less strict filter criteria
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: recommendationResponseData,
  });

  // 1234 is a random listingId here
  return clickListingHandler('1234', defaultFilterSettings).then((data) =>
    expect(data).toEqual({
      listingResponseData,
      reviewResponseData,
      recommendationResponseData,
    }),
  );
});

test('loadListingData with filter Settings', () => {
  // check that the method loadListingData calls the api which in turn returns the data with the listing
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: listingsResponseData,
  });
  return loadListingsData(defaultFilterSettings).then((data) =>
    expect(data).toEqual(listingsResponseData),
  );
});

test('loadListingData catches error', () => {
  // check that when the method loadListingData calls the api,
  // and the api throws an error, that still an empty array is returned.
  jest.spyOn(Api, 'get').mockResolvedValueOnce();
  return loadListingsData(defaultFilterSettings).then((data) =>
    expect(data).toEqual([]),
  );
});
