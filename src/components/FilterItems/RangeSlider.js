import React, { useEffect, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';

const RangeSlider = ({ min, max, valueA, valueB, propagateValue, text }) => {
  const [range, setRange] = useState([valueA, valueB]);
  const [debouncedRange, setDebouncedRange] = useState([valueA, valueB]);

  const handleRangeChange = (event, value) => {
    setRange(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRange(range);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [range]);

  useEffect(() => {
    if (range) propagateValue(debouncedRange);
  }, [debouncedRange]);

  return (
    <div className={'range-slider'}>
      {text ? <Typography variant={'overline'}>{text}</Typography> : null}
      <Slider
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
      />
    </div>
  );
};

export default RangeSlider;
