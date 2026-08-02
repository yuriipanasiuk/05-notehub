import type { ChangeEvent } from 'react';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}
const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const handleSearchNote = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();
    onSearch(searchValue);
  };

  return (
    <input
      onChange={handleSearchNote}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
