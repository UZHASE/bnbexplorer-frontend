import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import RangeSlider from './FilterItems/RangeSlider';

// TODO: maybe set default filters with a low/high min-nights or price to have fewer initial points at the start, whilst
// 	keeping them somewhat distributed over the entire map

/*
TODO:
- ranged slider (min/max price)
- slider (min nights, availability (0-365)
- selectors (roomtype, location, area,  numberOfListings per host)
- textSearch (host, listing)
 */

const FilterBox = ({ listings, setFilters }) => {
  const [priceRange, setPriceRange] = useState([50, 100]);

  useEffect(() => {
    const filterSettings = {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    };
    setFilters(filterSettings);
  }, [priceRange]);

  const priceRangeProps = {
    // TODO dynamic values
    min: 0,
    // min: getMinPrice(),
    max: 180,
    // max: getMaxPrice(),
    valueA: 50,
    valueB: 100,
    propagateValue: setPriceRange,
  };

  // TODO: refactor title as optional render into the different filter-components
  return (
    <>
      <Typography variant={'overline'}>Price Range</Typography>
      <RangeSlider {...priceRangeProps} />
    </>
  );
};

export default FilterBox;
