import React from 'react';

const ListingDetails = (props) => {
  const { listing } = props;

  return JSON.stringify(listing);
};
export default ListingDetails;
