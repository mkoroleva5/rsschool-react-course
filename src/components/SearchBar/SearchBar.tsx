import React, { ChangeEvent } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';

export class SearchBar extends React.Component {
  state = {
    searchValue: localStorage.getItem('search-value') || '',
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ searchValue: value });
  };

  handleSearchSubmit = () => {
    this.setState({ searchValue: '' });
    localStorage.setItem('search-value', this.state.searchValue);
  };

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.handleSearchSubmit);
  }

  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.handleSearchSubmit);
    localStorage.setItem('search-value', this.state.searchValue);
  }

  render() {
    return (
      <form
        className="search__wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSearchSubmit();
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
        <label className="search__label">Search</label>
        <button className="search__button" type="submit">
          <img className="search__icon" src={searchIcon} alt="Search" />
        </button>
      </form>
    );
  }
}
