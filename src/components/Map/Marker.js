import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Box';
import classNames from 'classnames';

import './Marker.scss';
import { getHoverBoxStyleData, composeId } from '../../services/markerService';

const HoverBox = ({ place, placeId, isHidden, id }) => {
  const { foldLeft, foldTop, markerOffsetTopComputed } = getHoverBoxStyleData(
    isHidden,
    placeId
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

const AnyReactComponent = (props) => {
  const { id, setListing, type, place } = props;
  const color = {
    marker: 'rgba(40,40,220,0.95)',
    listings: 'rgba(244,67,54,0.85)',
    recommendations: '#d500f9',
    selected: 'rgba(255,255,0,1)',
  };

  const clickHandler = (id) => {
    if (setListing) {
      setListing(id);
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

export default AnyReactComponent;
