import useInput from '../hooks/use-input';

const BasicForm = props => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    changeHandler: firstNameInputChangeHandler,
    blurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(validateNonEmpty);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    changeHandler: lastNameInputChangeHandler,
    blurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput(validateNonEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    changeHandler: emailInputChangeHandler,
    blurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(email => validateEmail(email));

  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;

  const resetInputs = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const getFormControlClasses = invalid =>
    invalid ? 'form-control invalid' : 'form-control';

  const formSubmissionHandler = ev => {
    ev.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetInputs();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={getFormControlClasses(firstNameInputHasError)}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {firstNameInputHasError && (
            <p className="error-text">Please enter your first name!</p>
          )}
        </div>
        <div className={getFormControlClasses(lastNameInputHasError)}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Please enter your last name!</p>
          )}
        </div>
      </div>
      <div className={getFormControlClasses(emailInputHasError)}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please provide a valid e-mail address!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

function validateNonEmpty(str) {
  return str.trim() !== '';
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default BasicForm;
