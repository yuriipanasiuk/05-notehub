import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';

import { NoteFormSchema } from '../../schema';
import type { Note } from '../../types/note.ts';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const fieldId = useId();

  const handleSubmit = () => {};

  const initialValue: Omit<Note, 'id'> = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title}`}>Title</label>
          <Field
            id={`${fieldId}-title}`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content}`}>Content</label>
          <Field
            id={`${fieldId}-content}`}
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag}`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag}`}
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
