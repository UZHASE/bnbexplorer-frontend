import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import SimpleSelect, {
  getStyles,
} from '../components/FilterItems/SimpleSelect';
import { useTheme } from '@material-ui/core/styles';

// MOCK COMPONENTS / CONSTANTS
// Mui font-weights for typography component
const typographyFontWeightRegular = '400';
const typographyFontWeightMedium = '500';

/*
the way the the function 'getStyles' is set up, it requires an input for the
parameter 'theme' that is generates by 'useTheme()', which is only available on
a react component. Hence this DummyComponent to provide access to 'useTheme' and
thus the ability to properly call 'getStyles'.

Furthermore, the value index check performed in 'getStyles' has one condition where
the value is not found, which is difficult to test since 'SimpleSelect' does not give
separate control over the value that is searched for in the values prop and the component
is functional, hence its state cannot be set without an extensive setup.

This 'DummyComponent' then avoids overly complex setup involving the actual 'SimpleSelect' component.
 */
const DummyComponent = ({ falseValue, values }) => {
  const theme = useTheme();
  return (
    <div>
        <span
          id='dummy-component-span'
          style={getStyles(falseValue, values, theme)}
        >
          dummy component text
        </span>
    </div>
  );
};

// MOCK DATA
const propagationHandler = () => {
  // basically an empty handler
  console.log("propagation Handler ('SimpleSelect.test.js') was called");
};

const simpleSelectProps = {
  // static mock props
  values: ['value 1', 'value 2', 'value 3', 'value 4'],
  text: 'some label',
  propagateValue: propagationHandler,
  name: 'name',
};

// TESTS
test('SimpleSelect static render', () => {
  /*
  This test verifies whether the 'SimpleSelect' component can render given the
  full set of props.
   */
  render(<SimpleSelect {...simpleSelectProps} />);
  expect(
    screen.getByTestId(`multi-select-${simpleSelectProps.name}`)
  ).toBeInTheDocument();
});

test('SimpleSelect static render, no text', () => {
  /*
  This test verifies whether the 'SimpleSelect' component can still render, given the
  absence of the optional prop 'text'.
   */
  const temp = simpleSelectProps;
  delete temp.text;
  render(<SimpleSelect {...temp} />);
  expect(screen.getByTestId(`multi-select-${temp.name}`)).toBeInTheDocument();
});

test('getStyles condition test, no index match found', () => {
  /*
  This test simulates the case where a value is not found in the values prop. For the
  reasons laid out above in the comments of the 'DummyComponent', not the actual 'SimpleSelect'
  is used to test this.
  */
  render(
    <DummyComponent
      falseValue={'value not in values'}
      values={simpleSelectProps.values}
    />
  );

  // grab the 'Typography' component rendering the text and verify that its font weight
  // matches the expected case
  const spanElement = screen.getByTestId('dummy-component-span');
  expect(spanElement).toBeInTheDocument();
  const detectedFontWeight = spanElement.style.fontWeight;
  expect(detectedFontWeight).toEqual(typographyFontWeightRegular);
});

test('getStyles condition test, has index match', () => {
  /*
  Tests the 'getStyles' function for the condition where the value index check succeeds.
  Uses the 'DummyComponent' for the reasons laid out above, in the comments of said component.

  somewhat unnecessary, as already covered by static render, but for completeness
  a standalone test of the getStyles function
  */
  render(
    <DummyComponent
      falseValue={simpleSelectProps.values[0]}
      values={simpleSelectProps.values}
    />
  );

  // grab the 'Typography' component rendering the text and verify that its font weight
  // matches the expected case
  const spanElement = screen.getByTestId('dummy-component-span');
  expect(spanElement).toBeInTheDocument();
  const detectedFontWeight = spanElement.style.fontWeight;
  expect(detectedFontWeight).toEqual(typographyFontWeightMedium);
});