import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Accordion,
  AccordionDetails,
  Grid,
  CircularProgress,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Map from './components/Map/Map';
import ListingDetails from './components/ListingDetails';
import background from './img/oliver-niblett-wh-7GeXxItI-unsplash.jpg';
import Searchbar from './components/Searchbar';
import Log from './services/helper/Log.js';
import './App.css';
import Api from './lib/Http/Api';
import FilterBox from './components/FilterBox';

function App() {
  const Logger = new Log('App.js');

  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState();
  const [placeSearch, setPlaceSearch] = useState();
  const [filterSettings, setFilterSettings] = useState();
  const [metaListingsData, setMetaListingsData] = useState({});

  useEffect(() => {
    const loadListings = async () => {
      const response = await Api.get('listings', {
        params: {
          ...filterSettings,
        },
      });
      const metaListingsData = await Api.get('listings/metadata');
      Logger.log(metaListingsData);
      Logger.log(response, 'res');
      setListings(response.data);
      setMetaListingsData(metaListingsData.data);
    };
    if (filterSettings) loadListings();
  }, [filterSettings]);

  const clickListing = async (key) => {
    const response = await Api.get('listings/' + key);
    Logger.log('clicked on listing: ', response);
    setListing(response.data);
  };

  const onSearchValueChange = (searchResults) => {
    setPlaceSearch(searchResults);
  };

  const onFilterSettingsChange = (filterSettings) => {
    setFilterSettings(filterSettings);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        margin: 0,
      }}
    >
      <Container maxWidth='lg'>
        <AppBar position='static'>
          <Typography variant='h3' align='center'>
            BnB Explorer
          </Typography>
        </AppBar>
        {listings ? (
          <Map
            listings={listings}
            setListing={clickListing}
            placeSearch={placeSearch}
          />
        ) : (
          <CircularProgress />
        )}
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              spacing={3}
              style={{ padding: '0px 12px 0px 0px', marginBottom: '12px' }}
            >
              <Grid item xs={12} style={{ paddingRight: '0' }}>
                <Searchbar onSearchValueChange={onSearchValueChange} />
              </Grid>
              <Grid item xs={4}>
                <FilterBox
                  listings={listings}
                  setFilters={onFilterSettingsChange}
                  metaListingsData={metaListingsData}
                />
              </Grid>
              <Grid item xs={8}>
                {listing ? <ListingDetails listing={listing} /> : null}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default App;
