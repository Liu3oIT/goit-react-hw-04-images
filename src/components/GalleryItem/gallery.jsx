import React from 'react';
import css from './Listgallery.module.css';
export const Gallery = ({ articles, openModal }) => {
  return (
    <ul className={css.gallery}>
      {articles &&
        articles.map(({ largeImageURL, id }) => (
          <li className={css.gallery_item} key={id}>
            <img
              className={css.imgae}
              src={largeImageURL}
              alt=""
              onClick={() => openModal(largeImageURL)} 
            />
          </li>
        ))}
    </ul>
  );
};