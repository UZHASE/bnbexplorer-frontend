import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Typography } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';

/**
 * A child component inside ListingDetails which renders a piece of detailed information about a selected listing.
 * Additionally, it includes the callback button for showing reviews.
 *
 * @component
 * @prop {listingDetails} listing Information about a listing
 * @prop {function} onClick A handler for a click Event
 * @prop {boolean} showReviews If reviews are to be shown
 */
const ListingInfoItem = (props) => {
  const { listing, onClick, showReviews } = props;

  const lst = [
    { Host: listing.host.name },
    { Area: listing.area },
    { Neighbourhood: listing.neighbourhood },
    { Price: listing.price },
    { 'Room Type': listing.roomType },
    { 'Min. Nights': listing.minNights },
  ];

  const renderReviewElement = () => {
    if (showReviews) {
      return (
        <Grid
          item
          xs={4}
          id='listing-info-item-review-has-review'
          style={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            color: '#66ccff',
          }}
          onClick={onClick}
        >
          <>
            <RateReviewIcon style={{ marginRight: '5px' }} />
            <Typography
              style={{
                fontWeight: '900',
                textDecoration: 'underline',
              }}
            >
              Reviews
            </Typography>
          </>
        </Grid>
      );
    } else {
      return (
        <Grid
          item
          id='listing-info-item-review-no-review'
          xs={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            style={{
              fontWeight: '900',
            }}
          >
            No Reviews
          </Typography>
        </Grid>
      );
    }
  };

  const renderListings = lst.map((e, idx) => {
    return (
      <React.Fragment key={Object.keys(e)}>
        <Grid item xs={4}>
          <Typography
            style={{ fontWeight: '900' }}
            id={`listing-info-item-${Object.keys(e)}-label`}
          >
            {Object.keys(e)}:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            style={{ fontWeight: '300' }}
            id={`listing-info-item-${Object.keys(e)}-value`}
          >
            {Object.values(e)}
          </Typography>
        </Grid>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      {renderListings}
      {renderReviewElement()}
    </React.Fragment>
  );
};
export default ListingInfoItem;
