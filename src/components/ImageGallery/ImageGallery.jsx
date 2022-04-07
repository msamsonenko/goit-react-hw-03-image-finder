import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import Button from '../Button/Button';
// import { fetchImages } from 'services/images-api';

class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
  };
  componentDidMount() {
    console.log('component did mount');
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userInput !== this.props.userInput) {
      console.log('new search');
      fetch(
        `https://pixabay.com/api/?q=${this.props.userInput}&page=1&key=24444752-6eeb7e9783b35bc5419290dda&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits }) => this.setState({ pictures: [...hits], page: 1 }));
    }
  }
  loadBtnHandler = () => {
    console.log('continue search');

    fetch(
      `https://pixabay.com/api/?q=${this.props.userInput}&page=${
        this.state.page + 1
      }&key=24444752-6eeb7e9783b35bc5419290dda&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) =>
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...hits],
            page: prevState.page + 1,
          };
        })
      );
  };

  render() {
    const { pictures } = this.state;
    return (
      <div>
        <ImageGalleryList>
          {pictures.map(picture => {
            return (
              <ImageGalleryItem
                key={picture.id}
                id={picture.id}
                preview={picture.webformatURL}
              />
            );
          })}
        </ImageGalleryList>
        {pictures.length === 0 || (
          <Button btnText="Load more" onSubmit={this.loadBtnHandler} />
        )}
      </div>
    );
  }
}

export default ImageGallery;
