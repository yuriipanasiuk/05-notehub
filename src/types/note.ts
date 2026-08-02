export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  title: string;
  content: string;
  tag: NoteTag;
}
