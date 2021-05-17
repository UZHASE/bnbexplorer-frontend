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
test('SimpleSlider, no demarcations', () => {
  const { container } = render(<SimpleSlider {...simpleSliderProps} />);
  expect(
    screen.getByTestId(`simple-slider-${simpleSliderProps.name}`)
  ).toBeInTheDocument();
  const marks = container.getElementsByClassName('MuiSlider-mark');
  expect(marks.length).toEqual(0);
});

test('SimpleSlider, with demarcations', () => {
  const temp = simpleSliderProps;
  temp.enableMarks = true;
  const { container } = render(<SimpleSlider {...temp} />);
  const marks = container.getElementsByClassName('MuiSlider-mark');
  // expect one mark for each value "step"
  const expectedNrOfMarks = temp.max - temp.min + 1;
  expect(marks.length).toEqual(expectedNrOfMarks);
});

test('SimpleSlider, no text', () => {
  const temp = simpleSliderProps;
  delete temp.text;
  render(<SimpleSlider {...temp} />);
  const textHolder = screen.queryByTestId(`simple-slider-${temp.name}-slider`);
  expect(textHolder).not.toBeInTheDocument();
});
