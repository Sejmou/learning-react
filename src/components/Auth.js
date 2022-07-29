import classes from './Auth.module.css';

const Auth = props => {
  const loginHandler = event => {
    // somewhere actual authentication would need to be added
    event.preventDefault();

    // for now we just assume every input is correct lol
    props.onLogin();
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
