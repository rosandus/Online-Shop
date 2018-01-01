import React, { Component } from "react";
import { connect } from "react-redux";

import { removeItem } from "./../actions/cartActions";
import { syncQuantity } from "./../actions/catalogActions";

@connect(store => {
  return {
    itemList: store.cart
  };
})
export default class Cart extends Component {
  _removeFromCart(item) {
    this.props.dispatch(removeItem(item));
    this.props.dispatch(syncQuantity({ item: item, quantity: 0 }));
  }

  render() {
    const { itemList } = this.props;
    let subTotals = [];

    itemList.map(item => {
      subTotals.push(item.quantity * item.price);
    });

    return (
      <div className="cart">
        {itemList.length !== 0 ? (
          <div className="contains-items">
            <h3>Your Cart Summary</h3>

            <div className="cart-overview">
              <div className="item-count">
                <span>Item(s) in cart</span>
                <span className="count-meter">
                  {this.props.itemList && this.props.itemList.length}
                </span>
              </div>

              <div className="grand-total">
                <span>Grand Total (IDR)</span>
                <span className="total-amount">
                  {subTotals.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="contains-no-items">
            <h3>Oops! Your cart is empty!</h3>
            <h4>Add items to proceed</h4>
          </div>
        )}
      </div>
    );
  }
}
