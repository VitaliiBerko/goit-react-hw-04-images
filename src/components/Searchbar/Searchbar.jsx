import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import s from '../styles.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchQuery: value.trim() });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      Notiflix.Notify.info('Введіть ваш запит');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({searchQuery: ''});
  };

  
  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleOnSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.button__label}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={searchQuery}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
