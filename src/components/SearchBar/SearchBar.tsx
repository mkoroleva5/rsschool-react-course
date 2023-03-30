import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';
import { useEffect, useState } from 'react';

export interface IFormValues {
  search: string;
}
interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search-value') || '');

  useEffect(() => {
    localStorage.setItem('search-value', searchValue);
  }, [searchValue]);

  return (
    <form
      data-testid="search-form"
      className="search__wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchValue);
        setSearchValue('');
      }}
    >
      <input
        data-testid="search-input"
        className="search__input"
        type="text"
        required={true}
        value={searchValue}
        autoComplete="off"
        onChange={(e) => {
          const { value } = e.target;
          setSearchValue(value);
        }}
      />
      <label className="search__label">Search</label>
      <button className="search__button" type="submit">
        <img className="search__icon" src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};
