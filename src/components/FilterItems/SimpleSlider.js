import React, { useEffect, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';

const SimpleSlider = ({
  min,
  max,
  initialValue,
  propagateValue,
  text,
  enableMarks = false,
  scale = (x) => x,
}) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const handleValueChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    if (value) propagateValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={'simple-slider'}>
      {text ? <Typography variant={'overline'}>{text}</Typography> : null}
      <Slider
        value={value}
        onChange={handleValueChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        marks={enableMarks}
        scale={scale}
      />
    </div>
  );
};

export default SimpleSlider;
