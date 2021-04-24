import React, { useEffect, useState } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import GoogleMapReact from 'google-map-react';
import {
  FormGroup,
  FormControlLabel,
  Accordion,
  Switch,
} from '@material-ui/core';
import Api from '../lib/Http/Api';
import Log from '../helper/Log';

/*
https://blaipratdesaba.com/how-to-use-an-npm-node-module-that-has-been-forked-b7dd522fdd08
if when deployed the map does not work, need to add post install script
 */
const AnyReactComponent = (props) => {
  // RoomIcon has size 24x24px, so need to offset that, s.t. the icon is in the right location
  //=> does not work well with zoom
  const { id, setListing, key } = props;
  return (
    <React.Fragment key={key}>
      <RoomIcon
        color='secondary'
        key={key}
        style={{
          position: 'absolute',
          left: '-24px',
          top: '-24px',
          cursor: 'pointer',
          color: 'rgba(225,1,1,0.8)',
        }}
        onClick={() => setListing(id)}
      />
    </React.Fragment>
  );
};

const emptyProp = { positions: [], options: {} };

const Map = (props) => {
  const Logger = new Log('Map.js');

  const defaultProps = {
    center: { lat: 40.72, lng: -74 },
    zoom: 11,
  };
  const { listings, setListing } = props;
  const [toggle, setToggle] = useState({
    crime: false,
    transit: false,
    cleanliness: false,
  });
  const [crime, setCrime] = useState();
  const [cleanliness, setCleanliness] = useState();

  const crimeData = crime
    ? {
        positions: crime.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(255,255,0,0)', 'rgba(255,255,0,1)'],
        },
      }
    : [];

  const cleanlinessData = cleanliness
    ? {
        positions: cleanliness.map((e) => {
          return { lat: e.latitude, lng: e.longitude };
        }),
        options: {
          radius: 20,
          opacity: 0.6,
          gradient: ['rgba(0,0,255,0)', 'rgba(0, 0, 255, 1)'],
        },
      }
    : [];

  const data = [
    toggle.crime ? crimeData : emptyProp,
    toggle.cleanliness ? cleanlinessData : emptyProp,
  ];

  const Switches = (props) => {
    return props.inputs.map((e, idx) => {
      return (
        <FormControlLabel
          key={idx}
          control={
            <Switch checked={toggle[e]} onChange={handleChange} name={e} />
          }
          label={e.charAt(0).toUpperCase() + e.slice(1)}
          style={{ marginLeft: '16px' }}
          disabled={!crime && !cleanliness}
        />
      );
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const crimeRes = await Api.get('layers/crime');
      Logger.log(crimeRes, 'res crime');
      const healtRes = await Api.get('layers/health');
      Logger.log(healtRes, 'res health');
      setCrime(crimeRes.data.entries);
      setCleanliness(healtRes.data.entries);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setToggle({ ...toggle, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <Accordion>
        <div style={{ minHeight: '50vh', width: '100%' }}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              libraries: ['visualization'],
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            heatmapLibrary={true}
            heatmap={data}
            layerTypes={toggle.transit ? ['TransitLayer'] : []}
            style={{ height: '500px', paddingBottom: '50px' }}
          >
            {listings.map((e) => {
              return (
                <AnyReactComponent
                  lat={e.latitude}
                  lng={e.longitude}
                  text='My Marker'
                  key={e.id}
                  setListing={setListing}
                  id={e.id}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </Accordion>
      <Accordion style={{ display: 'flex' }}>
        <FormGroup row style={{ marginLeft: 'auto', marginRight: '16px' }}>
          <Switches inputs={['crime', 'cleanliness', 'transit']} />
        </FormGroup>
      </Accordion>
    </>
  );
};
export default Map;
