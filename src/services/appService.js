import Api from '../lib/Http/Api';
import Log from './helper/Log';
const Logger = new Log('appService.js');

/**
 @module appService
 */

/**
 * Returns an object containing the fetched listing information,
 * the corresponding reviews and recommendations that were calculated based on the listing that was clicked on.
 * @method
 * @param   {number}  key
 *          Unique id of a listing
 * @param   {filterSettings}  filterParams
 *          Filter parameters
 * @returns {ListingData} ListingData
 *          Nested object containing the fields listingResponseData, reviewResponseData, recommendationResponseData
 */
export const clickListingHandler = async (key, filterParams) => {
  const listingResponse = await Api.get(`listings/${key}`);
  const listingResponseData = listingResponse.data;
  const reviewResponse = await Api.get(`listings/${key}/reviews`);
  const reviewResponseData = reviewResponse.data;
  Logger.log('reviews', reviewResponseData);
  const params = {
    listingId: key,
    hostId: listingResponseData.host.id,
    ...filterParams,
  };
  let recommendationResponseData = [];
  const recommendationResponse = await Api.get(`listings/recommendations`, {
    params,
  });
  recommendationResponseData = recommendationResponse.data;
  if (recommendationResponseData.length < 1) {
    // if the filter settings were to strict, an empty array is returned.
    // thus, remove the host information and try again.
    delete params.hostId;
    delete params.listingsPerHost;
    const recommendationResponse_2 = await Api.get(`listings/recommendations`, {
      params,
    });
    recommendationResponseData = recommendationResponse_2.data;
  }
  return {
    listingResponseData,
    reviewResponseData,
    recommendationResponseData,
  };
};

/**
 * Returns the fetched listings information from the api given the filter parameters.
 * @method
 * @param   {Object}  filterSettings
 *          Filter parameters
 * @returns {array}
 *          An array containing listing objects, or if an exception was raised while trying to fetch the data, an empty array is returned.
 */
export const loadListingsData = async (filterSettings) => {
  try {
    Logger.log(filterSettings);
    const response = await Api.get('listings', {
      params: {
        ...filterSettings,
      },
    });
    Logger.log(response.data);
    return response.data;
  } catch (e) {
    Logger.log('could not load listings');
    return [];
  }
};
