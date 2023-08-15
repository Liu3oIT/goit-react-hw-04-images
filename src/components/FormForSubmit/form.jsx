import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './form.module.css';
import { ReactComponent as Icon } from '../../icons/search.svg';
class Form extends Component {
  state = {
    searchQuery: '',
  };
  handleInput = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };
  requestSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
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
    this.props.onSubmit(this.state.searchQuery);

    this.reset();
  };
  reset = () => {
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.requestSubmit}>
          <button type="submit" className={css.button}>
            <Icon width="24" height="" />
          </button>
          <input
            onChange={this.handleInput}
            className={css.input}
            name="searchQuery"
            value={this.state.searchQuery}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Form;
