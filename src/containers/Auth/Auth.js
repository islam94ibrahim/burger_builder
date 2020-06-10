import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') onSetAuthRedirectPath();
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, control) => {
    // in nested objects, only first level object will be cloned and others will still be pointing at the original object, so this ensures a deep copy
    const updateControl = updateObject(controls[control], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[control].validation),
      touched: true,
    });
    const updatedControls = updateObject(controls, {
      [control]: updateControl,
    });

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchToSignIn = () => {
    setIsSignUp(!isSignUp);
  };

  if (props.loading) return <Spinner />;

  if (props.isAuthenticated) return <Redirect to={props.authRedirectPath} />;

  let form = (
    <form onSubmit={submitHandler}>
      {Object.keys(controls).map((input) => {
        return (
          <Input
            key={input}
            elementType={controls[input].elementType}
            elementConfig={controls[input].elementConfig}
            value={controls[input].value}
            changed={(event) => inputChangedHandler(event, input)}
            invalid={!controls[input].valid && controls[input].validation}
            touched={controls[input].touched}
          />
        );
      })}
    </form>
  );

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <div className={styles.Auth}>
      {errorMessage}
      {form}
      <Button btnType="Success" clicked={submitHandler}>
        Submit
      </Button>
      <Button btnType="Danger" clicked={switchToSignIn}>
        Switch to {isSignUp ? 'Sign in' : 'Sign up'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
