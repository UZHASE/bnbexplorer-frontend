import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

/**
 * A searchbar component that includes term debouncing to propagate to its parent component,
 * i.e. only when the user has stopped typing for 500ms the term is propagated further.
 *
 * @component
 * @prop {function} onSearchValueChange A function handler to propagate the value
 */
const Searchbar = (props) => {
  const { onSearchValueChange } = props;
  const [val, setVal] = useState('');
  const [debouncedVal, setDebouncedVal] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  useEffect(() => {
    if (onSearchValueChange) onSearchValueChange(debouncedVal);
  }, [debouncedVal]);

  return (
    <TextField
      id='searchbar-component-input'
      fullWidth
      variant='outlined'
      placeholder='Search'
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};
export default Searchbar;
