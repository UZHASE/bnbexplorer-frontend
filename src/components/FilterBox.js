import { useEffect, useState } from 'react';
import RangeSlider from './FilterItems/RangeSlider';
import SimpleSlider from './FilterItems/SimpleSlider';
import {
  DEFAULT_FILTER_SETTINGS,
  MIN_NIGHT_MARKS,
  MIN_NIGHT_SCALE,
} from '../constants/FilterSettings';

// TODO: maybe set default filters with a low/high min-nights or price to have fewer initial points at the start, whilst
// 	keeping them somewhat distributed over the entire map

/*
TODO:
- ranged slider (min/max price) - DONE
- slider (min nights, availability (0-365), numberOfListings per host)
- selectors (roomtype, location, area)
- textSearch (host, listing)
 */

const FilterBox = ({ listings, setFilters }) => {
  const [priceRange, setPriceRange] = useState([
    DEFAULT_FILTER_SETTINGS.minPrice,
    DEFAULT_FILTER_SETTINGS.maxPrice,
  ]);
  const [minNights, setMinNights] = useState(DEFAULT_FILTER_SETTINGS.minNights);

  useEffect(() => {
    const filterSettings = {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      minNights: minNights,
    };
    setFilters(filterSettings);
  }, [priceRange, minNights]);

  const priceRangeProps = {
    // TODO dynamic values
    min: 0,
    // min: getMinPrice(listings),
    max: 180,
    // max: listings ? getMaxPrice(listings) : 180,
    valueA: DEFAULT_FILTER_SETTINGS.minPrice,
    valueB: DEFAULT_FILTER_SETTINGS.maxPrice,
    propagateValue: setPriceRange,
    text: 'Price Range ($)',
  };

  const minNightsProps = {
    min: 1,
    max: 9,
    initialValue: DEFAULT_FILTER_SETTINGS.minNights,
    propagateValue: setMinNights,
    text: 'Min. number of nights',
    enableMarks: MIN_NIGHT_MARKS(),
    scale: (x) => MIN_NIGHT_SCALE[x],
  };

  return (
    <>
      <RangeSlider {...priceRangeProps} />
      <SimpleSlider {...minNightsProps} />
    </>
  );
};

export default FilterBox;
