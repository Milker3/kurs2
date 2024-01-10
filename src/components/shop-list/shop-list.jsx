import React from 'react';
import ShopListItem from "../shop-list-item";

const ShopList = ({ flowers, addFlowerInCart }) => {
  return (
    <section className="shop-list">
      <hr className='horizontal_line'/>
      <ul className="shop-list__list">
        {
          // Перебираем массив объектов, передавая каждый в компонент CartListItem.
          // В li передаём key, равный id и говорим, что при клике на элемент вызывается переданная функция, принимая id элемента
          flowers.map((flower) => {
            const { id } = flower;

            return (
              <li key={id.toString()}
                  className="shop-list__item"
                  onClick={() => addFlowerInCart(id)}
              >
                <ShopListItem flower={flower} />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
};

export default ShopList;
  