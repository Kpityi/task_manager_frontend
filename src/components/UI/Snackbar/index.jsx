import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

const Snackbar = ({ message, severity, autoClose = 4000, visibility, reset, ...other }) => {
  useEffect(() => {
    if (visibility) {
      setTimeout(() => {
        reset();
      }, autoClose);
    }
  }, [visibility]);

  return (
    <div className={classNames('snackbar', `-${severity}`, visibility && '-show')}>
      <div className="snackbar__container">
        <div className={classNames('snackbar__icon-box', `-${severity}`)}>
          {severity == 'success' ? (
            <h2 className="snackbar__icon">&#x2713;</h2>
          ) : severity == 'error' ? (
            <h2 className="snackbar__icon">&#x2613;</h2>
          ) : (
            <h2>&#8505;</h2>
          )}
        </div>
        <div className="snackbar__textbox">
          <h2 className="snackbar__text">{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
