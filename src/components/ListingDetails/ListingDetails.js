import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ListingInfoItem from './ListingInfoItem';
import './listingDetails.scss';
import ImageCarousel from './ImageCarousel';

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
        style={{
          border: '1px solid grey',
          borderRadius: '5px',
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            borderRadius: '5px',
            backgroundColor: '#E8E8E8',
            borderBottom: '1px solid grey',
          }}
        >
          <Typography variant='h6' align='center'>
            {listing.name}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            spacing={3}
            style={{ marginTop: '8px', marginLeft: '10px' }}
          >
            <ListingInfoItem
              listing={listing}
              onClick={onClick}
              showReviews={showReviews}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            spacing={3}
            style={{
              marginTop: '12px',
              height: 'calc(100% - 12px)',
              borderRadius: '5px',
              width: 'calc(100% + 8px)',
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
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
