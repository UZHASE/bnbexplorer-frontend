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
import Marker from './Marker';
import {
  getMappedRodentData,
  getMappedCrimeData,
  getMappedComplaintData,
  switchesTooltips,
} from '../../services/mapService';

const emptyProp = { positions: [], options: {} };

/**
 * A Map component that includes the visualization of New York and listing location markers.
 *
 * @component
 * @prop {array} listings The listings to be shown on the map
 * @prop {function} setListing An event handler when a listing is clicked on
 * @prop {string} placeSearch The propagated search value from the Searchbar
 * @prop {array} recommendations Recommended listings based on the selected listing
 * @prop {Object} selected The currently clicked on listing
 */
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
  const [complaints, setComplaints] = useState();
  const [apiData, setApiData] = useState();
  const [places, setPlaces] = useState([]);

  const crimeData = getMappedCrimeData(crime);
  const rodentData = getMappedRodentData(rodent);
  const complaintData = getMappedComplaintData(complaints);

  //compose heatmap data
  const data = [
    toggle.crime ? crimeData : emptyProp,
    toggle.rodent ? rodentData : emptyProp,
    toggle.complaints ? complaintData : emptyProp,
  ];

  // switches to toggle heatmaps and recommendations
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
              props.disabled ? props.disabled : !crime && !rodent && !complaints
            }
          />
        </Tooltip>
      );
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const crimeRes = await Api.get('layers/crime');
      const healthRes = await Api.get('layers/health');
      const complaintRes = await Api.get('layers/complaints');
      setCrime(crimeRes.data.entries);
      setRodent(healthRes.data.entries);
      setComplaints(complaintRes.data.entries);
    };
    loadData();
  }, []);

  useEffect(() => {
    // if a searchterm was entered, call google places api to look
    // for matches that are close to new york
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
    // google maps internal functions
    setApiData({ map, maps });
  };

  const getMiddlePosition = (values) => {
    const { g, i } = values;
    return (g + i) / 2;
  };

  return (
    <>
      <Accordion>
        <div
          style={{ minHeight: '50vh', width: '100%' }}
          id='map-container-inner'
        >
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
              ? listings &&
                listings.map((e) => {
                  return (
                    <Marker
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
            {places &&
              places.map((e) => {
                return (
                  <Marker
                    lng={getMiddlePosition(e.geometry.viewport.La)}
                    lat={getMiddlePosition(e.geometry.viewport.Ua)}
                    key={e.place_id}
                    id={e.place_id}
                    type={'marker'}
                    place={e}
                  />
                );
              })}
            {recommendations &&
              recommendations.map((e) => {
                return (
                  <Marker
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
              <Marker
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
            disabled={recommendations && recommendations.length < 1}
            inputs={['recommendations']}
            label={'Show Recommendations Only'}
          />

          <div>
            <Switches inputs={['crime', 'rodent', 'complaints', 'transit']} />
          </div>
        </FormGroup>
      </Accordion>
    </>
  );
};
export default Map;
