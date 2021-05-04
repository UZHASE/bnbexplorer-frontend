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
import Api from '../lib/Http/Api';
import Log from '../services/helper/Log';

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
  const Logger = new Log('FilterBox.js');

  const [filterSettings, setFilterSettings] = useState(DEFAULT_FILTER_SETTINGS);
  const [metaListingsData, setMetaListingsData] = useState({});

  useEffect(() => {
    const loadMetaListingData = async () => {
      const metaListingsData = await Api.get('listings/metadata');
      Logger.log(metaListingsData);
      setMetaListingsData(metaListingsData.data);
    };
    loadMetaListingData();
  }, []);

  const getMaxPrice = (currentPrice) => {
    return currentPrice === RANGEMAX ? metaListingsData.maxPrice : currentPrice;
  };

  const setPriceRangeMax = () => {
    return metaListingsData.maxPrice &&
      metaListingsData.maxPrice.toString().length > 3
      ? RANGEMAX
      : metaListingsData.maxPrice;
  };

  const changeSettings = (name, value) => {
    let temp = { ...filterSettings };
    if (name === 'priceRange') {
      // since returns array
      temp = {
        ...temp,
        ['minPrice']: value[0],
        ['maxPrice']: getMaxPrice(value[1]),
      };
    } else if (name === 'neighbourhoods' || name === 'roomTypes') {
      // TODO: figure out how to compose
      // https://stackoverflow.com/questions/52482203/axios-multiple-values-comma-separated-in-a-parameter TODO
    } else if (name === 'availability' || name === 'minNights') {
      temp = {
        ...temp,
        [name]: DURATION_SCALE[value],
      };
    } else {
      temp = {
        ...temp,
        [name]: value,
      };
    }
    setFilterSettings(temp);
    setFilters(temp);
  };

  const defaultProps = {
    propagateValue: changeSettings,
  };

  const priceRangeProps = {
    ...defaultProps,
    min: metaListingsData.minPrice,
    max: setPriceRangeMax(),
    valueA: filterSettings.minPrice,
    valueB: filterSettings.maxPrice,
    text: 'Price Range (' + CURRENCY + ')',
    name: 'priceRange',
  };

  const minNightsProps = {
    ...defaultProps,
    min: 1,
    max: 9,
    initialValue: filterSettings.minDuration,
    text: 'Min. number of nights',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
    name: 'minNights',
  };

  const availabilityProps = {
    ...defaultProps,
    min: 1,
    max: 9,
    initialValue: filterSettings.minDuration,
    text: 'Min. Availability',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
    name: 'availability',
  };

  const listingsPerHostProps = {
    ...defaultProps,
    min: 1,
    max: 10,
    initialValue: filterSettings.listingsPerHost,
    text: 'Min. Number of listings per host',
    name: 'listingsPerHost',
  };

  const neighbourhoodProps = {
    ...defaultProps,
    values:
      metaListingsData && metaListingsData.neighbourhoods
        ? metaListingsData.neighbourhoods
        : [],
    text: 'Neighbourhoods',
    name: 'neighbourhoods',
  };

  const roomTypeProps = {
    ...defaultProps,
    values:
      metaListingsData && metaListingsData.roomTypes
        ? metaListingsData.roomTypes
        : [],
    text: 'Room Types',
    name: 'roomTypes',
  };

  console.log(filterSettings);

  return (
    <>
      {metaListingsData && !_.isEmpty(metaListingsData) ? (
        <>
          <RangeSlider {...priceRangeProps} />
          <SimpleSlider {...minNightsProps} />
          <SimpleSlider {...availabilityProps} />
          <SimpleSlider {...listingsPerHostProps} />
          <SimpleSelect {...neighbourhoodProps} />
          <SimpleSelect {...roomTypeProps} />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FilterBox;
