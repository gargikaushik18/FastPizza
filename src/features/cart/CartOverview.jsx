import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
function CartOverview() {
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);
  // console.log(totalQuantity);
  if (!totalQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4  px-4 uppercase text-stone-200 sm:px-6 md:text-base ">
      <p className="text-stone-30 font-semibol space-x-4 text-sm sm:space-x-4 ">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
