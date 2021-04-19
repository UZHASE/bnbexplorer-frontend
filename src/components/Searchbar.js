import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Searchbar = (props) => {
  /*
  use term debouncing, such that only a request is sent, when the user stops typing for one second
   */

  const [val, setVal] = useState('');
  const [debouncedVal, setDebouncedVal] = useState('');
  const { setResults, url } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(url); //TODO check what we will search)
      setResults(data.filter((e) => e.area === 'Chinatown')); //TODO adjust
    };
    if (val) search();
  }, [debouncedVal]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};
export default Searchbar;
