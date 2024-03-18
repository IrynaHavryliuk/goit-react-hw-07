import { deleteContact, fetchContacts } from '../../redux/contactsOps';
import { Contact } from '../Contact/Contact';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/filtersSlice';
import { useEffect } from 'react';
import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectContacts);
  const nameFilter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = userId => {
    dispatch(deleteContact(userId));
  };

  // Check if users is defined before filtering
  const filteredUsers = users ? users.filter(user =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  ) : [];

  return (
    <div className={css.contacts}>
      {filteredUsers.map(user => (
        <Contact key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};
