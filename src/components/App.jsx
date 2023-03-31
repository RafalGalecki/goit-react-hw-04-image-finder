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
  //const [isButton, setIsButton] = useState(true);

  // get initial photos - don't use useEffect

  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   // get initial photos onload
  //   const response = await fetchPhotosWithQuery(this.state.query);

  //   this.setState({ photos: response.hits });

  //   setTimeout(async () => {
  //     this.setState({ isLoading: false });
  //   }, DELAY_TIME);
  // }
  const onSubmit = event => {
    event.preventDefault();
    let inputValue = event.target.inputQuery.value;
    setQuery(inputValue.trim().toLowerCase());
    setIsLoading(true);
    setPhotos([]);
    setPage(1);
    event.target.reset();
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
    //setIsButton(true);
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

        if (response.length < 1) {
          console.log('error - nothing found');
        }
        if (response.length > 12) {
          setIsLoading(true);
          //setIsButton(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(query, page);
  }, [query, page]);
  // const getPhotos = async (query, page) => {
  //   this.setState({ isLoading: true });

  //   const response = await fetchPhotosWithQuery(query, page);

  //   if (response.totalHits > 0) {
  //     let photos = [];
  //     response.hits.forEach(photo => {
  //       photos.push({
  //         id: photo.id,
  //         webformatURL: photo.webformatURL,
  //         largeImageURL: photo.largeImageURL,
  //         tags: photo.tags,
  //       });
  //     });

  //     setAllPages(Math.ceil(response.totalHits / PER_PAGE));

  //     const previousPhotos = photos;

  //     if (page !== 1) {
  //       previousPhotos.forEach(element => {
  //         setPhotos(
  //           photos.forEach((photo, index, array) => {
  //             if (element.id === photo.id) {
  //               array.splice(index, 1);
  //             }
  //           })
  //         );
  //       });

  //       if (page > 1) {
  //         setPhotos(prev => [...prev.photos, ...photos]);
  //       } else {
  //         setPhotos(...photos);
  //       }

  //       setQuery(query);
  //       setTotalHits(response.totalHits);
  //       setPage(page);
  //       setAllPages(allPages);
  //       setIsLoading(false);
  //     }
  //     // return {
  //     //   query,
  //     //   totalHits: response.totalHits,
  //     //   page,
  //     //   allPages,
  //     //   photos: photosToRender,
  //     //   isLoading: false,
  //     // };
  //   }
  // };

  const showModal = largeImg => {
    setIsModal(true);
    setLargePhoto(largeImg);
  };
  const hideModal = () => {
    setIsModal(!isModal);
    setLargePhoto('');
  };

  // render() {
  //   const {
  //     query,
  //     page,
  //     photos,
  //     totalHits,
  //     allPages,
  //     isLoading,
  //     error,
  //     largePhoto,
  //     isModal,
  //   } = this.state;

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
