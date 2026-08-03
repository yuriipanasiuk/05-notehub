import type { NewNote, Note } from '../types/note.ts';
import { api } from './instance.ts';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      ...(search && { search }),
      perPage: 12,
    },
  });

  return data;
};

export const createNote = async (body: NewNote): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', body);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
};
