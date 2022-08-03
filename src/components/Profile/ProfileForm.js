import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';

import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const { token } = useContext(AuthContext);
  const passwordInputRef = useRef();
  const history = useHistory();

  const submitHandler = event => {
    event.preventDefault();

    const newPassword = passwordInputRef.current.value;

    // actually, we would need some kind of validation here

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKM7ZT4GWGBg8FNWOaeJyJVtggCpY3o0k',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      //assumption: we always succeed
      history.push('/');
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
