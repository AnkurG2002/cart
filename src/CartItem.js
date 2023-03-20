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
    // Unlike regular functions, arrow functions do not have their own 'this'. 
    // The value of 'this' inside an arrow function remains the same throughout the lifecycle of the function
    // and is always bound to the value of 'this' in the closest non-arrow parent function.
    IncreaseQuantity = () => {
        // this.state.qty++;             // this will only change qty in our state object, React doesn't refresh or re-render our component so it doesn't get reflected in JSX
        // console.log(this.state.qty);


        // setState is used to update and re-render our component
        // setState method-1
        // this.setState((prevState) => {
        //     return {
        //         qty: prevState.qty + 1
        //     }
        // })

        // setState method-2
        this.setState({ 
            qty: this.state.qty + 1
        });

    }
    DecreaseQuantity = () => {
        if(this.state.qty === 0){
            return;
        }
        this.setState({
            qty: this.state.qty - 1
        });
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
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/512/4315/4315609.png" 
                            // onClick={this.IncreaseQuantity.bind(this)} // We have to bind our function reference with 'this', else 'this' will get lost and will be undefined, because it is getting internally called via React, and not via any Object. 
                            onClick={this.IncreaseQuantity} // Another way to solve this problem is to use arrow function
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/512/7080/7080604.png" 
                            onClick={this.DecreaseQuantity}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/512/484/484560.png" 
                        />
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