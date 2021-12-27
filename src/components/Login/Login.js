import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

//A reducer does NOT rely on the component itself
//It works only with the state that is passed to it!
//Therefore define outside of component function!
const emailReducer = (state, action) => {
  if (action.type == 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type == 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type == 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type == 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: '', isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  //Note: Max doesn't use context here, relies on props instead
  //props are generally still ok to use if we are not passing data through several layers
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    //initial state
    { value: '', isValid: null }
  );
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // extract only props that are relevant for side effect fn in useEffect below!
  // This way we save us from unncessary fn executions if only value changed but not validity
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log('cleanup');
      clearTimeout(timeoutID);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = event => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
