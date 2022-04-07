import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
// import Button from './Button/Button';

class App extends Component {
  state = {
    userInput: '',
    apiKey: '24444752-6eeb7e9783b35bc5419290dda',
  };
  handleSubmitForm = ({ userInput }) => {
    this.setState({ userInput });
  };
  loadBtnHandler = () => {
    console.log('btn');
  };
  render() {
    const { userInput } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmitForm} />
        <ImageGallery userInput={userInput} />
        {/* <Button btnText="Load more" onSubmit={this.loadBtnHandler} /> */}
      </div>
    );
  }
}
export default App;
