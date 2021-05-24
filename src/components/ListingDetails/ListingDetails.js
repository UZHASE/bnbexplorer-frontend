import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PropTypes from 'prop-types';

import ListingInfoItem from './ListingInfoItem';
import './listingDetails.scss';
import ImageCarousel from './ImageCarousel';

/**
 * ListingDetails
 *
 * @component
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

ListingDetails.propTypes = {
  listing: PropTypes.object,
  onClick: PropTypes.func,
  showReviews: PropTypes.bool,
};

export default ListingDetails;
