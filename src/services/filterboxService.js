import { DURATION_SCALE, RANGEMAX } from '../constants/filterSettings';

//prettier-ignore
export const handleSettingsChange = (
  name,
  value,
  filterSettings,
  metaListingsData,
) => {
  let temp = { ...filterSettings };
  if (name === 'priceRange') {
    // destructure array
    temp = {
      ...temp,
      ['priceMin']: value[0],
      ['priceMax']: getMaxPrice(value[1], metaListingsData),
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
  return temp;
};

export const getMaxPrice = (currentPrice, metaListingsData) => {
  return currentPrice === RANGEMAX ? metaListingsData.maxPrice : currentPrice;
};

export const setPriceRangeMax = (metaListingsData) => {
  //prettier-ignore
  return metaListingsData.maxPrice &&
  metaListingsData.maxPrice.toString().length > 3
    ? RANGEMAX
    : metaListingsData.maxPrice;
};
