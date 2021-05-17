import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import SimpleSlider from '../components/FilterItems/SimpleSlider';

// setup

// mock data
const propagationHandler = () => {
  console.log("propagation Handler ('SimpleSlider.test.js') was called");
};

const simpleSliderProps = {
  min: 1,
  max: 10,
  initialValue: 3,
  propagateValue: propagationHandler,
  text: 'some label',
  enableMarks: false,
  name: 'name',
  id: 'sample',
};

// tests
test('SimpleSlider static render, no demarcations', () => {
  render(<SimpleSlider {...simpleSliderProps} />);
  expect(
    screen.getByTestId(`simple-slider-${simpleSliderProps.name}`)
  ).toBeInTheDocument();
});
