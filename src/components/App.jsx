import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchApi } from 'services/api';

import { Loader } from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import css from './app-styles.module.css';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    isModalOpen: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, searchRequest } = this.state;
    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchSearchRequest();
    }
  }

  async fetchSearchRequest() {
    try {
      this.setState({ loading: true });
      const { page, searchRequest } = this.state;
      const data = await searchApi(searchRequest, page);
      if (!data.data.hits.length) {
        this.setState({ loading: false });
        toast.error(
          `Sorry, there are no images matching your search ${searchRequest}. Please try again.`,
          {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
          }
        );
        return;
      } else {
        this.setState(({ images }) => ({
          images: [...images, ...data.data.hits],
        }));
        toast.success(`Hooray! We found ${data.data.hits.length} images.`);
      }
    } catch (error) {
      this.setState({ error: error.messege });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearchbarSubmit = searchRequest => {
    this.setState({ searchRequest, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({
      largeImage: largeImageURL,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      largeImage: '',
    });
  };

  render() {
    const { images, loading, error, largeImage, searchRequest, isModalOpen } =
      this.state;
    const { handleSearchbarSubmit, loadMore, closeModal, openModal } = this;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSearchbarSubmit} />

        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}

        {loading && <Loader />}
        {error && <p>{error}</p>}
        {!searchRequest && <p>Please enter a request</p>}

        <ToastContainer autoClose={3000} />

        {!loading && Boolean(images.length) && <Button onloadMore={loadMore} />}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
