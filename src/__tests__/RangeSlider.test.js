import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import RangeSlider from '../components/FilterItems/RangeSlider';
import { RANGEMAX } from '../constants/filterSettings';

// MOCK DATA
const propagationHandler = () => {
  // basically an empty handler
  console.log("propagation Handler ('RangeSlider.test.js') was called");
};

const rangeSliderProps = {
  // static mock props
  min: 0,
  max: 500,
  valueA: 50,
  valueB: 100,
  propagateValue: propagationHandler,
  text: 'Sample Value Label',
  name: 'sample',
};

// TESTS
test('RangeSlider static render', () => {
  /*
  This test verifies whether the 'RangeSlider' can be rendered, given the full set
  of props.
   */
  render(<RangeSlider {...rangeSliderProps} />);
  expect(
    screen.getByTestId(`range-slider-${rangeSliderProps.name}`)
  ).toBeInTheDocument();
});

test('RangeSlider, no text', () => {
  /*
  This test verifies whether the 'RangeSlider' can be rendered, given the absence
  of the optional prop 'text'
   */
  const temp = rangeSliderProps;
  // remove text prop
  delete temp.text;
  render(<RangeSlider {...temp} />);
  // verify the typography component (which would display the text) was not rendered
  expect(
    screen.queryByTestId(`range-slider-${temp.name}-label`)
  ).not.toBeInTheDocument();
});

test('RangeSlider, upper value is rangemax', () => {
  /*
  To give some context: for visual clarity and keeping the RangeSlider functional,
  the values shown to the user are capped at a value called 'RANGEMAX'. This is to
  maintain granularity / accuracy when setting the upper and lower bounds of the prices
  (Imagine a slider ranging from 1 to the true maximum (e.g. 5000). This slider would
  be poor to control if you were interested in the range of 1 to 60).
  If 'RANGEMAX' is the value of the RangeSlider, then the value label has a '+' appended
  to indicate to the user that the range is not open at the upper end.

  This test then verifies this case. The case where it is below 'RANGEMAX' is already
  covered by the first test ('RangeSlider static render') in this suite.
   */

  const temp = rangeSliderProps;
  // set upper value to 'RANGEMAX'
  temp.valueB = RANGEMAX;
  render(<RangeSlider {...temp} />);

  // verify whether the proper label is shown
  const valueHolder = screen.queryAllByText(`${RANGEMAX}+`);
  // expect only 1 value holder to be found for this particular string
  expect(valueHolder.length).toEqual(1);
  // expect it to not be null
  expect(valueHolder[0]).not.toBeNull();
});
