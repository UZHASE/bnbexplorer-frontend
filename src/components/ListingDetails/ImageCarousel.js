import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * ImageCarousel shows images and adds buttons to switch images.
 *
 * @component
 */
const ImageCarousel = ({ listing }) => {
  if (listing && listing.images && listing.images.length > 0) {
    return (
      <Carousel autoPlay showArrows={true}>
        {listing.images.map((e) => {
          return (
            <div key={e} id={`listing-image-${e}`}>
              <img className='carousel-image' src={e} alt='image' />
            </div>
          );
        })}
      </Carousel>
    );
  } else {
    return <p>No Images Found</p>;
  }
};

ImageCarousel.propTypes = {
  /**
   * listingDetails
   */
  listing: PropTypes.shape({
    images: PropTypes.array,
  }),
};

export default ImageCarousel;
