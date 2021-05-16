import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import FilterBox from '../components/FilterBox';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

test('No data renders CircularProgress', () => {
  render(<FilterBox />);
  const linkElement = screen.getByTestId('circularProgress-FilterBox');
  expect(linkElement).toBeInTheDocument();
});
