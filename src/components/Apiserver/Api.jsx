import React, { useState } from 'react';

import GalleryItem from '../GalleryItem/axiorequest';
import Form from '../FormForSubmit/form';

const Api = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const onFormSearch = query => {
    setSearchQuery(prevState => {
      if (prevState.searchQuery === searchQuery) return prevState;
      setSearchQuery(query);
      setPage(1);
      setArticles([]);
    });
  };
  return (
    <>
      <Form onSubmit={onFormSearch} />
      <GalleryItem
        searchQuery={searchQuery}
        articles={articles}
        setArticles={setArticles}
        setPage={setPage}
        page={page}
      />
    </>
  );
};

export default Api;
