import React from 'react';

const ShopListItem = ({ flower }) => {
  const { name, description, price, url } = flower

  return (
    <div className="shop-list-item">
      <div className="shop-list-item__header">
        <div className="shop-list-item__image">
          <img src={url} alt="Картинка цветка" className="shop-list-item__url" />
        </div>
        <h3 className="shop-list-item__name">{name}</h3>
      </div>
      <div className="shop-list-item__content">
        <p className="shop-list-item__description">{description}</p>
        <span className="shop-list-item__price">Цена: {price} руб</span>
      </div>
      <button className="button">В корзину</button>
    </div>
  )
};

export default ShopListItem;
