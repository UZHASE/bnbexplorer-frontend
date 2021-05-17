import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import RangeSlider from '../components/FilterItems/RangeSlider';

// setup

// mock data
const propagationHandler = () => {
  console.log("propagation Handler ('RangeSlider.test.js') was called");
};

const rangeSliderProps = {
  min: 0,
  max: 500,
  valueA: 50,
  valueB: 100,
  propagateValue: propagationHandler,
  text: 'Sample Value Label',
  name: 'sample',
};

// tests
test('RangeSlider static render', () => {
  render(<RangeSlider {...rangeSliderProps} />);
  expect(
    screen.getByTestId(`range-slider-${rangeSliderProps.name}`)
  ).toBeInTheDocument();
});
