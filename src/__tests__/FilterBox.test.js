import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { configure } from '@testing-library/dom';
import FilterBox from '../components/FilterBox';
import Api from '../lib/Http/Api';

configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds
const metaListingsDataFull = {
  maxListingsPerHost: 327,
  maxPrice: 9999,
  minListingsPerHost: 1,
  minPrice: 0,
  neighbourhoods: ['Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bronx'],
  numOfListings: 9705,
  roomTypes: (3)[('Private room', 'Entire home/apt', 'Shared room')],
};

const metaListingsDataIncomplete = {
  maxListingsPerHost: 327,
  minListingsPerHost: 1,
  minPrice: 0,
  numOfListings: 9705,
};

describe.only('fetch metalistingdata tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders CircularProgress if metalistingsdata is missing', async () => {
    // check that when no data was returned from the backend, only a circular-progress is shown
    jest.spyOn(Api, 'get').mockResolvedValueOnce({
      data: undefined,
    });
    await act(async () => {
      render(<FilterBox />);
    });
    expect(
      await waitFor(() => screen.getByTestId('circularProgress-FilterBox')),
    ).toBeInTheDocument();
  });

  it('renders filter child components if metalistingdata is present', async () => {
    // check that when filter box is mounted, this will call the useEffect to get metalistingsdata
    // this in turn renders all the filter components
    //also check that all neighbourhoods were correctly added

    jest.setTimeout(10000); // just for debugging purposes to not go over jest's time limit
    jest.spyOn(Api, 'get').mockResolvedValueOnce({
      data: metaListingsDataFull,
    });
    //needs await to wait on useEffect
    await act(async () => {
      render(<FilterBox />);
    });

    //for debugging purposes
    // const maxLengthToPrint = 100000; // if you want to debug it
    // const locations = screen.getByTestId('multi-select-location');
    // screen.debug(locations, maxLengthToPrint);

    expect(Api.get).toHaveBeenCalled();
    expect(
      await waitFor(() => screen.getByTestId('range-slider-priceRange')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('simple-slider-minNights')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('simple-slider-availability')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('simple-slider-listingsPerHost')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('multi-select-location')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('multi-select-roomType')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() =>
        screen.queryByText('Brooklyn, Manhattan, Queens, Staten Island, Bronx'),
      ),
    ).toBeInTheDocument();
  });

  it('render child components with incomplete data', async () => {
    // check that when filterbox has been mounted, and the metaListingData has been queried,
    // but not all fields were present, ie. neighbourhoods were missing,
    // all other filter components still get rendered, but neighbourhoods is missing.
    jest.setTimeout(10000);

    jest.spyOn(Api, 'get').mockResolvedValueOnce({
      data: metaListingsDataIncomplete,
    });

    await act(async () => {
      render(<FilterBox />);
    });

    // for debugging purposes
    // const maxLengthToPrint = 100000;
    // const myElement = await screen.findAllByTestId('multi-select-location');
    // screen.debug(myElement, maxLengthToPrint);

    expect(Api.get).toHaveBeenCalled();
    expect(
      await waitFor(() => screen.getByTestId('range-slider-priceRange')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('simple-slider-minNights')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getByTestId('simple-slider-availability')),
    ).toBeInTheDocument();
    expect(
      await waitFor(() =>
        screen.queryByText('Brooklyn, Manhattan, Queens, Staten Island, Bronx'),
      ),
    ).not.toBeInTheDocument();
  });

  it('renders circular progress if metalistingsdata is empty', async () => {
    //check that when filterbox has been mounted and loadMetaListingsData returned empty data,
    // then the filter components will not be rendered, ie. the circular Progress is rendered.
    jest.spyOn(Api, 'get').mockResolvedValueOnce({
      data: {},
    });
    await act(async () => {
      render(<FilterBox />);
    });

    expect(Api.get).toHaveBeenCalled();
    expect(screen.getByTestId('circularProgress-FilterBox'));
  });
});
