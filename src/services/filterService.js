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

/**
 * Returns the labels for a slider, with unlabelled marks, if the index of a mark is odd.
 * @method
 * @returns {array}
 *           An array containing the labels for the slider
 */
export const DURATION_MARKS = () => {
  return Object.keys(DURATION_SCALE).map((e) => {
    return {
      value: e,
      label: e % 2 === 0 ? DURATION_SCALE[e].toString() : '',
    };
  });
};
