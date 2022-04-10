import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    userInput: '',
  };
  handleSubmitForm = ({ userInput }) => {
    this.setState({ userInput });
  };
  render() {
    const { userInput } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmitForm} />
        <ImageGallery userInput={userInput} />
      </div>
    );
  }
}
export default App;
