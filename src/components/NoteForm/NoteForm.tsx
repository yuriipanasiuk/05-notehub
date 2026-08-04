import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useId } from 'react';
import toast from 'react-hot-toast';

import { NoteFormSchema } from '../../schema';
import { createNote } from '../../services/noteService.ts';
import type { NewNote } from '../../types/note.ts';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create note');
      onClose();
    },
  });

  const initialValue: NewNote = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
