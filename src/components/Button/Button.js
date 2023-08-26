import React from 'react';
import css from './Button.module.css';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function Button({ onClick, showLoader }) {
  return (
    <button
      className={css.button}
      type="button"
      aria-label="load more"
      onClick={onClick}
    >
      {showLoader ? (
        <ThreeDots height={12} color="#fff" />
      ) : (
        <span>Load more</span>
      )}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
};
