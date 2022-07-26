import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // needed to wrap this in useCallback to make sure the function doesn't change every time the hook is called
  // without useCallback we would get an infinite loop as the component using this hook would receive a new sendRequest function, even though it might contain the exact same logic
  // remember: functions are objects in JS, therefore a newly created function is not equal to another with the same content (when compared with ===)
  // the reason for this is that they are in fact two separate objects, stored in different locations in memory
  const sendRequest = useCallback(async (requestConfig, handleData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      handleData(data);
    } catch (err) {
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

export default useHttp;
