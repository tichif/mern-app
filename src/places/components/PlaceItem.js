import React, { useState, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = ({
  place: { id, image, title, description, address, creator, location },
}) => {
  const auth = useContext(AuthContext);

  // State of the map modal
  const [showMap, setShowMap] = useState(false);
  // State of the delete modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Open the map modal
  const openMapHandler = () => setShowMap(true);

  // Close the map modal
  const closeMapHandler = () => setShowMap(false);

  // Show the delete modal
  const showWarningHandler = () => setShowConfirmModal(true);

  // Hide or close the delete modal
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  // Delete the place
  const deletePlaceHandler = () => {
    console.log(`Place ${id} deleted`);
    setShowConfirmModal(false);
  };

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        headerText={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={location} zoom={16}></Map>
        </div>
      </Modal>
      <Modal
        headerText='Are you sure?'
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        footerClass='place-item__modal-actions'
        footer={
          <Fragment>
            <Button delete onClick={deletePlaceHandler}>
              YES
            </Button>
            <Button onClick={cancelDeleteHandler} inverse>
              NO
            </Button>
          </Fragment>
        }
      >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Fragment>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={showWarningHandler}>
                  DELETE
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceItem;
