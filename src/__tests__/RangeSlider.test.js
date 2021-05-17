import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import RangeSlider from '../components/FilterItems/RangeSlider';
import { RANGEMAX } from '../constants/filterSettings';

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

test('RangeSlider, no text', () => {
  const temp = rangeSliderProps;
  delete temp.text;
  render(<RangeSlider {...temp} />);
  // verify the typography component was not rendered
  expect(
    screen.queryByTestId(`range-slider-${temp.name}-label`)
  ).not.toBeInTheDocument();
});

test('RangeSlider, upper value is rangemax', () => {
  // somewhat convoluted due to traversing Mui components
  const temp = rangeSliderProps;
  temp.valueB = RANGEMAX;
  render(<RangeSlider {...temp} />);

  const valueHolder = screen.queryAllByText(`${RANGEMAX}+`);
  // expect only 1 value holder to be found for this particular string
  expect(valueHolder.length).toEqual(1);
  // expect it to not be null
  expect(valueHolder[0]).not.toBeNull();
});
