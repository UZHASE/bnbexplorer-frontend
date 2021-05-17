import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import SimpleSelect from '../components/FilterItems/SimpleSelect';

// setup

// mock data
const propagationHandler = () => {
  console.log("propagation Handler ('SimpleSelect.test.js') was called");
};

const simpleSelectProps = {
  values: ['value 1', 'value 2', 'value 3', 'value 4'],
  text: 'some label',
  propagateValue: propagationHandler,
  name: 'name',
};

// tests
test('SimpleSelect static render', () => {
  render(<SimpleSelect {...simpleSelectProps} />);
  expect(
    screen.getByTestId(`multi-select-${simpleSelectProps.name}`)
  ).toBeInTheDocument();
});
