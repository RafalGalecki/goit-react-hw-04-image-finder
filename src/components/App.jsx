import { Component } from 'react';
import css from './App.module.css';
import { fetchPhotosWithQuery, PER_PAGE } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const DELAY_TIME = 700;

const INITIAL_STATE = {
  query: 'sweet cats',
  page: 1,
  totalHits: 0,
  allPages: 1,
  photos: [],
  largePhoto: '',
  isLoading: false,
  isModal: false,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    // get initial photos onload
    const response = await fetchPhotosWithQuery(this.state.query);
    
    this.setState({ photos: response.hits });

    setTimeout(async () => {
      this.setState({ isLoading: false });
    }, DELAY_TIME);
  }

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    
    const response = await fetchPhotosWithQuery(query, page);

    if (response.totalHits > 0) {
      let photos = [];
      response.hits.forEach(photo => {
        photos.push({
          id: photo.id,
          webformatURL: photo.webformatURL,
          largeImageURL: photo.largeImageURL,
          tags: photo.tags,
        });
      });

      const allPages = Math.ceil(response.totalHits / PER_PAGE);

     
      const previousPhotos = this.state.photos;

      if (page !== 1) {
        previousPhotos.forEach(element => {
          photos.forEach((photo, index, array) => {
            if (element.id === photo.id) {
              array.splice(index, 1);
            }
          });
        });
      }

      this.setState(prevState => {
        let photosToRender = [];
        
        page > 1
          ? (photosToRender = [...prevState.photos, ...photos])
          : (photosToRender = [...photos]);
        
        return {
          query,
          totalHits: response.totalHits,
          page,
          allPages,
          photos: photosToRender,
          isLoading: false,
        };
      });
    } else {
      this.setState({ ...INITIAL_STATE });
    }
  };

  showModal = largeImg => {
    this.setState({
      isModal: true,
      largePhoto: largeImg,
    });
  };
  hideModal = () => {
    this.setState({
      isModal: !this.state.isModal,
      largePhoto: '',
    });
  };

  render() {
    const {
      query,
      page,
      photos,
      totalHits,
      allPages,
      isLoading,
      error,
      largePhoto,
      isModal,
    } = this.state;

    return (
      <div className={css.main}>
        <Searchbar getPhotos={value => this.getPhotos(value, 1)} />
        {error ? <p>'Whoops, something went wrong: {error.message}</p> : null}
        {isLoading && <Loader />}
        <ImageGallery photos={photos} showModal={this.showModal} />
        {totalHits > 0 && page < allPages && page !== allPages && (
          <Button page={page} onClick={next => this.getPhotos(query, next)} />
        )}
        {isModal && <Modal hideModal={this.hideModal} largeImg={largePhoto} />}
      </div>
    );
  }
}
