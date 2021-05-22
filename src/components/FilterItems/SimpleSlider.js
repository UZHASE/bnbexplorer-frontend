import React, { useEffect, useRef, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';

const SimpleSlider = ({
  min,
  max,
  initialValue,
  propagateValue,
  text,
  enableMarks = false,
  scale = (x) => x,
  name,
  id,
}) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const ref = useRef(false);

  const handleValueChange = (event, val) => {
    setValue(val);
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
    if (value && ref.current) {
      propagateValue(name, debouncedValue);
    } else {
      ref.current = true;
    }
  }, [debouncedValue]);

  return (
    <div className={'simple-slider'} id={`simple-slider-${name}`}>
      {text ? (
        <Typography id={`simple-slider-${name}-slider`} variant={'overline'}>
          {text}
        </Typography>
      ) : null}
      <Slider
        value={value}
        onChange={handleValueChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        marks={enableMarks}
        scale={scale}
        id={id}
      />
    </div>
  );
};

export default SimpleSlider;
