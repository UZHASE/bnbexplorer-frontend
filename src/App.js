import './App.css';
import Api from './lib/Http/Api';
import React, { useState, useEffect } from 'react';
import Log from './helper/Log.js';

import {
  Container,
  Typography,
  AppBar,
  // Toolbar,
  Accordion,
  AccordionDetails,
  // Grid,
  CircularProgress,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Map from './components/map';
import ListingDetails from './components/listingDetails';
import background from './img/oliver-niblett-wh-7GeXxItI-unsplash.jpg';

function App() {
  const Logger = new Log('App.js');

  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState();

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
    Logger.log('res', response);
    setListing(response.data);
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
      <Container maxWidth="lg">
        <AppBar position="static">
          <Typography variant="h3" align="center">
            AirBnB Explorer
          </Typography>
        </AppBar>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {listings ? (
              <Map listings={listings} setListing={clickListing} />
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {listing ? (
              <ListingDetails listing={listing} />
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default App;
