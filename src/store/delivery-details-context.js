import React from 'react';

const DeliveryDetailsContext = React.createContext({
  deliveryDetails: {
    name: '',
    street: '',
    code: '',
    city: '',
  },
  // dummy functions, filled with meaningful stuff in DeliveryDetailsProvider, only added for better IDE support
  set: () => {},
  reset: () => {},
});

export default DeliveryDetailsContext;

const deliveryDetailDisplayNames = {
  name: 'Your Name',
  street: 'Street',
  code: 'Postal code',
  city: 'City',
};

export { deliveryDetailDisplayNames };
