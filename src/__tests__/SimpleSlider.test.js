import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import SimpleSlider from '../components/FilterItems/SimpleSlider';

// MOCK DATA
const propagationHandler = () => {
  // just an empty handler, basically
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

// TESTS
test('SimpleSlider, no demarcations', () => {
  /*
  test designed to verify that no marks are rendered on the Mui Slider component if
  the prop 'enableMarks' is set to false. Also verifies whether slider renders at all.
   */
  const { container } = render(<SimpleSlider {...simpleSliderProps} />);

  // verify if basic slider is rendered at all
  expect(
    screen.getByTestId(`simple-slider-${simpleSliderProps.name}`)
  ).toBeInTheDocument();

  // get a list of all marks and verify that none are present
  const marks = container.getElementsByClassName('MuiSlider-mark');
  expect(marks.length).toEqual(0);
});

test('SimpleSlider, with demarcations', () => {
  /*
  test designed to verify that marks are rendered on the Mui Slider component if the
  prop 'enableMarks' is set to true.
   */
  const temp = simpleSliderProps;

  // modify mocked props by toggling the marks
  temp.enableMarks = true;
  const { container } = render(<SimpleSlider {...temp} />);

  // get a list of all marks
  const marks = container.getElementsByClassName('MuiSlider-mark');
  // expect one mark for each value "step"
  const expectedNrOfMarks = temp.max - temp.min + 1;
  // verify that the number of marks found matches the expectation
  expect(marks.length).toEqual(expectedNrOfMarks);
});

test('SimpleSlider, no text', () => {
  /*
  The labels (title basically) of a slider is optional. This test verifies that the 
  component rendering the label is not present, if no text provided in the props.
   */
  const temp = simpleSliderProps;

  // modify mocked props by deleting the text
  delete temp.text;
  render(<SimpleSlider {...temp} />);

  // query for the HTML element that would hold the label and verify that it is not found
  const textHolder = screen.queryByTestId(`simple-slider-${temp.name}-slider`);
  expect(textHolder).not.toBeInTheDocument();
});
