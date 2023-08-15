import css from './button.module.css';
export const ButtonLoadMore = ({ handleMoreImg }) => {
  return (
    <button onClick={handleMoreImg} className={css.button} type="button">
      Load More
    </button>
  );
};
