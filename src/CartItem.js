import React from "react";

const CartItem = (props) => {
    // object destructuring: used to unpack values from arrays, or properties from objects, into distinct variables.
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct } = props;  // props received from Cart Component
    const { item, price, qty, img } = props.product;  

    return (
        <div className="cart-item">
            <div className="left-block">
                <img 
                    style={styles.image}
                    src={img}
                />
            </div>
            <div className="right-block">
                <div style={ {fontSize: 25} }> {item} </div>
                <div style={ {color: '#777'} }> ₹ {price} </div>
                <div  style={ {color: '#777'} }> Qty: {qty} </div>
                <div className="cart-item-actions">
                    {/* Buttons */}
                    <img 
                        alt="increase" 
                        className="action-icons" 
                        src="https://cdn-icons-png.flaticon.com/512/4315/4315609.png" 
                        onClick={() => onIncreaseQuantity(product)}
                    />
                    <img 
                        alt="decrease" 
                        className="action-icons" 
                        src="https://cdn-icons-png.flaticon.com/512/7080/7080604.png" 
                        onClick={() => onDecreaseQuantity(product)}
                    />
                    <img 
                        alt="delete" 
                        className="action-icons" 
                        src="https://cdn-icons-png.flaticon.com/512/484/484560.png" 
                        onClick={() => onDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    image: {
        height: 150,
        width: 140,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;