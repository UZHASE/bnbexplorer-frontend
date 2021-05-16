import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds
import Searchbar from '../components/Searchbar';
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom';

// simulate state of parent component to write into
let propagatedValue = null;

const searchBarProps = {
  onSearchValueChange: (val) => {
    propagatedValue = val;
    console.log('received value from searchbar:', val);
  },
};

// setup
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// ############# TESTS #########################################################

test('renders searchbar', () => {
  render(<Searchbar />);
  expect(screen.getByTestId('searchbar-component-input')).toBeInTheDocument();
});

test('renders searchbar with props', () => {
  act(() => {
    ReactDOM.render(<Searchbar {...searchBarProps} />, container);
  });

  const textField = document.querySelector('.searchbar-textfield');

  // console.log('textField findings', textField);

  const input = document.querySelector('.MuiInputBase-input');

  // console.log('input findings', input);

  // const wrapper = mount(<Searchbar {...searchBarProps} />);
  // console.log(wrapper.find(TextField).debug()); // TODO CLEANUP

  // const input = wrapper.find(TextField).find('input.MuiInputBase-input');
  // console.log(input);

  const event = { target: { value: 'test value' } };

  act(() => {
    // input.dispatchEvent(
    //   new InputEvent('input', { bubbles: true, value: 'test value' })
    // );

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.blur(input);
  });

  // console.log('input AFTER:', input);

  // act(() => {
  //   input.prop('onChange').call(null, event);
  // });
  //
  // wrapper.find(TextField).prop('onChange').call(null, event);
  //
  //
  // console.log(wrapper.find(TextField).debug()); // TODO CLEANUP

  // input.simulate('focus');
  // input.props().onChange({
  //   target: { value: 'test value changed' },
  // });
  // input.simulate('change');
  // input.simulate('blur');

  // act(() => {
  //   input.simulate('focus');
  //   input.props().onChange({
  //     target: { value: 'test value changed' },
  //   });
  //   // input.simulate('change');
  //   // input.simulate('blur');
  // });

  // wrapper.find(TextField).
  // input.simulate('focus');
  // input.simulate('change', { target: { value: 'Changed Value' } });

  // input.simulate('focus');

  // render(<Searchbar {...searchBarProps} />);
  // let searchBar = screen.getByTestId('searchbar-component');
  // expect(searchBar).toBeInTheDocument();
  //
  // searchBar.props().onChange({ target: { value: 'changed value' } });
  // searchBar.simulate('change');
  //
  // console.log('Searchbar:!!!!, after input', searchBar);
});
