import React from 'react';

const CartListItem = ({ cart, addFlowerInCart, removeFlowerFromCart, deletePurchasedFlower }) => {
  const { name, url, count, totalPrice, id } = cart;

  return (
    <div className="cart-list-item">
      <div className="cart-list-item__header">
        <div className="cart-list-item__image">
          <img src={url} alt="Цветок" />
        </div>
        <h4 className='cart-list-item__name'>{name}</h4>
      </div>
      <div>
        <button className="button-cart" onClick={() => addFlowerInCart(id)}>+</button>
        <span className="cart-list-item__count">{count}</span>
        <button className="button-cart" onClick={() => removeFlowerFromCart(id)}>-</button>
      </div>
      <span className="cart-list-item__total-price">{totalPrice} руб</span>
      <button className="cart-list-item__delete" onClick={() => deletePurchasedFlower(id)}>Удалить</button>
    </div>
  )
};

export default CartListItem;
