import { useEffect, useState } from 'react';
import _ from 'lodash';
import RangeSlider from './FilterItems/RangeSlider';
import SimpleSlider from './FilterItems/SimpleSlider';
import {
  CURRENCY,
  DEFAULT_FILTER_SETTINGS,
  DURATION_SCALE,
} from '../constants/filterSettings';
import SimpleSelect from './FilterItems/SimpleSelect';
import { CircularProgress } from '@material-ui/core';
import Api from '../lib/Http/Api';
import {
  calculateReverseScale,
  DURATION_MARKS,
} from '../services/filterService';
import {
  handleSettingsChange,
  setPriceRangeMax,
} from '../services/filterboxService';

/**
 * A parent component that contains various filter components in the form of sliders and selectors.
 *
 * @component
 * @prop {function} setFilters A function handler to propagate filter Settings from its children component to its parent component.
 */
const FilterBox = (props) => {
  const { setFilters } = props;
  const [filterSettings, setFilterSettings] = useState(DEFAULT_FILTER_SETTINGS);
  const [metaListingsData, setMetaListingsData] = useState({});

  useEffect(() => {
    const loadMetaListingData = async () => {
      const response = await Api.get('listings/metadata');
      setMetaListingsData(response.data);
    };
    loadMetaListingData();
  }, []);

  const changeSettings = (name, value) => {
    //prettier-ignore
    const newSettings = handleSettingsChange(
      name,
      value,
      filterSettings,
      metaListingsData
    );
    setFilterSettings(newSettings);
    setFilters(newSettings);
  };

  const defaultProps = {
    propagateValue: changeSettings,
  };

  const priceRangeProps = {
    ...defaultProps,
    min:
      metaListingsData && metaListingsData.minPrice
        ? metaListingsData.minPrice
        : 0,
    max: metaListingsData ? setPriceRangeMax(metaListingsData) : 100,
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
    <div id='filterbox-component'>
      {metaListingsData && !_.isEmpty(metaListingsData) ? (
        <>
          <RangeSlider {...priceRangeProps} id='pricerange-slider' />
          <SimpleSlider {...minNightsProps} />
          <SimpleSlider {...availabilityProps} />
          <SimpleSlider {...listingsPerHostProps} id='listings-slider' />
          <SimpleSelect {...neighbourhoodProps} />
          <SimpleSelect {...roomTypeProps} />
        </>
      ) : (
        <CircularProgress id='circularProgress-FilterBox' />
      )}
    </div>
  );
};

export default FilterBox;
