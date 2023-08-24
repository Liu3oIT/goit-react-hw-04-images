import { useEffect, useState } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Gallery } from './gallery';
import { ButtonLoadMore } from 'components/buttonLoadMore/button';
import css from './Listgallery.module.css';
import Modal from '../Modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASEURL = 'https://pixabay.com/api/';
const KEY = '37736916-e03abe6b2ffeaa8f87161d473';

const GalleryItem = ({ searchQuery, articles, setArticles, setPage, page }) => {
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [buttonMore, setButtonMore] = useState(false);
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchImages() {
      setLoading(true);

      try {
        const response = await axios.get(BASEURL, {
          params: {
            q: searchQuery,
            key: KEY,
            page: page,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        });
        const { hits, totalHits } = response.data;
        if (hits.length === 0) {
          setArticles([]);
          setTotalHits(0);
          setButtonMore(false);
          toast.error('No images found.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          return;
        }

        setArticles(prevArticles => [...prevArticles, ...hits]);
        setTotalHits(totalHits);
        setButtonMore(true);

        if (page === 1) {
          toast.success(`${totalHits} images found.`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.log('Error', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [searchQuery, setArticles, page]);

  const handleMoreImg = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = imageUrl => {
    setModalOpen(true);
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl('');
  };

  return (
    <>
      <Gallery articles={articles} openModal={openModal} />
      {loading && (
        <div className={css.loader}>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass={''}
          />
        </div>
      )}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          imageUrl={modalImageUrl}
          onClose={closeModal}
        />
      )}
      {buttonMore && articles.length < totalHits ? (
        <ButtonLoadMore handleMoreImg={handleMoreImg} />
      ) : null}
    </>
  );
};

export default GalleryItem;
