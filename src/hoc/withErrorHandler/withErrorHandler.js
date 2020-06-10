import React, { Fragment, useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorViewedHandler] = useErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error} modalClose={errorViewedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
