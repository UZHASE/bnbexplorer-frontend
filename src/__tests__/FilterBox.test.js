import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { configure } from '@testing-library/dom';
import FilterBox from '../components/FilterBox';
import { mount, shallow } from 'enzyme';
import Api from '../lib/Http/Api';

configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

test('No data renders CircularProgress', () => {
  render(<FilterBox />);
  const linkElement = screen.getByTestId('circularProgress-FilterBox');
  expect(linkElement).toBeInTheDocument();
});

test('filterbox:set metalistingsdata called', async () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: metaListingsDataFull,
  });
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: metaListingsDataFull,
  });

  FilterBox.loadMetaListingData = jest
    .fn()
    .mockResolvedValue({ data: metaListingsDataFull });
  await act(async () => {
    const wrapper = mount(<FilterBox />);
    await wrapper.setProps();
  });

  expect(Api.get).toHaveBeenCalled();
});

test('filterbox:set metalistingsdata called incomplete data', async () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: metaListingsDataIncomplete,
  });
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: metaListingsDataIncomplete,
  });

  FilterBox.loadMetaListingData = jest
    .fn()
    .mockResolvedValue({ data: metaListingsDataIncomplete });
  await act(async () => {
    const wrapper = mount(<FilterBox />);
    await wrapper.setProps();
  });

  expect(Api.get).toHaveBeenCalled();
});

test('filterbox:set metalistingsdata called no metalisting data', async () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: {},
  });
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: {},
  });

  FilterBox.loadMetaListingData = jest.fn().mockResolvedValue({ data: {} });
  await act(async () => {
    const wrapper = mount(<FilterBox />);
    await wrapper.setProps();
  });

  expect(Api.get).toHaveBeenCalled();
});

const metaListingsDataFull = {
  maxListingsPerHost: 327,
  maxPrice: 9999,
  minListingsPerHost: 1,
  minPrice: 0,
  neighbourhoods: (5)[
    ('Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bronx')
  ],
  numOfListings: 9705,
  roomTypes: (3)[('Private room', 'Entire home/apt', 'Shared room')],
};

const metaListingsDataIncomplete = {
  maxListingsPerHost: 327,
  minListingsPerHost: 1,
  minPrice: 0,
  numOfListings: 9705,
};
