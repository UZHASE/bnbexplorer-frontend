import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Typography } from '@material-ui/core';

const ListingInfoItem = (props) => {
  const { listing, onClick } = props;

  const lst = [
    { Host: listing.host.name },
    { Area: listing.area },
    { Neighbourhood: listing.neighbourhood },
    { Price: listing.price },
    { 'Room Type': listing.roomType },
    { 'Min. Nights': listing.minNights },
  ];

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
      <Grid item xs={4}>
        <Typography
          style={{
            fontWeight: '900',
            color: '#66ccff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          Reviews
        </Typography>
      </Grid>
    </React.Fragment>
  );
};
export default ListingInfoItem;
