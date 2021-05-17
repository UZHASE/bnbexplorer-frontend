import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual IDs available as testIds
import SimpleSelect, {
  getStyles,
} from '../components/FilterItems/SimpleSelect';
import { useTheme } from '@material-ui/core/styles';

// mock components / constants
const typographyFontWeightRegular = '400';
const typographyFontWeightMedium = '500';

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

test('SimpleSelect static render, no text', () => {
  const temp = simpleSelectProps;
  delete temp.text;
  render(<SimpleSelect {...temp} />);
  expect(screen.getByTestId(`multi-select-${temp.name}`)).toBeInTheDocument();
});

test('getStyles condition test, no index match found', () => {
  // simulate case where value is not found in values, hence no index match
  // easiest way to do with a fake react component, since not possible to test function
  // by its own, will result in 'invalid hook call'
  render(
    <DummyComponent
      falseValue={'value not in values'}
      values={simpleSelectProps.values}
    />
  );

  const spanElement = screen.getByTestId('dummy-component-span');
  expect(spanElement).toBeInTheDocument();
  const detectedFontWeight = spanElement.style.fontWeight;
  expect(detectedFontWeight).toEqual(typographyFontWeightRegular);
});

test('getStyles condition test, has index match', () => {
  // somewhat unnecessary, as already covered by static render, but for completeness
  // a standalone test of the getStyles function
  render(
    <DummyComponent
      falseValue={simpleSelectProps.values[0]}
      values={simpleSelectProps.values}
    />
  );

  const spanElement = screen.getByTestId('dummy-component-span');
  expect(spanElement).toBeInTheDocument();
  const detectedFontWeight = spanElement.style.fontWeight;
  expect(detectedFontWeight).toEqual(typographyFontWeightMedium);
});