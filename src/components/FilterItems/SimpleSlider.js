import React, { useEffect, useRef, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';

/**
 * A reusable slider component that contains term debouncing to propagate its value.
 *
 * @component
 * @prop {number} min
 * @prop {number} max
 * @prop {number} initialValue
 * @prop {func} propagateValue A function handler to propagate values changes to the parent
 * @prop {string} [text] Label of the slider
 * @prop {boolean} [enableMarks] If marks are to be shown
 * @prop {func} [scale] A function to determine the relation between the values to be shown and the marks (only applicable if marks are present)
 * @prop {string} name Name of the attribute which will be propagated to its parent component
 * @prop {number | string} id a particular ID
 */
const SimpleSlider = (props) => {
  const {
    min,
    max,
    initialValue,
    propagateValue,
    text,
    enableMarks = false,
    scale = (x) => x,
    name,
    id,
  } = props;
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const ref = useRef(false); //prevents a rerender on mount

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
