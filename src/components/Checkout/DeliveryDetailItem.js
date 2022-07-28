import React from 'react';
import classes from './DeliveryDetailItem.module.css';

const DeliveryDetailItem = props => {
  return (
    <div className={classes.container}>
      <span className={classes.left}>{props.leftVal}</span>
      <span>{props.rightVal}</span>
    </div>
  );
};

export default DeliveryDetailItem;
