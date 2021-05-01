import { useEffect, useState } from 'react';
import _ from 'lodash';
import RangeSlider from './FilterItems/RangeSlider';
import SimpleSlider from './FilterItems/SimpleSlider';
import {
  CURRENCY,
  DEFAULT_FILTER_SETTINGS,
  DURATION_MARKS,
  DURATION_SCALE,
  RANGEMAX,
} from '../constants/FilterSettings';
import SimpleSelect from './FilterItems/SimpleSelect';
import { CircularProgress } from '@material-ui/core';

// TODO: maybe set default filters with a low/high min-nights or price to have fewer initial points at the start, whilst
// 	keeping them somewhat distributed over the entire map

/*
TODO:
- ranged slider (min/max price) - DONE
- slider (min nights, availability (0-365), numberOfListings per host) - DONE-ish
- selectors (roomtype, location, area)
- textSearch (host, listing)
 */

const FilterBox = ({ listings, setFilters, metaListingsData }) => {
  const [priceRange, setPriceRange] = useState([
    DEFAULT_FILTER_SETTINGS.minPrice,
    DEFAULT_FILTER_SETTINGS.maxPrice,
  ]);

  // prettier-ignore
  const [minNights, setMinNights] = useState(
    DEFAULT_FILTER_SETTINGS.minDuration
  );
  // prettier-ignore
  const [availability, setAvailability] = useState(
    DEFAULT_FILTER_SETTINGS.minDuration
  );

  const [listingsPerHost, setListingsPerHost] = useState();

  const [neighbourhoods, setNeighbourhoods] = useState();

  const getMaxPrice = (currentPrice) => {
    return currentPrice === RANGEMAX ? metaListingsData.maxPrice : currentPrice;
  };

  const setPriceRangeMax = () => {
    return metaListingsData.maxPrice &&
      metaListingsData.maxPrice.toString().length > 3
      ? RANGEMAX
      : metaListingsData.maxPrice;
  };

  useEffect(() => {
    // NOTE: availability and minNights share scales
    // console.log('neighb', neighbourhoods);
    // const t = neighbourhoods
    //   ? neighbourhoods.map((e) => {
    //       return { neighbourhood: e };
    //     })
    //   : {};
    // Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
    // const f = t ? new URLSearchParams(neighbourhoods).toString() : '';
    // https://stackoverflow.com/questions/52482203/axios-multiple-values-comma-separated-in-a-parameter TODO
    const filterSettings = {
      priceMin: priceRange[0],
      priceMax: getMaxPrice(priceRange[1]),
      minNights: DURATION_SCALE[minNights],
      availability: DURATION_SCALE[availability],
      listingsPerHost,
    };

    console.log('filtersettings', filterSettings);
    setFilters(filterSettings);
  }, [priceRange, minNights, availability, listingsPerHost, neighbourhoods]);

  const priceRangeProps = {
    min: metaListingsData.minPrice,
    max: setPriceRangeMax(),
    valueA: DEFAULT_FILTER_SETTINGS.minPrice,
    valueB: DEFAULT_FILTER_SETTINGS.maxPrice,
    propagateValue: setPriceRange,
    text: 'Price Range (' + CURRENCY + ')',
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
    text: 'Min. Availability',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
  };

  const listingsPerHostProps = {
    min: 1,
    max: 10,
    initialValue: 1,
    propagateValue: setListingsPerHost,
    text: 'Min. Number of listings per host',
  };

  const neighbourhoodProps = {
    values:
      metaListingsData && metaListingsData.neighbourhoods
        ? metaListingsData.neighbourhoods
        : [],
    text: 'Neighbourhoods',
    propagateValue: setNeighbourhoods,
  };
  return (
    <>
      {metaListingsData && !_.isEmpty(metaListingsData) ? (
        <>
          <RangeSlider {...priceRangeProps} />
          <SimpleSlider {...minNightsProps} />
          <SimpleSlider {...availabilityProps} />
          <SimpleSlider {...listingsPerHostProps} />
          <SimpleSelect {...neighbourhoodProps} />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FilterBox;
