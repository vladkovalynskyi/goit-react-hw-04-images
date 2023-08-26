import React, { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import APIservices from 'Api/api';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default function ImageGallery({ searchQuery, showLargeImage }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    setStatus('pending');
    setData([]);
    setPage(1);

    const fetchData = async () => {
      try {
        const { hits, total } = await APIservices.fetchImages(searchQuery, page);
        setData(prevData => [...prevData, ...hits]);
        setTotal(total);
        setShowBtn(page < Math.ceil(total / 12));
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
              showLargeImage={showLargeImage}
            />
          ))}
        </ul>
        {showBtn && (
          <Button onClick={handleLoadMore} showLoader={showBtnLoader} />
        )}
      </section>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};