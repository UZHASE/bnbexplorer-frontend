import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { configure } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds
import Searchbar from '../components/Searchbar';
import { TextField } from '@material-ui/core';

let propagatedValue = null;

const searchBarProps = {
  onSearchValueChange: (val) => {
    propagatedValue = val;
    console.log('received value from searchbar:', propagatedValue);
  },
};

test('renders searchbar', () => {
  render(<Searchbar />);
  expect(screen.getByTestId('searchbar-component')).toBeInTheDocument();
});

test('renders searchbar with props', () => {
  const wrapper = mount(<Searchbar {...searchBarProps} />);
  console.log(wrapper.find(TextField).debug()); // TODO CLEANUP

  const input = wrapper.find(TextField).find('input');
  const event = { target: { value: 'test value' } };

  act(() => {
    input.prop('onChange').call(null, event);
  });

  wrapper.find(TextField).prop('onChange').call(null, event);


  console.log(wrapper.find(TextField).debug()); // TODO CLEANUP

  // act(() => {
  //   input.simulate('focus');
  //   input.props().onChange({
  //     target: { value: 'test value changed' },
  //   });
  //   input.simulate('change');
  //   input.simulate('blur');
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
