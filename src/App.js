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
import Log from './helper/Log.js';
import './App.css';
import Api from './lib/Http/Api';

function App() {
  const Logger = new Log('App.js');

  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState();
  const [placeSearch, setPlaceSearch] = useState();

  useEffect(() => {
    const loadListings = async () => {
      const response = await Api.get('listings');
      Logger.log(response, 'res');
      setListings(response.data);
    };
    loadListings();
  }, []);

  const clickListing = async (key) => {
    const response = await Api.get('listings/' + key);
    Logger.log('clicked on listing: ', response);
    setListing(response.data);
  };

  const onSearchValueChange = async (searchResults) => {
    setPlaceSearch(searchResults);
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
              <Grid item xs={12}>
                <Searchbar onSearchValueChange={onSearchValueChange} />
              </Grid>
              <Grid item xs={3}>
                Filter
              </Grid>
              <Grid item xs={9}>
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
