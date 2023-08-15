import React, {useState } from 'react';

import GalleryItem from '../GalleryItem/axiorequest';
import Form from '../FormForSubmit/form';

const Api = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const hendleSubmitFrom = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <>
      <Form onSubmit={hendleSubmitFrom} />
      <GalleryItem searchQuery={searchQuery} />
    </>
  );
};

export default Api;
