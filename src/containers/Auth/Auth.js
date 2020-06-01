import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  };

  inputChangedHandler = (event, control) => {
    // in nested objects, only first level object will be cloned and others will still be pointing at the original object, so this ensures a deep copy
    const updateControl = updateObject(this.state.controls[control], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.controls[control].validation
      ),
      touched: true,
    });
    const updatedControls = updateObject(this.state.controls, {
      [control]: updateControl,
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchToSignIn = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    if (this.props.loading) return <Spinner />;

    if (this.props.isAuthenticated)
      return <Redirect to={this.props.authRedirectPath} />;

    let form = (
      <form onSubmit={this.submitHandler}>
        {Object.keys(this.state.controls).map((input) => {
          return (
            <Input
              key={input}
              elementType={this.state.controls[input].elementType}
              elementConfig={this.state.controls[input].elementConfig}
              value={this.state.controls[input].value}
              changed={(event) => this.inputChangedHandler(event, input)}
              invalid={
                !this.state.controls[input].valid &&
                this.state.controls[input].validation
              }
              touched={this.state.controls[input].touched}
            />
          );
        })}
      </form>
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={styles.Auth}>
        {errorMessage}
        {form}
        <Button btnType="Success" clicked={this.submitHandler}>
          Submit
        </Button>
        <Button btnType="Danger" clicked={this.switchToSignIn}>
          Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
}

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
