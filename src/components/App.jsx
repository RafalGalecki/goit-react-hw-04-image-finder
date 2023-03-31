import { useState, useEffect } from 'react';
import css from './App.module.css';
import { fetchPhotosWithQuery, PER_PAGE } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

//const DELAY_TIME = 700;

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [largePhoto, setLargePhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    let inputValue = event.target.inputQuery.value;
    setQuery(inputValue.trim().toLowerCase());
    setIsLoading(true);
    setPhotos([]);
    setPage(1);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
  };
  useEffect(() => {
    if (!query) return;
    const getPhotos = async query => {
      try {
        const response = await fetchPhotosWithQuery(query, page);
        setPhotos(prev => [...prev, ...response.hits]);
        console.log('response', response);
        setTotalHits(response.totalHits);
        setAllPages(Math.ceil(response.totalHits / PER_PAGE));

        // if (response.length < 1) {
        //   await console.log('error - nothing found');
        // }
        // if (response.length > 12) {
        //   setIsLoading(true);
        //   console.log('more than 12');
        // }
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(query, page);
  }, [query, page]);

  const showModal = largeImg => {
    setIsModal(true);
    setLargePhoto(largeImg);
  };
  const hideModal = () => {
    setIsModal(!isModal);
    setLargePhoto('');
  };

  return (
    <div className={css.main}>
      <Searchbar onSubmit={onSubmit} />
      {/* {error ? <p>'Whoops, something went wrong: {error.message}</p> : null} */}
      {isLoading && <Loader />}
      <ImageGallery photos={photos} showModal={showModal} />
      {totalHits > 0 && page < allPages && page !== allPages && (
        <Button onClick={handleClick} />
      )}
      {isModal && <Modal hideModal={hideModal} largeImg={largePhoto} />}
    </div>
  );
};
