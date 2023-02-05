import { useState } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import css from './search-bar.module.css';

const Searchbar = ({ onSubmitBar }) => {
  const [searchRequest, setSearchRequest] = useState('');

  const handleChange = evt => {
    setSearchRequest(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchRequest.trim() === '') {
      toast.info('Please enter a search request!', {
        position: toast.POSITION.TOP_LEFT,
        theme: 'colored',
      });
      return;
    }
    onSubmitBar(searchRequest);
    setSearchRequest('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <ImSearch />
        </button>

        <input
          name="searchRequest"
          className={css.input}
          type="text"
          value={searchRequest}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.protoTypes = {
  onSubmitBar: PropTypes.func.isRequired,
};
