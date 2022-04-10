import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import Button from '../Button/Button';
import { fetchImages } from 'services/images-api';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    status: 'idle',
    showModal: false,
    showLoader: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps) {
    const { userInput } = this.props;
    if (prevProps.userInput !== userInput) {
      this.setState({ status: 'pending' });

      fetchImages(userInput, 1)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return Promise.reject(
              new Error(`There are no picturs with name ${userInput}`)
            );
          }
          this.setState({ pictures: [...hits], page: 1, status: 'resolved' });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        )
        .finally(() => {
          this.setState({ showLoader: false });
        });
    }
  }
  loadBtnHandler = () => {
    const { page } = this.state;
    const { userInput } = this.props;
    this.setState({ showLoader: true });

    fetchImages(userInput, page + 1)
      .then(({ hits }) =>
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...hits],
            page: prevState.page + 1,
            status: 'resolved',
          };
        })
      )
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ showLoader: false });
      });
  };
  onImageClick = e => {
    const { pictures } = this.state;
    const largeImg = pictures.find(picture => {
      return picture.id === parseInt(e.currentTarget.id);
    });
    this.setState({ modalContent: largeImg });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    const { pictures, status, error, showModal, modalContent, showLoader } =
      this.state;
    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error}</div>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryList>
            {pictures.map(picture => {
              return (
                <ImageGalleryItem
                  onImageClick={this.onImageClick}
                  key={picture.id}
                  id={picture.id}
                  preview={picture.webformatURL}
                  pictureTag={picture.tags}
                />
              );
            })}
          </ImageGalleryList>
          {showLoader && <Loader />}
          <Button btnText="Load more" onSubmit={this.loadBtnHandler} />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img
                src={modalContent.largeImageURL}
                alt={modalContent.tags}
                style={{ width: '60vw', height: 'auto' }}
              />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
