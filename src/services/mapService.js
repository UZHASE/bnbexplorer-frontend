/**
 @module mapService
 */

/**
 * Returns the crime data formatted for the google-map-react library to produce a heatmap.
 * @method
 * @param   {array}  crimeData Information about crime locations
 *
 * @returns {Object}
 *           formatted heatmap data containing the position and graphic settings or an empty Object if crimeData is not available
 */

export const getMappedCrimeData = (crimeData) => {
  return crimeData
    ? {
        positions: crimeData.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
        },
      }
    : {};
};

/**
 * Returns the rodent data formatted for the google-map-react library to produce a heatmap.
 * @method
 * @param   {array}  rodentData Information about rodent encounter locations
 *
 * @returns {Object}
 *           formatted heatmap data containing the position and graphic settings or an empty Object if rodentData is not available
 */
export const getMappedRodentData = (rodentData) => {
  return rodentData
    ? {
        positions: rodentData.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(0,0,255,0)', 'rgba(0, 0, 255, 1)'],
        },
      }
    : {};
};

/**
 * Returns the complaint data formatted for the google-map-react library to produce a heatmap.
 * @method
 * @param   {array}  complaintData Information about noise complaints and complaints about public inorder
 *
 * @returns {Object}
 *           formatted heatmap data containing the position and graphic settings or an empty Object if complaintData is not available
 */

export const getMappedComplaintData = (complaintData) => {
  return complaintData
    ? {
        positions: complaintData.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(240, 40, 120, 0)', 'rgba(240, 40, 120, 1)'],
        },
      }
    : {};
};

export const switchesTooltips = {
  rodent: 'Rat encounters in New York',
  transit: 'Transit options in New York',
  crime: 'Locations of crime occurrences in New York',
  complaints:
    'Locations where complaints about noise and transgressions against public order were registered',
  recommendations: 'Show only recommended listings',
};
