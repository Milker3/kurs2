import React from 'react';

import { NavLink } from 'react-router-dom';

import flowerImg from './flower.svg';


const Navigation = () => {
  return (
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink to="/" exact>Главная</NavLink>
      </li>
      <li>
        <img alt='flower_image' src={flowerImg} className='navigation__img'/>
      </li>
      <li className="navigation__item">
        <NavLink to="cart-list">Корзина</NavLink>
      </li>
    </ul>
  )
};

export default Navigation;
