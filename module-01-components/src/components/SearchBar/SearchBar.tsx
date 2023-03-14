import React, { ChangeEvent } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';

export class SearchBar extends React.Component {
  constructor(props: object) {
    super(props);
  }

  state = {
    searchValue: localStorage.getItem('search-value') || '',
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ searchValue: value });
  };

  handleSearchUpdate = () => {
    localStorage.setItem('search-value', this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  componentDidMount(): void {
    const value = localStorage.getItem('search-value');
    if (value) this.setState({ searchValue: value });
    window.addEventListener('beforeunload', this.handleSearchUpdate);
  }

  render() {
    return (
      <form
        className="search__wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSearchUpdate();
        }}
      >
        <input
          className="search__input"
          type="text"
          required={true}
          autoComplete="off"
          value={this.state.searchValue}
          onChange={(e) => {
            this.handleSearchChange(e);
          }}
        />
        <label className="search__label" htmlFor="name">
          Search
        </label>
        <button className="search__button" type="submit">
          <img className="search__icon" src={searchIcon} alt="Search" />
        </button>
      </form>
    );
  }
}
