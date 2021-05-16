import Api from '../lib/Http/Api';
import Log from './helper/Log';
const Logger = new Log('appService.js');

export const clickListingHandler = async (key, filterParams) => {
  // used when clicked on a listing to get listing data, its reviews and
  // recommendations based on this listing

  //listing
  const listingResponse = await Api.get(`listings/${key}`);
  const listingResponseData = listingResponse.data;
  //reviews
  const reviewResponse = await Api.get(`listings/${key}/reviews`);
  const reviewResponseData = reviewResponse.data;
  Logger.log('reviews', reviewResponseData);
  // //recommendations
  const params = {
    listingId: key,
    hostId: listingResponseData.host.id,
    ...filterParams,
  };
  let recommendationResponseData = [];
  try {
    const recommendationResponse = await Api.get(`listings/recommendations`, {
      params,
    });
    recommendationResponseData = recommendationResponse.data;
    if (recommendationResponseData.length < 1) {
      throw new Error();
    }
  } catch (e) {
    // remove all host data from query
    delete params.hostId;
    delete params.listingsPerHost;
    const recommendationResponse = await Api.get(`listings/recommendations`, {
      params,
    });
    recommendationResponseData = recommendationResponse.data;
  }

  return {
    listingResponseData,
    reviewResponseData,
    recommendationResponseData,
  };
};

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
