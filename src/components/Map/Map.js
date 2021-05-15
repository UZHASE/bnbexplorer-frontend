import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Accordion,
  Switch,
  Tooltip,
} from '@material-ui/core';
import GoogleMap from 'google-map-react/dist/index.js';
import Api from '../../lib/Http/Api';
import AnyReactComponent from './Marker';
import {
  getMappedRodentData,
  getMappedCrimeData,
  switchesTooltips,
} from '../../services/mapService';

const emptyProp = { positions: [], options: {} };

const Map = (props) => {
  const defaultProps = {
    center: { lat: 40.72, lng: -74 },
    zoom: 11,
  };
  const {
    listings,
    setListing,
    placeSearch,
    recommendations,
    selected,
  } = props;
  const [toggle, setToggle] = useState({
    crime: false,
    transit: false,
    rodent: false,
    recommendations: false,
  });
  const [crime, setCrime] = useState();
  const [rodent, setRodent] = useState();
  const [apiData, setApiData] = useState();
  const [places, setPlaces] = useState([]);
  // const [recommendations, setRecommendations] = useState([]);

  const crimeData = getMappedCrimeData(crime);
  const rodentData = getMappedRodentData(rodent);

  const data = [
    toggle.crime ? crimeData : emptyProp,
    toggle.rodent ? rodentData : emptyProp,
  ];

  const Switches = (props) => {
    return props.inputs.map((e, idx) => {
      return (
        <Tooltip title={switchesTooltips[e]} key={idx}>
          <FormControlLabel
            control={
              <Switch checked={toggle[e]} onChange={handleChange} name={e} />
            }
            label={
              !props.label
                ? e.charAt(0).toUpperCase() + e.slice(1)
                : props.label
            }
            style={{ marginLeft: '16px' }}
            disabled={
              props.disabled ? props.disabled : !crime && !rodent ? true : false
            }
          />
        </Tooltip>
      );
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const crimeRes = await Api.get('layers/crime');
      const healtRes = await Api.get('layers/health');
      setCrime(crimeRes.data.entries);
      setRodent(healtRes.data.entries);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (placeSearch) {
      const { map, maps } = apiData;
      const service = new maps.places.PlacesService(map);
      const request = {
        query: placeSearch,
        fields: ['name', 'geometry'],
        location: { lat: 40, lng: -74 },
        radius: '50000',
      };
      service.textSearch(request, (results, status) => {
        if (status === 200 || status === 'OK') {
          setPlaces(results);
        }
      });
    } else {
      setPlaces([]);
    }
  }, [placeSearch]);

  const handleChange = (e) => {
    setToggle({ ...toggle, [e.target.name]: e.target.checked });
  };

  const apiHasLoaded = (map, maps) => {
    setApiData({ map, maps });
  };

  const getMiddlePosition = (values) => {
    const { g, i } = values;
    return (g + i) / 2;
  };

  return (
    <>
      <Accordion>
        <div style={{ minHeight: '50vh', width: '100%' }}>
          <GoogleMap
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
            {!toggle.recommendations
              ? listings.map((e) => {
                  return (
                    <AnyReactComponent
                      lat={e.latitude}
                      lng={e.longitude}
                      key={e.id}
                      setListing={setListing}
                      id={e.id}
                      type={'listings'}
                    />
                  );
                })
              : null}
            {places.map((e) => {
              return (
                <AnyReactComponent
                  lng={getMiddlePosition(e.geometry.viewport.La)}
                  lat={getMiddlePosition(e.geometry.viewport.Ua)}
                  key={e.place_id}
                  id={e.place_id}
                  type={'marker'}
                  place={e}
                />
              );
            })}
            {recommendations.map((e) => {
              return (
                <AnyReactComponent
                  lat={e.latitude}
                  lng={e.longitude}
                  key={e.id}
                  setListing={setListing}
                  id={e.id}
                  type={'recommendations'}
                />
              );
            })}
            {selected ? (
              <AnyReactComponent
                lat={selected.latitude}
                lng={selected.longitude}
                key={selected.id}
                setListing={setListing}
                id={selected.id}
                type={'selected'}
              />
            ) : null}
          </GoogleMap>
        </div>
      </Accordion>
      <Accordion style={{ display: 'flex' }}>
        <FormGroup
          row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: '16px',
            width: '100%',
          }}
        >
          <Switches
            disabled={recommendations.length < 1}
            inputs={['recommendations']}
            label={'Show Recommendations Only'}
          />

          <div>
            <Switches inputs={['crime', 'rodent', 'transit']} />
          </div>
        </FormGroup>
      </Accordion>
    </>
  );
};
export default Map;
