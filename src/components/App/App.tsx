import { useState } from 'react';

import Modal from '../Modal';
import NoteForm from '../NoteForm';
import Pagination from '../Pagination';
import SearchBox from '../SearchBox';
import css from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination
          totalPages={10}
          currentPage={1}
          onPageChange={() => console.log('page')}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
