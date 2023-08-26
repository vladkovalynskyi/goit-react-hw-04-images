import React, { useState } from 'react';
import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import Modal from 'components/Modal/Modal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const handleSearchSubmit = query => {
    setSearchQuery(query);
  };

  const handleToggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleShowLargeImage = (url, altText) => {
    setLargeImageURL(url);
    setAlt(altText);
    handleToggleModal();
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery searchQuery={searchQuery} showLargeImage={handleShowLargeImage} />
      <ToastContainer />
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
}

export default App;
