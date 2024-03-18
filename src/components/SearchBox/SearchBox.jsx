import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateNameFilter, selectFilter } from '../../redux/filtersSlice';

export const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectFilter);

  const handleInputChange = evt => {
    const newFilterValue = evt.target.value;
    dispatch(updateNameFilter(newFilterValue));
  };

  return (
    <div className={css.search}>
      <label className={css.searchForm}>
        Find contact by name
        <input
          className={css.searchInput}
          type="text"
          value={nameFilter}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};