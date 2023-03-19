import React from "react";

// The extends keyword is used to create a child class of another class (parent). The child class inherits all the methods from another class.
class CartItem extends React.Component {
    render() {
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={ {fontSize: 25} }> Phone </div>
                    <div style={ {color: '#777'} }> ₹ 999 </div>
                    <div  style={ {color: '#777'} }> Qty: 1 </div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
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