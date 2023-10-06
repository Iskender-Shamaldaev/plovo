import React, {useEffect} from 'react';
import DishItem from "./DishItem";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchDishes} from "../../store/dishesThunk";
import Spinner from "../../components/Spinner/Spinner";
import {selectDishes, selectFetchLoading} from "../../store/dishesSlice";


const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((selectDishes));
  const dishesLoading = useAppSelector((selectFetchLoading));

  useEffect(() => {
    dispatch(fetchDishes());
  },[dispatch]);

  let dishes: React.ReactNode = <Spinner/>;

  if (!dishesLoading) {

    dishes = items.map((item) => (
        <DishItem key={item.id}
                  dish={item}
        />
    ));
  }


  return (
    <>
      <h4>Dishes</h4>
      {dishes}
    </>
  );
};

export default Dishes;