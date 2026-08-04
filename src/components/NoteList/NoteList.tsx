import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteNote } from '../../services/noteService.ts';
import type { Note } from '../../types/note.ts';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, tag, content }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => mutate(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
