import { DURATION_SCALE, RANGEMAX } from '../constants/filterSettings';

/**
 @module filterboxService
 */

/**
 * Handles new incoming values for any of the filter components that the user can interact with.
 * @method
 * @param   {string}  name Name that was returned from a Slider/Select component
 * @param   {string | array}  value New value that was returned from a Slider/Select component
 * @param   {filterSettings}  filterSettings current Filter settings configuration
 * @param   {metaListingsData}  metaListingsData meta information about listings in backend

 *
 * @returns {filterSettings}
 *           Updated filter settings
 */
//prettier-ignore
export const handleSettingsChange = (
  name,
  value,
  filterSettings,
  metaListingsData,
) => {
  let updatedFilterSettings = { ...filterSettings };
  if (name === 'priceRange') {
    // destructure array
    updatedFilterSettings = {
      ...updatedFilterSettings,
      ['priceMin']: value[0],
      ['priceMax']: getMaxPrice(value[1], metaListingsData),
    };
  } else if (name === 'location' || name === 'roomType') {
    updatedFilterSettings = {
      ...updatedFilterSettings,
      [name]: value.join(','),
    };
  } else if (name === 'availability' || name === 'minNights') {
    updatedFilterSettings = {
      ...updatedFilterSettings,
      [name]: DURATION_SCALE[value],
    };
  } else {
    updatedFilterSettings = {
      ...updatedFilterSettings,
      [name]: value,
    };
  }
  return updatedFilterSettings;
};

/**
 * Determines value of the max price filter setting for the query in the backend.
 * This is done to be able to visually restrict the price range in the sliders,
 * i.e. if the slider is at the RANGEMAX the maximum price is not restricted anymore.
 * @method
 * @param   {number}  currentPrice Value that was returned from the Price RangeSlider component
 * @param   {metaListingsData}  metaListingsData meta information about listings in backend
 *
 * @returns {number} actual value for the maximum price for the backend query
 *
 */
export const getMaxPrice = (currentPrice, metaListingsData) => {
  return currentPrice === RANGEMAX ? metaListingsData.maxPrice : currentPrice;
};

/**
 * Limits the maximum price to RANGEMAX for the slider component for visual clarity.
 * @method
 * @param   {metaListingsData}  metaListingsData meta information about listings in backend
 * @returns {number} Maximum price to restrict the slider component
 *
 */
export const setPriceRangeMax = (metaListingsData) => {
  //prettier-ignore
  return metaListingsData.maxPrice &&
  metaListingsData.maxPrice > RANGEMAX
    ? RANGEMAX
    : metaListingsData.maxPrice;
};
