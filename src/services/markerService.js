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
    } = getElementPositionData('map-container-inner');
    const mapMidVertical = mapWidth / 2;
    const mapMidHorizontal = mapHeight / 2;

    // get place marker data
    const {
      left: markerOffsetLeft,
      top: markerOffsetTop,
    } = getElementPositionData(placeId);
    const relativeMarkerPositionLeft = markerOffsetLeft - mapOffsetLeft;
    const relativeMarkerPositionTop = markerOffsetTop - mapOffsetTop;

    // determine whether default fold (down, right) needs to be changed based on
    // relative position of marker to map mids
    foldLeft = relativeMarkerPositionLeft > mapMidVertical;
    foldTop = relativeMarkerPositionTop > mapMidHorizontal;

    // get actual height of element from hidden 'twin'. add some tolerance at offset for better visual
    // design. only needed for case foldTop === true
    const { height: observedMarkerHeight } = getElementPositionData(
      `${placeId}-hidden`
    );
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

export const composeId = (id, isHidden = false) => {
  return isHidden ? `${id}-hidden` : `${id}-visible`;
};