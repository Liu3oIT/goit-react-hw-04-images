import React, {useState } from 'react';

import GalleryItem from '../GalleryItem/axiorequest';
import Form from '../FormForSubmit/form';

const Api = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Form onSubmit={setSearchQuery} />
      <GalleryItem searchQuery={searchQuery} />
    </>
  );
};

export default Api;
