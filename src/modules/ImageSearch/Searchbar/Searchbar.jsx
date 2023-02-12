import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [pictureRequest, setPictureRequest] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    onSubmit(pictureRequest);

    reset();
  };

  const reset = () => {
    setPictureRequest('');
  };

  const onInputChange = ({ target: { value } }) => {
    setPictureRequest(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <AiOutlineSearch size="2em" />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          onChange={onInputChange}
          name="pictureRequest"
          value={pictureRequest}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
