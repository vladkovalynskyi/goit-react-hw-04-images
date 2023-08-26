import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  resetForm = () => {
    this.setState({ inputValue: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    if (!inputValue.trim()) {
      toast.warn('Search bar is empty! Please enter a search query.');
      this.resetForm();
      return;
    }

    onSubmit(inputValue);
    this.resetForm();
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button className={css.searchFormButton} type="submit">
            Search
          </button>
          <input
            className={css.searchFormInput}
            value={inputValue}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};