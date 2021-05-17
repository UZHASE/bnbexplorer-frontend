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
  // Api.get = jest.fn().mockResolvedValue({ data: resp });

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

test('clickListingHandler returns listing, review & recommendations catches no recommendations', () => {
  //listing get
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: listingResponseData,
  });
  //reviews get
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: reviewResponseData,
  });
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: [],
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

test('loadListingData', () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: listingsResponseData,
  });
  return loadListingsData(defaultFilterSettings).then((data) =>
    expect(data).toEqual(listingsResponseData),
  );
});

test('loadListingData catches error', () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce();
  return loadListingsData(defaultFilterSettings).then((data) =>
    expect(data).toEqual([]),
  );
});
