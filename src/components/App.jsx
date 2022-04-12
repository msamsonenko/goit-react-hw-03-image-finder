import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import { fetchImages } from 'services/images-api';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

export default class App extends Component {
  state = {
    userInput: '',
    pictures: [],
    page: 1,
    error: '',
    status: 'idle',
    showModal: false,
    showLoader: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { userInput, page } = this.state;
    if (prevState.userInput !== userInput) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetchImages(userInput, page)
          .then(({ hits }) => {
            if (hits.length === 0) {
              return Promise.reject(
                new Error(
                  `There are no picturs with name <<${userInput.toUpperCase()}>>`
                )
              );
            }
            this.setState({ pictures: [...hits], page: 1, status: 'resolved' });
          })
          .catch(error => {
            this.setState({ error: error.message, status: 'rejected' });
          });
      }, 2000);
    }
  }

  loadBtnHandler = () => {
    const { page, userInput } = this.state;
    this.setState({ showLoader: true });

    setTimeout(() => {
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
    }, 2000);
  };
  handleSubmitForm = ({ userInput }) => {
    this.setState({ userInput });
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
    const { pictures, showLoader, status, error, showModal, modalContent } =
      this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmitForm} />
        {status === 'rejected' && <div>{error}</div>}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <div>
            <ImageGallery
              pictures={pictures}
              onImageClick={this.onImageClick}
            />
            {showLoader && <Loader />}
            <Button btnText="Load more" onSubmit={this.loadBtnHandler} />
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <img
                  src={modalContent.largeImageURL}
                  alt={modalContent.tags}
                  style={{ width: '80vw', height: 'auto' }}
                />
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}
