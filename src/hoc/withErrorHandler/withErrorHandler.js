import React, { Fragment, useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use((request) => {
      setError(null);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => setError(error)
    );

    useEffect(() => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    }, [requestInterceptor, responseInterceptor]);

    const errorViewedHandler = () => setError(null);

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
