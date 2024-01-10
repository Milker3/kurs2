import React, { Component } from "react";

import { flowers } from "../../flowers";
import CartList from "../cart-list";
import ShopList from "../shop-list";
import Navigation from "../navigation";

import { Route } from "react-router-dom";

// Обновляем массив
// Принимает три аргумента: массив flowers, элемент который нужно обновить, индекс этого элемента
const updateCartList = (cartList, newFlower, index) => {
  // Если количество одного телефона равняется 0, убрать его из корзины
  if (newFlower.count === 0) {
    return [...cartList.slice(0, index), ...cartList.slice(index + 1)];
  }

  // Если индекс элемента -1, это значит что в корзине нет этого телефона
  // И его нужно добавить
  if (index === -1) {
    return [...cartList, newFlower];
  }

  // Если этот телефон есть, то массив нужно обновить
  // Телефон, будь он обычным или обновлённым получаем из второго аргумента
  // Таким образом вычисление, и структура объекта телефона находится в updateFlower
  return [...cartList.slice(0, index), newFlower, ...cartList.slice(index + 1)];
};

// Функция, занимающаяся проверкой и структурой телефона
// Принимает три параметра, полученный телефон, телефон в корзине (если тот есть), и количество которое нужно купить
// Если телефон в корзине есть, то возвращаем все поля телефона, изменяя его totalPrice и count, которое зависит от количества купленного
// Если телефона в корзине нет, то возвращаем объект, который содержит нужные для дальнейшего поля
const updateFlower = (getFlower, flowerInCart, quantity) => {
  if (flowerInCart) {
    return {
      ...flowerInCart,
      totalPrice: flowerInCart.totalPrice + quantity * getFlower.price,
      count: flowerInCart.count + quantity
    };
  }

  return {
    id: getFlower.id,
    name: getFlower.name,
    url: getFlower.url,
    totalPrice: getFlower.price,
    count: 1
  };
};

class App extends Component {
  state = {
    cartList: []
  };

  // Функция получает на вход id элемента (повторение кода сознательное)
  // Что мы делаем?
  // 1. Получаем телефон из массива с телефонами благодаря принимаемому id
  // 2. Получаем индекс телефон из корзины по id, если тот конечно есть
  // 3. Если он есть, то получаем сам элемент: cartList[getFlowerIndex]
  // ---
  // Затем приступаем к изменению массива,
  // Используем updateFlower
  // Первая функция проверяет телефон и принимает два параметра. Первый - это телефон, которы получили, второй телефон в корзине.
  // Если этот телефон есть, возвращаем все его поля, изменяя лишь некоторые, если нет возвращаем нужный объект с телефоном
  // Используем updateCartList, который принмает три параметра: массив корзины, телефон, который хотим добавить, индекс телефона
  // Если индекс === -1, возвращаем весь массив корзины, добавляя телефон, если есть делаем операцию, которую можно посмотреть в функции
  addFlowerInCart = (id) => {
    const { cartList } = this.state;

    this.setState(() => {
      const getFlower = flowers.find((flower) => flower.id === id);
      const getFlowerIndex = cartList.findIndex((flower) => flower.id === id);
      const flowerInCart = cartList[getFlowerIndex];

      const newFlower = updateFlower(getFlower, flowerInCart, 1);
      const newArray = updateCartList(cartList, newFlower, getFlowerIndex);

      return {
        cartList: newArray
      };
    });
  };

  removeFlowerFromCart = (id) => {
    const { cartList } = this.state;

    this.setState(() => {
      const getFlower = flowers.find((flower) => flower.id === id);
      const getFlowerIndex = cartList.findIndex((flower) => flower.id === id);
      const flowerInCart = cartList[getFlowerIndex];

      const newFlower = updateFlower(getFlower, flowerInCart, -1);
      const newArray = updateCartList(cartList, newFlower, getFlowerIndex);

      return {
        cartList: newArray
      };
    });
  };

  deletePurchasedFlower = (id) => {
    const { cartList } = this.state;

    this.setState(() => {
      const getFlower = flowers.find((flower) => flower.id === id);
      const getFlowerIndex = cartList.findIndex((flower) => flower.id === id);
      const flowerInCart = cartList[getFlowerIndex];

      const newFlower = updateFlower(getFlower, flowerInCart, -flowerInCart.count);
      const newArray = updateCartList(cartList, newFlower, getFlowerIndex);

      return {
        cartList: newArray
      };
    });
  };

  render() {
    return (
      <main className="app">
        <Navigation />
        <Route
          path="/"
          exact
          render={() => {
            return (
              <ShopList flowers={flowers} addFlowerInCart={this.addFlowerInCart} />
            );
          }}
        />
        <Route
          path="/cart-list"
          exact
          render={() => {
            return (
              <CartList
                cartList={this.state.cartList}
                addFlowerInCart={this.addFlowerInCart}
                removeFlowerFromCart={this.removeFlowerFromCart}
                deletePurchasedFlower={this.deletePurchasedFlower}
              />
            );
          }}
        />
        <hr className="horizontal_line2"></hr>
        <p className="author">©Курочкин Егор</p>
      </main>
    );
  }
}

export default App;
