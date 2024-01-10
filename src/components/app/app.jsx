import React, { Component } from "react";

import { flowers } from "../../flowers";
import CartList from "../cart-list";
import ShopList from "../shop-list";
import Navigation from "../navigation";

import { Route } from "react-router-dom";


const updateCartList = (cartList, newFlower, index) => {

  if (newFlower.count === 0) {
    return [...cartList.slice(0, index), ...cartList.slice(index + 1)];
  }

  if (index === -1) {
    return [...cartList, newFlower];
  }

  return [...cartList.slice(0, index), newFlower, ...cartList.slice(index + 1)];
};

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
