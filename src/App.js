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
import ListingDetails from './components/ListingDetails/ListingDetails';
import Searchbar from './components/Searchbar';
import Log from './services/helper/Log.js';
import FilterBox from './components/FilterBox';
import ReviewModal from './components/ReviewModal';
import { clickListingHandler, loadListingsData } from './services/appService';
import './App.scss';

function App() {
  const Logger = new Log('App.js');

  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState();
  const [placeSearch, setPlaceSearch] = useState();
  const [filterSettings, setFilterSettings] = useState();
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    // load listings on mount and when filter settings change
    const loadListings = async (filters) => {
      setListings(await loadListingsData(filters));
    };
    if (filterSettings) loadListings(filterSettings);
  }, [filterSettings]);

  const clickListing = async (key) => {
    // load the corresponding data for a listing when it is clicked upon
    const {
      listingResponseData,
      reviewResponseData,
      recommendationResponseData,
    } = await clickListingHandler(key, filterSettings);
    Logger.log('clicked on listing: ', listingResponseData);

    setListing(listingResponseData);
    setReviews(reviewResponseData);
    setRecommendations(recommendationResponseData);
    // reviews might be an empty array
    setShowReviews(reviewResponseData && reviewResponseData.length >= 1);
  };

  return (
    <div className='app-container'>
      <Container maxWidth='lg'>
        <AppBar
          position='static'
          color='primary'
          style={{ backgroundColor: 'rgba(240,146,70, 0.5)' }}
        >
          <Typography variant='h2' align='center' style={{ color: 'white' }}>
            BnB explorer
          </Typography>
        </AppBar>
        {listings ? (
          <Map
            listings={listings}
            setListing={clickListing}
            placeSearch={placeSearch}
            recommendations={recommendations}
            selected={listing}
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
            <Grid container spacing={3} className='accordion-details-controls'>
              <Grid item xs={12} style={{ paddingRight: '0' }}>
                <Searchbar
                  onSearchValueChange={(searchResults) =>
                    setPlaceSearch(searchResults)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FilterBox
                  listings={listings}
                  setFilters={(filterParams) => setFilterSettings(filterParams)}
                />
              </Grid>
              <Grid item xs={8}>
                {listing ? (
                  <ListingDetails
                    listing={listing}
                    showReviews={showReviews}
                    onClick={() => setShowModal(!showModal)}
                  />
                ) : null}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
      <ReviewModal
        showModal={showModal}
        reviews={reviews}
        closeModal={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;
