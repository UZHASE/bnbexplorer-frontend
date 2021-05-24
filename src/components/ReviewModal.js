import { Modal, Container, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ScrollArea from 'react-scrollbars-custom';

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
    <Modal
      open={showModal}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        {reviews ? (
          <Container
            style={{
              backgroundColor: 'white',
              maxWidth: '95vw',
              borderRadius: '8px',
              boxShadow: '0 2px 7px 1px rgb(0 0 0 / 30%)',
              paddingBottom: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '30px',
                paddingTop: '12px',
              }}
            >
              <Typography variant='h5'>Reviews</Typography>
              <CloseIcon
                style={{ marginTop: '5px', cursor: 'pointer' }}
                onClick={closeModal}
              />
            </div>
            <ScrollArea
              style={{
                height: '70vh',
                width: '70vw',
              }}
              noScrollX
            >
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
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
