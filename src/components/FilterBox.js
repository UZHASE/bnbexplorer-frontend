import { useEffect, useState } from 'react';
import RangeSlider from './FilterItems/RangeSlider';
import SimpleSlider from './FilterItems/SimpleSlider';
import {
  DEFAULT_FILTER_SETTINGS,
  DURATION_MARKS,
  DURATION_SCALE,
} from '../constants/FilterSettings';

// TODO: maybe set default filters with a low/high min-nights or price to have fewer initial points at the start, whilst
// 	keeping them somewhat distributed over the entire map

/*
TODO:
- ranged slider (min/max price) - DONE
- slider (min nights, availability (0-365), numberOfListings per host) - DONE-ish
- selectors (roomtype, location, area)
- textSearch (host, listing)
 */

const FilterBox = ({ listings, setFilters }) => {
  const [priceRange, setPriceRange] = useState([
    DEFAULT_FILTER_SETTINGS.minPrice,
    DEFAULT_FILTER_SETTINGS.maxPrice,
  ]);
  const [minNights, setMinNights] = useState(
    DEFAULT_FILTER_SETTINGS.minDuration
  );
  const [availability, setAvailability] = useState(
    DEFAULT_FILTER_SETTINGS.minDuration
  );
  const [listingsPerHost, setListingsPerHost] = useState();

  useEffect(() => {
    // NOTE: availability and minNights share scales
    const filterSettings = {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      minNights: DURATION_SCALE[minNights],
      availability: DURATION_SCALE[availability],
      listingsPerHost: listingsPerHost,
    };
    setFilters(filterSettings);
  }, [priceRange, minNights, availability, listingsPerHost]);

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
    initialValue: DEFAULT_FILTER_SETTINGS.minDuration,
    propagateValue: setMinNights,
    text: 'Min. number of nights',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
  };

  const availabilityProps = {
    min: 1,
    max: 9,
    initialValue: DEFAULT_FILTER_SETTINGS.minDuration,
    propagateValue: setAvailability,
    text: 'Availability',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
  };

  const listingsPerHostProps = {
    min: 1,
    max: 10, // TODO: wait for endpoint
    initialValue: 1,
    propagateValue: setListingsPerHost,
    text: 'Number of listings per host',
    // TODO: enableMarks scale etc. if needed
  };

  return (
    <>
      <RangeSlider {...priceRangeProps} />
      <SimpleSlider {...minNightsProps} />
      <SimpleSlider {...availabilityProps} />
      <SimpleSlider {...listingsPerHostProps} />
    </>
  );
};

export default FilterBox;
