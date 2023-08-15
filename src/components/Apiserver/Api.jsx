import React, { Component } from 'react';

import GalleryItem from '../GalleryItem/axiorequest';
import Form from '../FormForSubmit/form';


class Api extends Component {
  state = {
    searchQuery: '',
  };  

  hendleSubmitFrom = searchQuery => {
    this.setState({
      searchQuery,
    });
  };
  render() {
    return (
      <>
        <Form onSubmit={this.hendleSubmitFrom} />
        <GalleryItem searchQuery={this.state.searchQuery} />
      </>
    );
  }
}
export default Api;
