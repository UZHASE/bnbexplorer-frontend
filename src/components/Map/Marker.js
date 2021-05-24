import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Box';
import classNames from 'classnames';

import './Marker.scss';
import { getHoverBoxStyleData, composeId } from '../../services/markerService';

/**
 * A visual component that is shown when the user hovers above a searched place on the map.
 *
 * @component
 * @prop {Object} place The information about the place which is currently being hovered on
 * @prop {string} placeId An HTML element id of the pin which belongs to the searched place that is being hovered on
 * @prop {boolean} isHidden Determines the visibility of the component.
 * @prop {string} id The id of the Hoverbox
 */
const HoverBox = (props) => {
  const { place, placeId, isHidden, id } = props;
  //prettier-ignore
  const { foldLeft, foldTop, markerOffsetTopComputed } = getHoverBoxStyleData(
    isHidden,
    placeId,
  );

  return (
    <Container
      maxWidth='false'
      fixed='true'
      id={id}
      className={classNames({
        'current-container': true,
        'fold-left': foldLeft,
        'fold-top': foldTop,
      })}
      style={{
        top: markerOffsetTopComputed,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '4px',
          fontFamily: 'Roboto, Arial, sans-serif',
        }}
      >
        <img
          src={place.icon}
          alt={place.name}
          style={{ width: '16px', height: '16px', marginRight: '8px' }}
        />
        <div
          style={{
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            fontStretch: '100%',
            maxHeight: '60px',
            overflow: 'hidden',
            hyphens: 'auto',
          }}
        >
          {place.name}
        </div>
      </div>
      <span style={{ fontSize: '13px', fontWeight: '400' }}>
        {place.formatted_address}
      </span>
    </Container>
  );
};

/**
 * A pin on top of the map component, for all listings, recommendations
 * and currently selected listing, as well as searchresults.
 *
 * @component
 * @prop {number} id The id of a place to which the marker belongs
 * @prop {function} setListing A function callback to set the clicked on listing as the selected listing
 * @prop {string} type If the marker belongs to a listing, recommendation, search place or is selected
 * @prop {Object} [place] The information about the place which is currently being hovered on
 */
const Marker = (props) => {
  const { id, setListing, type, place } = props;
  const color = {
    marker: 'rgba(40,40,220,0.95)',
    listings: 'rgba(244,67,54,0.85)',
    recommendations: '#d500f9',
    selected: 'rgba(255,255,0,1)',
  };

  const clickHandler = (listingId) => {
    if (setListing) {
      setListing(listingId);
    }
  };

  return (
    <div id={`map-marker-${id}-${type}`}>
      <div
        style={{
          position: 'absolute',
          left: '-12px',
          top: '-12px',
        }}
        key={id}
        id={id}
      >
        <RoomIcon
          key={id}
          style={{
            position: 'relative',
            cursor: 'pointer',
            zIndex: type === 'marker' ? 400 : 'unset',
            color: color[type],
          }}
          onClick={() => clickHandler(id)}
          id={`map-marker-${id}-icon-${type}`}
        />
        {props.$hover && type === 'marker' ? (
          <HoverBox
            place={place}
            placeId={id}
            isHidden={false}
            id={composeId(id)}
          />
        ) : null}
      </div>
      <div className={'hidden'}>
        {/*  /!*hidden hover-info render for height measurements*!/*/}
        {type === 'marker' ? (
          <HoverBox
            place={place}
            placeId={id}
            id={composeId(id, true)}
            isHidden={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Marker;
