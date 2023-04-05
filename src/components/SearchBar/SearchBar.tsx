import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';
import { RootState } from '../../store';
import { addSearchValue, clearSearchValue } from '../../store/cardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

export interface IFormValues {
  search: string;
}
interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const search = useAppSelector((state: RootState) => state.cards.search);
  const dispatch = useAppDispatch();

  return (
    <form
      data-testid="search-form"
      className="search__wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search);
        dispatch(clearSearchValue(null));
      }}
    >
      <input
        data-testid="search-input"
        className="search__input"
        type="text"
        required={true}
        value={search}
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
