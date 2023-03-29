import { ChangeEvent, useEffect, useState } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';

export const SearchBar = () => {
  const savedSearchValue = localStorage.getItem('search-value');
  const [searchValue, setSearchValue] = useState(savedSearchValue || '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    setSearchValue('');
  };

  useEffect(() => {
    localStorage.setItem('search-value', searchValue);
  }, [searchValue]);

  return (
    <form
      data-testid="search-form"
      className="search__wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
    >
      <input
        data-testid="search-input"
        className="search__input"
        type="text"
        required={true}
        autoComplete="off"
        value={searchValue}
        onChange={(e) => {
          handleSearchChange(e);
        }}
      />
      <label className="search__label">Search</label>
      <button className="search__button" type="submit">
        <img className="search__icon" src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};
