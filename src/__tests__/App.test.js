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
  render(<App />);
  const linkElement = screen.getByText('BnB explorer');
  expect(linkElement).toBeInTheDocument();
});

test('Does not get listings if no filter settings are present', async () => {
  App.loadListingsData = jest.fn().mockResolvedValue({ data: listingsData });

  await act(async () => {
    const wrapper = mount(<App />);
    await wrapper.setProps();
  });
  expect(App.loadListingsData).not.toHaveBeenCalled();
});
