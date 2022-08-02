import { useRef, useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = props => {
  const [formEdited, setFormEdited] = useState(false);
  const [submittedFormValue, setSubmittedFormValue] = useState(null);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    setSubmittedFormValue({ author: enteredAuthor, text: enteredText });
  }

  useEffect(() => {
    if (submittedFormValue) {
      props.onAddQuote(submittedFormValue);
    }
  }, [submittedFormValue]); // linter complains bc of props.onAddQuote but the suggested fix does not work lol - code works fine w/o adding dep

  const formChangeHandler = () => {
    setFormEdited(true);
  };

  return (
    <>
      <Prompt
        when={formEdited && !submittedFormValue}
        message={location =>
          'Are your sure you want to leave? All your entered data will be lost!'
        }
      />
      <Card>
        <form
          onChange={formChangeHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
