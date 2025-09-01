import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { addItem, getParentQuantityByID } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  console.log(pizza);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getParentQuantityByID(id));
  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    // console.log("I am click ", name);
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="p flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium,text-stone-500 text-sm uppercase ">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem id={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <>
              <Button type="small" onClick={handleAddToCart}>
                Add To Cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
