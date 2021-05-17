import { render, screen } from '@testing-library/react';
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

test('filterbox changesettings', async () => {
  jest.spyOn(Api, 'get').mockResolvedValueOnce({
    data: res,
  });

  FilterBox.loadMetaListingData = jest.fn().mockResolvedValue({ data: res });

  const wrapper = mount(<FilterBox />);
  await wrapper.setProps();
  await wrapper.update()
  const p = wrapper
});


const res = {
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
