import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { photos, showModal } = this.props;

    return (
      <ul className={css.gallery}>
        {photos.map(({ webformatURL, largeImageURL, id, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            showModal={showModal}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
