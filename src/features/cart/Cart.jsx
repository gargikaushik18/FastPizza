import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem, getCart } from "./cartSlice";
import { getUser } from "../users/userSlice";

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function Cart() {
  const username = useSelector(getUser);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu" type="primary">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="divide-stone- mt-3 divide-y border">
        {cart.map((el) => (
          <CartItem item={el} key={el.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
