import { getByTestId, render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import Searchbar from '../components/Searchbar';
import userEvent from '@testing-library/user-event';

configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds

// SETUP
let container;

/*
The second test in the suite relies on a container setup, hence the beforeEach and
afterEach to perform this setup (in case in the future additional tests will use
the same setup.
 */
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// TESTS
test('renders searchbar', () => {
  /*
  This test verifies whether the 'Searchbar' component can be rendered on its own
  (no props required for this component)
   */
  render(<Searchbar />);
  expect(screen.getByTestId('searchbar-component-input')).toBeInTheDocument();
});

test('renders searchbar with input changes', async () => {
  /*
  This test verifies whether value changes to the 'Searchbar' are registered.
   */
  const { container } = render(<Searchbar />);
  const input = getByTestId(container, 'searchbar-component-input');
  // test for default value
  expect(input.value === '');
  // value modification event
  await userEvent.type(
    getByTestId(container, 'searchbar-component-input'),
    'test value',
  );
  // expect new value
  expect(input.value === 'test value');
});
