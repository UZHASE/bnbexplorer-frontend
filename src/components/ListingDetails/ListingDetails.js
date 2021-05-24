import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import ListingInfoItem from './ListingInfoItem';
import ImageCarousel from './ImageCarousel';
import './ListingDetails.scss';

/**
 * A parent component which is responsible for passing down detailed information
 * about a selected listing to its children components.
 *
 * @component
 * @prop {listingDetails} listing Information about a listing
 * @prop {function} onClick A handler for a click Event
 * @prop {boolean} showReviews If reviews are to be shown
 */
const ListingDetails = (props) => {
  const { listing, onClick, showReviews } = props;
  if (listing) {
    return (
      <Grid
        container
        spacing={3}
        id='listing-details-container'
        className='listing-details-container'
      >
        <Grid item xs={12} className='listing-details-name'>
          <Typography variant='h6' align='center'>
            {listing.name}
          </Typography>
        </Grid>

        <Grid item xs={6} className='listing-details-grid'>
          <Grid
            container
            spacing={3}
            className='listing-details-grid-container-info'
          >
            <ListingInfoItem
              listing={listing}
              onClick={onClick}
              showReviews={showReviews}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} className='listing-details-grid'>
          <Grid
            container
            spacing={3}
            className='listing-details-grid-container-image'
          >
            <Grid
              item
              xs={12}
              className='listing-details-grid-container-image-inner'
            >
              <ImageCarousel listing={listing} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <div id='listing-details-no-content' />;
  }
};

export default ListingDetails;
