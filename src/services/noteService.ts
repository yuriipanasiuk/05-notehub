interface FetchNotesResponse {
  name: string;
}

export const fetchNotes = async (): Promise<FetchNotesResponse> => {
  return {
    name: 'test',
  };
};

export const createNote = async () => {};

export const deleteNote = () => {};
