import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import APIservices from 'Api/api';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
    data: [],
    total: '',
    page: 1,
    status: 'idle',
    showBtn: false,
    showBtnLoader: false,
  };

  async componentDidUpdate(prevProps) {
    const newSearchQuery = this.props.searchQuery;
    const { searchQuery, page } = this.state;

    if (prevProps.searchQuery !== newSearchQuery) {
      this.setState({
        searchQuery: newSearchQuery,
        data: [],
        page: 1,
        status: 'idle',
        showBtn: false,
      });

      this.setState({ status: 'pending' });
      await this.fetchImages(newSearchQuery, 1);
    } else if (page !== 1) {
      this.setState({ showBtnLoader: true });
      await this.fetchImages(searchQuery, page);
    }
  }

  fetchImages = async (searchQuery, page) => {
    try {
      const { hits, total } = await APIservices.fetchImages(searchQuery, page);

      this.setState(prevState => ({
        total,
        status: 'resolved',
        showBtnLoader: false,
        data: [...prevState.data, ...hits],
        showBtn: page < Math.ceil(total / 12),
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, data, total, status, showBtn, showBtnLoader } =
      this.state;

    if (status === 'idle') {
      return (
        <p className={css.galleryMessage}>
          Enter your query to find the images.
        </p>
      );
    }

    if (status === 'pending') {
      return <Loader message={'Loading images... Please, wait.'} />;
    }

    if (status === 'rejected') {
      return (
        <p className={css.galleryMessage} style={{ color: 'red' }}>
          Oops! Something went wrong. Please, try reloading the page.
        </p>
      );
    }

    if (status === 'resolved') {
      return (
        <section className={css.gallerySection}>
          <p className={css.galleryMessage}>
            We found {total} images for "{searchQuery}"!
          </p>
          <ul className={css.gallery}>
            {data.map(el => (
              <ImageGalleryItem
                key={el.id}
                imageInfo={el}
                showLargeImage={this.props.showLargeImage}
              />
            ))}
          </ul>
          {showBtn && (
            <Button onClick={this.handleLoadMore} showLoader={showBtnLoader} />
          )}
        </section>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
