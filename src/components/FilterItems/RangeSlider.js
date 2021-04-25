import { useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';

const RangeSlider = ({ min, max, valueA, valueB, propagateValue }) => {
  const [range, setRange] = useState([valueA, valueB]);
  const [debouncedRange, setDebouncedRange] = useState([valueA, valueB]);

  const rangeText = (range) => {
    return `${range}$`;
  };

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
    <>
      <Slider
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={rangeText}
        min={min}
        max={max}
      />
    </>
  );
};

export default RangeSlider;
