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
} from '../constants/filterSettings';
import SimpleSelect from './FilterItems/SimpleSelect';
import { CircularProgress } from '@material-ui/core';
import Api from '../lib/Http/Api';
import Log from '../services/helper/Log';
import { calculateReverseScale } from '../services/filterService';

const FilterBox = ({ listings, setFilters }) => {
  const Logger = new Log('FilterBox.js');

  const [filterSettings, setFilterSettings] = useState(DEFAULT_FILTER_SETTINGS);
  const [metaListingsData, setMetaListingsData] = useState({});

  useEffect(() => {
    const loadMetaListingData = async () => {
      const response = await Api.get('listings/metadata');
      Logger.log(response);
      setMetaListingsData(response.data);
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
      // destructure array
      temp = {
        ...temp,
        ['priceMin']: value[0],
        ['priceMax']: getMaxPrice(value[1]),
      };
    } else if (name === 'location' || name === 'roomType') {
      temp = {
        ...temp,
        [name]: value.join(','),
      };
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
    valueA: filterSettings.priceMin,
    valueB: filterSettings.priceMax,
    text: 'Price Range (' + CURRENCY + ')',
    name: 'priceRange',
  };

  const minNightsProps = {
    ...defaultProps,
    min: 1,
    max: 9,
    initialValue: calculateReverseScale(filterSettings.minNights),
    text: 'Min. number of nights',
    enableMarks: DURATION_MARKS(),
    scale: (x) => DURATION_SCALE[x],
    name: 'minNights',
  };

  const availabilityProps = {
    ...defaultProps,
    min: 1,
    max: 9,
    initialValue: calculateReverseScale(filterSettings.availability),
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
    name: 'location',
  };

  const roomTypeProps = {
    ...defaultProps,
    values:
      metaListingsData && metaListingsData.roomTypes
        ? metaListingsData.roomTypes
        : [],
    text: 'Room Types',
    name: 'roomType',
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
          <SimpleSelect {...roomTypeProps} />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FilterBox;
