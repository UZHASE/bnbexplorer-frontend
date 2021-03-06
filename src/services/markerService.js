import * as markerService from './markerService';
// NOTE: https://stackoverflow.com/a/55193363 ES6 import into itself to allow mocking

/**
 @module markerService
 */

/**
 * Function returns the positions of a HTML element in relation to the viewport
 * @method
 * @param   {string}  elementId Identifier for the HTML element
 *
 * @returns {Object} positionalData
 */
export const getElementPositionData = (elementId) => {
  const element = document.getElementById(elementId);
  const elementData = element.getBoundingClientRect();
  return {
    left: elementData.left,
    top: elementData.top,
    height: elementData.height,
    width: elementData.width,
  };
};

/**
 * Compares the viewport position data of the map marker identified by the placeId parameter with the map itself.
 * This allows the function to determine in which quadrant of the map the HoverBox will appear,
 * and hence can determine at which side (left/right, top/bottom)
 * it is to be rendered to avoid the HoverBox from clipping outside of the map component.
 * @method
 * @param   {boolean}  isHidden Determines if the element is a visible component
 * @param   {string}  placeId Identifier for the HTML element
 *
 * @returns {Object} data required to determine the style of a Hoverbox component
 */
export const getHoverBoxStyleData = (isHidden, placeId) => {
  let foldLeft = false;
  let foldTop = false;
  let markerOffsetTopComputed = 'unset';

  // only if it is the actual hoverBox. there is a hidden 'twin' used to determine the actual height of
  // the element (since height is variable). For the hidden 'twin', these calculations are not needed
  if (!isHidden) {
    // get map data, determine vertical and horizontal midpoints
    const {
      left: mapOffsetLeft,
      top: mapOffsetTop,
      height: mapHeight,
      width: mapWidth,
    } = markerService.getElementPositionData('map-container-inner');
    const mapMidVertical = mapWidth / 2;
    const mapMidHorizontal = mapHeight / 2;

    // get place marker data
    const {
      left: markerOffsetLeft,
      top: markerOffsetTop,
    } = markerService.getElementPositionData(placeId);
    const relativeMarkerPositionLeft = markerOffsetLeft - mapOffsetLeft;
    const relativeMarkerPositionTop = markerOffsetTop - mapOffsetTop;

    // determine whether default fold (down, right) needs to be changed based on
    // relative position of marker to map midpoints
    foldLeft = relativeMarkerPositionLeft > mapMidVertical;
    foldTop = relativeMarkerPositionTop > mapMidHorizontal;

    // get actual height of element from hidden 'twin'. add some tolerance at offset for better visual
    // design. only needed for case foldTop === true
    const {
      height: observedMarkerHeight,
    } = markerService.getElementPositionData(`${placeId}-hidden`);
    const heightShiftTolerance = 8;
    markerOffsetTopComputed = foldTop
      ? `-${observedMarkerHeight + heightShiftTolerance}px`
      : 'unset';
  }
  return {
    foldLeft,
    foldTop,
    markerOffsetTopComputed,
  };
};

/**
 * Based on the visibility of an element, determine the suffix of the html-id.
 * This is needed since some elements have variable height based on their content,
 * thus if that height is to be used in a calculation it has to be read from an already rendered html element.
 * This function provides the id for the visible and hidden variant of such an element.
 * @method
 * @param   {string}  id Identifier for the HTML element
 * @param   {boolean}  isHidden Determines if the element is a visible component
 *
 * @returns {boolean} data required to determine the style of a Hoverbox component
 */
export const composeId = (id, isHidden = false) => {
  return isHidden ? `${id}-hidden` : `${id}-visible`;
};
