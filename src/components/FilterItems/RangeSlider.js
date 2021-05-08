import React, { useEffect, useRef, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { RANGEMAX } from '../../constants/filterSettings';

const RangeSlider = ({
  min,
  max,
  valueA,
  valueB,
  propagateValue,
  text,
  name,
}) => {
  const [range, setRange] = useState([valueA, valueB]);
  const [debouncedRange, setDebouncedRange] = useState([valueA, valueB]);
  const ref = useRef(false);
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
    if (range && ref.current) {
      propagateValue(name, debouncedRange);
    } else {
      ref.current = true;
    }
  }, [debouncedRange]);

  const labelReturner = (value) => {
    return value === RANGEMAX ? <div>{value}+</div> : <div>{value}</div>;
  };

  return (
    <div className={'range-slider'}>
      {text ? <Typography variant={'overline'}>{text}</Typography> : null}
      <Slider
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        valueLabelFormat={labelReturner}
      />
    </div>
  );
};

export default RangeSlider;
