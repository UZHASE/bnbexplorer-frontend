import { Modal, Container, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ScrollArea from 'react-scrollbars-custom';
import './ReviewModal.scss';

/**
 * A modal component that shows reviews when opened.
 *
 * @component
 * @prop {boolean} showModal
 * @prop {array} reviews An array containing user reviews of a listing
 * @prop {function} closeModal A function handler to close the modal
 */
const ReviewModal = (props) => {
  const { showModal, reviews, closeModal } = props;
  return (
    <Modal open={showModal} className='review-modal'>
      <div className='review-modal-inner'>
        {reviews ? (
          <Container className='review-modal-container'>
            <div className='review-modal-label-container'>
              <Typography variant='h5'>Reviews</Typography>
              <CloseIcon className='close-icon' onClick={closeModal} />
            </div>
            <ScrollArea className='review-modal-scroll-area' noScrollX>
              {reviews.map((review) => {
                return (
                  <React.Fragment key={review.id}>
                    <div style={{ marginBottom: '16px' }}>{review.text}</div>
                    <hr style={{ borderColor: 'rgba(240, 240, 240, 1)' }} />
                  </React.Fragment>
                );
              })}
            </ScrollArea>
          </Container>
        ) : null}
      </div>
    </Modal>
  );
};

export default ReviewModal;
