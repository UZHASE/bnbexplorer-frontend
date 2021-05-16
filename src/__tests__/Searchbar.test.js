import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import App from '../App';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

test('renders searchbar', () => {
  render(<App />);
  expect(screen.getByTestId('searchbar-component')).toBeInTheDocument();
});
