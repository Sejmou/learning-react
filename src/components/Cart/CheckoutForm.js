import React from 'react';

const CheckoutForm = () => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div className="form-control">
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" />
      </div>
      <div className="form-control">
        <label htmlFor="code">Postal Code</label>
        <input type="text" name="code" id="code" />
      </div>
      <div className="form-control">
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" />
      </div>
    </form>
  );
};

export default CheckoutForm;
