import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import AuthContext from '../../store/auth-context';

//define reducer outside of component fn -> relies only on provided state!
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
        <Input
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
