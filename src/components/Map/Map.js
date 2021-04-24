import React, { useEffect, useState } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import GoogleMapReact from 'google-map-react';
import {
  FormGroup,
  FormControlLabel,
  Accordion,
  Switch,
} from '@material-ui/core';
import Api from '../../lib/Http/Api';
import Log from '../../helper/Log';
import AnyReactComponent from './Marker';

const emptyProp = { positions: [], options: {} };

const Map = (props) => {
  const Logger = new Log('Map.js');

  const defaultProps = {
    center: { lat: 40.72, lng: -74 },
    zoom: 11,
  };
  const { listings, setListing, placeSearch } = props;
  const [toggle, setToggle] = useState({
    crime: false,
    transit: false,
    cleanliness: false,
  });
  const [crime, setCrime] = useState();
  const [cleanliness, setCleanliness] = useState();
  const [apiData, setApiData] = useState();
  const [places, setPlaces] = useState([]);

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

  useEffect(() => {
    if (placeSearch) {
      console.log(placeSearch);
      const { map, maps } = apiData;
      const service = new maps.places.PlacesService(map);
      const request = {
        query: placeSearch,
        fields: ['name', 'geometry'],
        location: { lat: 40.72, lng: -74 },
      };
      service.textSearch(request, (results, status) => {
        if (status === 200 || status === 'OK') {
          console.log(results, status);
        }
      });
    }
  }, [placeSearch]);

  const handleChange = (e) => {
    setToggle({ ...toggle, [e.target.name]: e.target.checked });
  };

  const apiHasLoaded = (map, maps) => {
    console.log(map, maps);
    setApiData({ map, maps });
  };

  return (
    <>
      <Accordion>
        <div style={{ minHeight: '50vh', width: '100%' }}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              libraries: ['visualization', 'places', 'geometry'],
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            heatmapLibrary={true}
            heatmap={data}
            layerTypes={toggle.transit ? ['TransitLayer'] : []}
            style={{ height: '500px', paddingBottom: '50px' }}
            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
          >
            {listings
              .filter((e) => e.area === 'Chinatown')
                // TODO remove filter
              .map((e) => {
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