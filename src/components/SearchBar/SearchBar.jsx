import React, { Component } from 'react';
import {
  SearchBarContainer,
  SearchForm,
  SerachFormBtn,
  SearchFormInput,
} from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';

class SearchBar extends Component {
  state = {
    userInput: '',
  };
  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ userInput: value });
  };
  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    return this.setState({ userInput: '' });
  };
  render() {
    return (
      <SearchBarContainer onSubmit={this.onFormSubmit}>
        <SearchForm>
          <SerachFormBtn type="submit">
            <ImSearch />
          </SerachFormBtn>

          <SearchFormInput
            onChange={this.handleInputChange}
            value={this.state.userInput}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
