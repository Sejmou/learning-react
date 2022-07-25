import { useState } from 'react';

const useBackend = ({
  endpointName, // identifies a collection of items, e.g. Todos (stored as array of objects)
  postDataExtractionFn, // if this is present, we want to send data to the backend with POST, otherwise we are just doing a GET request
  successCallback, // gets the created item together with its ID in case of POST, or all items of the endpoint
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('creating hook for backend interaction, params:', {
    endpointName,
    postDataExtractionFn,
    successCallback,
  });

  const requestFn = async data => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/${endpointName}.json`,
        postDataExtractionFn
          ? {
              method: 'POST',
              body: JSON.stringify(postDataExtractionFn(data)),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          : null
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      if (postDataExtractionFn) {
        const responseData = await response.json();
        const generatedId = responseData.name; // firebase-specific => "name" contains generated id
        const createdObj = { id: generatedId, ...postDataExtractionFn(data) };
        successCallback(createdObj);
      } else {
        const loadedItems = [];

        for (const taskKey in data) {
          loadedItems.push({ id: taskKey, ...data[taskKey] });
        }
        console.log(loadedItems);
        successCallback(loadedItems);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return [requestFn, isLoading, error];
};

export default useBackend;
