import { IItem } from "../../@types/order";

import "./Dish.scss";

function Dish({ dish }: { dish: IItem }) {
  // console.log(dish);

  return (
    <div className="card dish w-96 bg-base-100 shadow-xl">
      <h3 className="card-title"> {dish.name}</h3>
      <div className="card-title">Price: ${dish.price}</div>
    </div>
  );
}

export default Dish;
