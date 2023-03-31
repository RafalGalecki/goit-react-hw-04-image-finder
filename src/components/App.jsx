import { useState, useEffect } from 'react';
import css from './App.module.css';
import { fetchPhotosWithQuery, PER_PAGE } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';


export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [largePhoto, setLargePhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(false);

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
        setTotalHits(response.totalHits);
        setAllPages(Math.ceil(response.totalHits / PER_PAGE));
      }
      catch (error) {
      setError(true);
      }
      finally {
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
      {error ? <p style={{ marginTop: 100, fontWeight: 'bold' }}>Whoops, something went wrong...</p> : null}
      {isLoading && <Loader />}
      <ImageGallery photos={photos} showModal={showModal} />
      {totalHits > 0 && page < allPages && page !== allPages && (
        <Button onClick={handleClick} />
      )}
      {isModal && <Modal hideModal={hideModal} largeImg={largePhoto} />}
    </div>
  );
};
