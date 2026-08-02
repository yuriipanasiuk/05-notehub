import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import Modal from '../Modal';
import NoteForm from '../NoteForm';
import Pagination from '../Pagination';
import SearchBox from '../SearchBox';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService.ts';
import NoteList from '../NoteList';

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedSearch] = useDebounce(search, 1000);

  const { data } = useQuery({
    queryKey: ['note', debouncedSearch, page],
    queryFn: () => fetchNotes(page, debouncedSearch),
    // enabled: debouncedSearch !== '',
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearch = (query: string) => {
    setPage(1);
    setSearch(query);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
