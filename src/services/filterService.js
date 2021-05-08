import { DURATION_SCALE } from '../constants/filterSettings';

// prettier-ignore
export const calculateReverseScale = (val) => {
  return parseInt(
    Object.keys(DURATION_SCALE).find((i) => DURATION_SCALE[i] === val),
  );
};
