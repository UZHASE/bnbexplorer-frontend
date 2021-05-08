import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Box';

/*
https://blaipratdesaba.com/how-to-use-an-npm-node-module-that-has-been-forked-b7dd522fdd08
if when deployed the map does not work, need to add post install script
 */

const HoverBox = ({ place }) => {
  // console.log('place', place);

  /*
  TODO: select parent marker by id, then check positioning in map element and determine
    whether the hover element needs vertical/horizontal offset 
   */
  // const markerEl = document.getElementById(key);
  // console.log(markerEl);

  return (
    <Container
      maxWidth='false'
      fixed='true'
      className={'current-container'}
      style={{
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: '6px',
        boxShadow: '0 2px 7px 1px rgb(0 0 0 / 30%)',
        width: '190px',
        maxHeight: '130px',
        padding: '12px',
        zIndex: '1000',
        position: 'relative',
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
  const { id, setListing, key, type } = props;
  // const color = type && type === 'marker' ? 'primary' : 'secondary';
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
    <div
      style={{ position: 'absolute', left: '-12px', top: '-12px' }}
      key={key}
    >
      <RoomIcon
        key={key}
        style={{
          position: 'relative',
          cursor: 'pointer',
          zIndex: type === 'marker' ? 400 : 'unset',
          color: color[type],
        }}
        onClick={() => clickHandler(id)}
      />
      {props.$hover && type === 'marker' ? <HoverBox {...props} /> : null}
    </div>
  );
};

export default AnyReactComponent;
