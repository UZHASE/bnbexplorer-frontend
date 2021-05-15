import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Typography } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
          <Typography style={{ fontWeight: '900' }}>
            {Object.keys(e)}:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography style={{ fontWeight: '300' }}>
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
