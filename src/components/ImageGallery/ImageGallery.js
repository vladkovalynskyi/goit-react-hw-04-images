import css from './ImageGallery.module.css';
import { useState, useEffect } from 'react';
import { usePrevious } from '@reactuses/core';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import APIservices from 'Api/api';

export default function ImageGallery({ newSearchQuery, showLargeImage }) {
  const [searchQuery, setSearchQuery] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  const prevPage = usePrevious(page);

  useEffect(() => {
    if (!newSearchQuery) return;

    const fetchImages = async (query, page) => {
      try {
        const { hits, total } = await APIservices.fetchImages(query, page);

        setData(prevData => [...prevData, ...hits]);
        setTotal(total);
        setShowBtn(page < Math.ceil(total / 12) ? true : false);
        setShowBtnLoader(false);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };

    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setData([]);
      setPage(1);
      setStatus('pending');

      fetchImages(newSearchQuery, 1);
      return;
    }

    if (prevPage !== page && data.length !== 0) {
      setShowBtnLoader(true);
      fetchImages(searchQuery, page);
      return;
    }
  }, [page, newSearchQuery, searchQuery, prevPage, data.length]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <p className={css.galleryMessage}>Enter your query to find the images.</p>
    );
  }

  if (status === 'pending') {
    return <Loader message={'Loading images... Please, wait.'} />;
  }

  if (status === 'rejected') {
    return (
      <p className={css.galleryMessage} style={{ color: 'red' }}>
        Oops! Something went wrong. Please, try reload the page.
      </p>
    );
  }

  if (status === 'resolved') {
    return (
      <section className={css.gallerySection}>
        <p className={css.galleryMessage}>
          We found {total} images for "{newSearchQuery}"!
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
  newSearchQuery: PropTypes.string.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};