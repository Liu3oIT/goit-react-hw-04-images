import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './form.module.css';
import { ReactComponent as Icon } from '../../icons/search.svg';

const Form = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };
  const requestSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('write you request.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    onSubmit(searchQuery);

    reset();
  };
  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={requestSubmit}>
        <button type="submit" className={css.button}>
          <Icon width="24" height="" />
        </button>
        <input
          onChange={handleInput}
          className={css.input}
          name="searchQuery"
          value={searchQuery}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Form;
