import { useState, useEffect } from 'react';

// Note: you HAVE to use the "use" prefix to tell React that this function is a custom hook
// using this name also implies several hook-specific restrictions
// hooks may accept parameters like any other regular function
const useCounter = (forward = true) => {
  // state defined by a custom hook will be created/managed separately for each component that uses it
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => (forward ? prevCounter + 1 : prevCounter - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [forward]); // "hook parameters" used here must also be stated as dependency!

  // custom hooks may return whatever we want (primitive value, object, array, ...)
  return counter;
};

export default useCounter;
