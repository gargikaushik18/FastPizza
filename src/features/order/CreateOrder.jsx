import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { useState } from "react";
import { fetchAddress } from "../users/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoading = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;
  function handleGetLocation(e) {
    // console.log("button is clickin");
    e.preventDefault();
    dispatch(fetchAddress());
  }
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="order/new"> */}
      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            className="input grow"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoading}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
                {console.log(errorAddress)}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="z-500 absolute right-[3px] top-[3px] sm:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={handleGetLocation}
                disabled={isLoading}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus-offset-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
        </div>
        <Button disabled={isSubmitting || isLoading} type="primary">
          {isSubmitting
            ? "Placing Order....."
            : `Order Now  ${formatCurrency(totalPrice)}`}
        </Button>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  // pre processing the data before sending
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "pls provide your phone number we might be need to contact to you";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  //do not overuse this
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
