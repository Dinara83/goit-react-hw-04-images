import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import css from './search-bar.module.css';

export default class Searchbar extends Component {
  state = {
    searchRequest: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchRequest } = this.state;
    if (searchRequest.trim() === '') {
      toast.info('Please enter a search request!', {
        position: toast.POSITION.TOP_LEFT,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.searchRequest.trim());
    this.setState({ searchRequest: '' });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { searchRequest } = this.state;

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
  }
}

Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
