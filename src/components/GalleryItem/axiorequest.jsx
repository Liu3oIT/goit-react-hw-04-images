import { Component } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Gallery } from './gallery';
import { ButtonLoadMore } from 'components/buttonLoadMore/button';
import css from './Listgallery.module.css'
import Modal from '../Modal/modal';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const BASEURL = 'https://pixabay.com/api/';
const KEY = '37736916-e03abe6b2ffeaa8f87161d473';
export default class GalleryItem extends Component {
  state = {
    articles: [],
    loading: false,
    page: 1,
    totalHits: 0,
    buttonMore: false,
    modalOpen: false,
    modalImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const newRequest = this.props.searchQuery;
    const prevRequest = prevProps.searchQuery;

    if (prevRequest !== newRequest) {
      this.setState(
        {
          articles: [],
          page: 1,
          buttonMore: false,
        },
        () => {
          this.fetchImages();
        }
      );
    }
  }
  handleMoreImg = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };
  fetchImages = async () => {
    const { searchQuery } = this.props;
    const { page } = this.state;
    this.setState({ loading: true });
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
        this.setState({
          articles: [],
          totalHits: 0,
          buttonMore: false,
        });

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

      this.setState(prevState => ({
        articles: [...prevState.articles, ...response.data.hits],
        totalHits: totalHits,
        buttonMore: totalHits > prevState.articles.length + hits.length,
      }));
      if(this.state.page === 1)
       toast.success(`${totalHits} images found.`, {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       });
    } catch (error) {
      console.log('Error', error);
    } finally {
      this.setState({ loading: false });
    }
  };
  openModal = imageUrl => {
    this.setState({
      modalOpen: true,
      modalImageUrl: imageUrl,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalImageUrl: '',
    });
  };

  render() {
    const {
      articles,
      loading,
      buttonMore,
      totalHits,
      modalOpen,
      modalImageUrl,
    } = this.state;

    return (
      <>
        <Gallery articles={articles} openModal={this.openModal} />
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
            onClose={this.closeModal}
          />
        )}
        {buttonMore && articles.length < totalHits ? (
          <ButtonLoadMore handleMoreImg={this.handleMoreImg} />
        ) : null}
      </>
    );
  }
}
