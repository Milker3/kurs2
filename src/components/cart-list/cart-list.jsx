import React from "react";
import CartListItem from "../cart-list-item";

const CartList = ({
  cartList,
  addFlowerInCart,
  removeFlowerFromCart,
  deletePurchasedFlower
}) => {
  return (
    <ul className="cart-list">
      {cartList.map((cart) => {
        const { id } = cart;

        return (
          <li key={id}>
            <CartListItem
              cart={cart}
              addFlowerInCart={addFlowerInCart}
              removeFlowerFromCart={removeFlowerFromCart}
              deletePurchasedFlower={deletePurchasedFlower}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CartList;
