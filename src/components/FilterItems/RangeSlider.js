import React, { useEffect, useRef, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { RANGEMAX } from '../../constants/filterSettings';

/**
 * A reusable range-slider component. It contains two movable marks
 * that define the range and uses term debouncing to propagate the value.
 *
 * @component
 * @prop {number} min
 * @prop {number} max
 * @prop {number} valueA Initial lower value
 * @prop {number} valueB Initial higher value
 * @prop {func} propagateValue A function handler to propagate values changes to the parent
 * @prop {string} [text] Label of the slider
 * @prop {string} name Name of the attribute which will be propagated to its parent component
 */
const RangeSlider = (props) => {
  const { min, max, valueA, valueB, propagateValue, text, name } = props;
  const [range, setRange] = useState([valueA, valueB]);
  const [debouncedRange, setDebouncedRange] = useState([valueA, valueB]);
  const ref = useRef(false); //prevents a rerender on mount
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
    //if value equals rangemax render it with a +
    // to indicate that the range is not limited at the top end.
    // (Due to the slider, the value cannot be larger than rangemax)
    return value === RANGEMAX ? <div>{`${value}+`}</div> : <div>{value}</div>;
  };

  return (
    <div className={'range-slider'} id={`range-slider-${name}`}>
      {text ? (
        <Typography id={`range-slider-${name}-label`} variant={'overline'}>
          {text}
        </Typography>
      ) : null}
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
