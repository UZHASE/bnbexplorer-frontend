import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Searchbar = (props) => {
  /*
  use term debouncing, such that only a request is sent, when the user stops typing for one second
   */

  const [val, setVal] = useState('');
  const [debouncedVal, setDebouncedVal] = useState('');
  const { onSearchValueChange } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  useEffect(() => {
    onSearchValueChange(debouncedVal);
  }, [debouncedVal]);

  return (
    <TextField
      fullWidth
      variant='outlined'
      placeholder='Search'
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};
export default Searchbar;
