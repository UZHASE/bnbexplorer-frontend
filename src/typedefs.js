/**
 * @typedef {Object} ListingData
 *          Contains listingDetails, reviews and recommendations
 *          for the listing in question.
 * @property {listingDetails} listingResponseData
 *            Listing details
 * @property {array} reviewResponseData
 *            Corresponding reviews
 * @property {array} recommendationResponseData
 *            Recommendations
 */

/**
 * @typedef {Object} listingDetails
 *          Information about a listing
 * @property {string} area
 * @property {number} availability
 *            Days per year the listing is available
 * @property {host} host
 * @property {number} id
 * @property {array} images
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} minNights
 *            Minimum stay required
 * @property {string} name
 * @property {string} neighbourhood
 *            To which of the 5 larger neighbourhood areas in NY it belongs to
 * @property {number} numOfReviews
 * @property {number} price
 * @property {string} roomType
 */

/**
 * @typedef {Object} host
 *          Information about the host of a listing
 * @property {string} name
 * @property {number} id
 * @property {number} numOfListings
 *            Total number of listings that were put online by this host
 */

/**
 * @typedef {Object} filterSettings
 *          Filter parameters that are sent to the backend to filter listings
 * @property {string} priceMin
 * @property {number} priceMax
 * @property {string} location
 * @property {string} roomType
 * @property {number} availability
 * @property {number} minNights
 * @property {number} listingsPerHost
 *            Total number of listings that were put online by this host
 */

/**
 * @typedef {Object} metaListingsData
 *          Global metadata about the listings stored in the backend that
 *          are needed for setting the default filter values
 * @property {array} areas
 * @property {number} minPrice
 * @property {number} maxPrice
 * @property {number} minListingsPerHost
 * @property {number} maxListingsPerHost
 * @property {array} neighbourhoods
 * @property {number} numOfListings
 * @property {array} roomTypes
 */
