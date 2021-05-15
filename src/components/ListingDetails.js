import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, CircularProgress } from '@material-ui/core';
import ListingInfoItem from './ListingInfoItem';

const ListingDetails = (props) => {
  const { listing, onClick, showReviews } = props;
  return (
    <Grid
      container
      spacing={3}
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
            background: 'lightgray',
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
            }}
          >
            {listing.img ? (
              <img alt='img' source={listing.img} />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ListingDetails;
