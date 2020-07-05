import React from 'react';

import styles from './Order.module.css';

const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          border: '1px solid #ccc',
          margin: '4px 0',
          padding: '5px'
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={styles.Order}>
      <div>
        <p style={{ display: 'flex', flexFlow: 'column' }}>
          Ingredients: {ingredientOutput}
        </p>
      </div>
      <div>
        <p>Name: {props.orderData.name.value}</p>
        <p>Email: {props.orderData.email.value}</p>
        <p>Street: {props.orderData.street.value}</p>
        <p>ZIP: {props.orderData.zipCode.value}</p>
        <p>Country: {props.orderData.country.value}</p>
      </div>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        Price:
        <strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
