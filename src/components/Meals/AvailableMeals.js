import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useBackend from '../../hooks/use-backend';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

// Those meals were stored on Firebase as JSON object under the meals key, the object looks like this:
// {
//   "m1": {
//     "name": "Sushi",
//     "description": "Finest fish and veggies",
//     "price": 22.99
//   },
//   "m2":{
//     "name": "Schnitzel",
//     "description": "A german specialty!",
//     "price": 16.5
//   },
//   "m3":{
//     "name": "Barbecue Burger",
//     "description": "American, raw, meaty",
//     "price": 12.99
//   },
//   "m4":{
//     "name": "Green Bowl",
//     "description": "Healthy...and green...",
//     "price": 18.99
//   }
// }

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { sendRequest, isLoading, error } = useBackend();

  useEffect(() => {
    sendRequest({ endpoint: 'meals' }, data => {
      const extractedMeals = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setMeals(extractedMeals);
    });
  }, [sendRequest]);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = mealsList;

  if (error) {
    content = 'Could not fetch meals :/';
  }

  if (isLoading) {
    content = 'Loading our tasty meals...';
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
