import { DURATION_SCALE } from '../constants/filterSettings';

/**
 @module filterService
 */

/**
 * Returns the key from the DURATION_SCALE mapping.
 * @method
 * @param   {number}  val
 *          Value in DURATION_SCALE corresponding to the key
 * @returns {number}
 *           key in DURATION_SCALE
 */
// prettier-ignore
export const calculateReverseScale = (val) => {
  return parseInt(
    Object.keys(DURATION_SCALE).find((i) => DURATION_SCALE[i] === val),
  );
};
