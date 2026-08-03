import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../../services/noteService.ts';
import EmptyNotes from '../EmptyNotes';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import Modal from '../Modal';
import NoteForm from '../NoteForm';
import NoteList from '../NoteList';
import Pagination from '../Pagination';
import SearchBox from '../SearchBox';
import css from './App.module.css';

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    setPage(1);
    setSearch(query);
  }, 350);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

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

      {isLoading && <Loader />}

      {data && notes.length > 0 && <NoteList notes={notes} />}

      {!isLoading && !isError && notes.length === 0 && <EmptyNotes />}

      {isError && <ErrorMessage />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
