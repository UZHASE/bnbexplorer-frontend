import { act, render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import App from '../App';
import { mount } from 'enzyme';
import React from 'react';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

const listingsData = [
  { id: 15341, latitude: 40.7221, longitude: -73.99775 },
  { id: 17037, latitude: 40.72162, longitude: -73.98008 },
  { id: 18127, latitude: 40.72828, longitude: -73.98801 },
];

test('renders header', () => {
  //test that when the app component gets mounted, that the header is rendered with the text
  //if this test fails, there is a major issue with the app
  render(<App />);
  const linkElement = screen.getByText('BnB explorer');
  expect(linkElement).toBeInTheDocument();
});

test('Does not get listings if no filter settings are present', () => {
  //filter setting set the API call, so if none are present the App should not try to load listings
  //i.e. the function should not be called.
  App.loadListingsData = jest.fn().mockResolvedValue({ data: listingsData });

  act(() => {
    const wrapper = mount(<App />);
    wrapper.setProps();
  });
  expect(App.loadListingsData).not.toHaveBeenCalled();
});
