import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchApi } from 'services/api';

import { Loader } from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import css from './app-styles.module.css';

const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (searchRequest) {
      const fetchSearchRequest = async () => {
        try {
          setLoading(true);
          const data = await searchApi(searchRequest, page);
          if (!data.data.hits.length) {
            setLoading(false);
            toast.error(
              `Sorry, there are no images matching your search ${searchRequest}. Please try again.`,
              {
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
              }
            );
            return;
          } else {
            setImages(prevImages => [...prevImages, ...data.data.hits]);
            toast.success(`Hooray! We found ${data.data.hits.length} images.`);
          }
        } catch (error) {
          setError(error.messege);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchRequest();
    }
  }, [searchRequest, page, setLoading, setImages, setError]);

  const handleSearchbarSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setLargeImage('');
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmitBar={handleSearchbarSubmit} />

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
};

export default App;
