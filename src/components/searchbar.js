import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

const Searchbar = (props) => {
  const [val, setVal] = useState('');
  const { doSearch } = props;

  const setSearch = (e) => {
    const st = e.target.value;
    setVal(st);
    doSearch(st);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={val}
      onChange={setSearch}
    />
  );
};
export default Searchbar;
