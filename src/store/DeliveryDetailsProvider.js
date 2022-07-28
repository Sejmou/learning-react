import React, { useState } from 'react';

import DeliveryDetailsContext from './delivery-details-context';

const DeliveryDetailsProvider = props => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    street: '',
    code: '',
    city: '',
  });

  const deliveryDetailsContext = {
    ...deliveryDetails,
    set: obj => {
      const { name, street, code, city } = obj;
      setDeliveryDetails({ name, street, code, city });
    },
    reset: () => {
      setDeliveryDetails({
        name: '',
        street: '',
        code: '',
        city: '',
      });
    },
  };

  return (
    <DeliveryDetailsContext.Provider value={deliveryDetailsContext}>
      {props.children}
    </DeliveryDetailsContext.Provider>
  );
};

export default DeliveryDetailsProvider;
