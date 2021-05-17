import { getByTestId, render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import Searchbar from '../components/Searchbar';
import userEvent from '@testing-library/user-event';

configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

// setup
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('renders searchbar', () => {
  render(<Searchbar />);
  expect(screen.getByTestId('searchbar-component-input')).toBeInTheDocument();
});

test('renders searchbar with input changes', async () => {
  const { container } = render(<Searchbar />);
  const input = getByTestId(container, 'searchbar-component-input');
  expect(input.value === '');
  await userEvent.type(
    getByTestId(container, 'searchbar-component-input'),
    'test value',
  );

  expect(input.value === 'test value');
});
