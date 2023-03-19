import React from "react";

// The extends keyword is used to create a child class of another class (parent). The child class inherits all the methods from another class.
class CartItem extends React.Component {
    constructor() {
        // In JS, whenever you are inheriting from parent class, we first need to call the constructor of the parent class, this is done by calling super()
        super();
        this.state = {
            price: 999,
            title: 'Phone',
            qty: 1,
            img: ''
        }
    }
    render() {
        // object destructuring: used to unpack values from arrays, or properties from objects, into distinct variables.
        const { price, title, qty } = this.state;
        
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} alt="item" />
                </div>
                <div className="right-block">
                    <div style={ {fontSize: 25} }> {title} </div>
                    <div style={ {color: '#777'} }> ₹ {price} </div>
                    <div  style={ {color: '#777'} }> Qty: {qty} </div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/4315/4315609.png" />
                        <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/7080/7080604.png" />
                        <img alt="delete" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/484/484560.png" />
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;