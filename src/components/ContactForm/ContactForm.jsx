import { IMaskInput } from 'react-imask';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'The name must be no more than 50 characters long.')
    .required('This is a required field'),
  number: Yup.string()
    .min(7, 'Your phone number must contain 7 digits')
    .required('This is a required field'),
});

export const ContactForm = () => {
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, actions) => {
        dispatch(addContact({ id: nanoid(), ...values }));
        actions.resetForm();
      }}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.inputForm}>
          <label htmlFor={nameFieldId}>Name:</label>
          <Field className={css.nameInput} type="text" name="name" id={nameFieldId} />
          <ErrorMessage className={css.errorMessage} name="name" component="span" />
        </div>
        <div className={css.inputForm}>
          <label htmlFor={numberFieldId}>Number:</label>
          <Field name="number">
            {({ field }) => (
              <IMaskInput
                {...field}
                className={css.numberInput}
                mask="000-000-0000"
                definitions={{
                  '#': /[0-9]/,
                }}
                type="text"
                id={numberFieldId}
              />
            )}
          </Field>
          <ErrorMessage className={css.errorMessage} name="number" component="span" />
        </div>
        <button className={css.addBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};