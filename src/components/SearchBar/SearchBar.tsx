import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addSearchValue, clearSearchValue } from '../../store/cardsSlice';

export interface IFormValues {
  search: string;
}
interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const searchValue = useSelector((state: RootState) => state.cards.search);
  const dispatch = useDispatch();

  return (
    <form
      data-testid="search-form"
      className="search__wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchValue);
        dispatch(clearSearchValue(null));
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
          dispatch(addSearchValue({ value }));
        }}
      />
      <label className="search__label">Search</label>
      <button className="search__button" type="submit">
        <img className="search__icon" src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};
