import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

export default function Loader({ message }) {
  return (
    <div className={css.loader}>
      <p className={css.loaderMessage}>{message}</p>
      <ThreeDots height={40} color="#3f51b5" />
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};
