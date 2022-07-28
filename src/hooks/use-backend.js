import { useState, useCallback } from 'react';

const useBackend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // logic is simple: if body is provided in requestConfig, a POST request is sent to the Firebase backend at the provided endpoint
  // else, we do a GET request on the provided endpoint and return the data as a JS object
  // optional TODO: proper type checks etc. - won't do for this project
  const sendRequest = useCallback(async (requestConfig, handleResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('making request to Firebase with config', requestConfig);
      console.log('handleData', handleResponse);
      const response = await fetch(
        `https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/${requestConfig.endpoint}.json`,
        {
          method: requestConfig.body ? 'POST' : 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      handleResponse(data);
    } catch (err) {
      console.error('Error occured while sending request', err);
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useBackend;
