import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import App from '../App';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText('BnB explorer');
  expect(linkElement).toBeInTheDocument();
});
