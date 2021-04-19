import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const AnyReactComponent = (props) => {
  // RoomIcon has size 24x24px, so need to offset that, s.t. the icon is in the right location
  //=> does not work well with zoom
  const { text, id, setListing, key } = props;
  return (
    <React.Fragment key={key}>
      <RoomIcon
        color="secondary"
        key={key}
        style={{
          position: 'absolute',
          left: '-24px',
          top: '-24px',
          cursor: 'pointer',
        }}
        onClick={() => setListing(id)}
      />
    </React.Fragment>
  );
};

const Map = (props) => {
  const defaultProps = {
    center: { lat: 40.796, lng: -73.85 },
    zoom: 11,
  };
  const { listings, setListing } = props;

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {listings.map((e) => {
          return (
            <AnyReactComponent
              lat={e.latitude}
              lng={e.longitude}
              text="My Marker"
              key={e.id}
              setListing={setListing}
              id={e.id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
