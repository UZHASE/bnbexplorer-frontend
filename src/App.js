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
import FilterBox from './components/FilterBox';
import ReviewModal from './components/ReviewModal';
import { clickListingHandler, loadListingsData } from './services/appService';

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
    const loadListings = async (filters) => {
      setListings(await loadListingsData(filters));
    };
    if (filterSettings) loadListings(filterSettings);
  }, [filterSettings]);

  const clickListing = async (key) => {
    const {
      listingResponseData,
      reviewResponseData,
      recommendationResponseData,
    } = await clickListingHandler(key, filterSettings);
    Logger.log('clicked on listing: ', listingResponseData);

    setListing(listingResponseData);
    setReviews(reviewResponseData);
    setRecommendations(recommendationResponseData);
    setShowReviews(reviewResponseData && reviewResponseData.length >= 1);
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
            <Grid
              container
              spacing={3}
              style={{ padding: '0px 12px 0px 0px', marginBottom: '12px' }}
            >
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
                  setFilters={(filterSettings) =>
                    setFilterSettings(filterSettings)
                  }
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
