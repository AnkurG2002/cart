import React from "react";
import CartItem from './CartItem'

// since it didn't require any state, we can make it a functional component instead of class component
const Cart = (props) => {
    const { products } = props;
    return (
        <div className="cart">
            {
                products.map((prod) => {
                    return (
                        <CartItem
                            product={prod}
                            key={prod.id}
                            onIncreaseQuantity={props.onIncreaseQuantity}
                            onDecreaseQuantity={props.onDecreaseQuantity}
                            onDeleteProduct={props.onDeleteProduct}
                        />
                    );
                })
            }
        </div>
    );
};


export default Cart;