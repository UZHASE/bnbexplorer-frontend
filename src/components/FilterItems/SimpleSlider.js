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
}) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const ref = useRef(false);

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
    if (value && ref.current) {
      propagateValue(name, debouncedValue);
    } else {
      ref.current = true;
    }
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
