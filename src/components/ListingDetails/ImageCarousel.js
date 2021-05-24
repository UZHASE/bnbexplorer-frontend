import { Carousel } from 'react-responsive-carousel';
import React from 'react';

/**
 * ImageCarousel shows images and adds buttons to switch images.
 * @component
 * @prop {listingDetails} listing Information about a listing
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

export default ImageCarousel;
