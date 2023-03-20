import React from "react";
import CartItem from './CartItem'

// The extends keyword is used to create a child class of another class (parent). The child class inherits all the methods from another class.
class Cart extends React.Component {
    constructor() {
        // In JS, whenever you are inheriting from parent class, we first need to call the constructor of the parent class, this is done by calling super()
        super();
        this.state = {
            products: [
                {
                    item: 'Mobile',
                    price: 14999,
                    qty: 1,
                    img: '',
                    id: 1
                },
                {
                    item: 'Watch',
                    price: 2999,
                    qty: 1,
                    img: '',
                    id: 2
                },
                {
                    item: 'Laptop',
                    price: 45999,
                    qty: 1,
                    img: '',
                    id: 3
                },
            ]
        }
    }


    // Unlike regular functions, arrow functions do not have their own 'this'. 
    // The value of 'this' inside an arrow function remains the same throughout the lifecycle of the function
    // and is always bound to the value of 'this' in the closest non-arrow parent function.

    // Arrow Function
    handleIncreaseQunatity = (product) => {
        // this.state.qty++;             // this will only change qty in our state object, React doesn't refresh or re-render our component so it doesn't get reflected in JSX
        const { products } = this.state;
        const index = products.indexOf(product);

        products[index].qty += 1;
        // setState method-1
        // this.setState(() => {
        //     return {
        //         products: products
        //     }
        // })

        // setstate method-2
        this.setState({
            // products: products

            // using short-hand property, as key & value are same
            products
        });
    } 

    // Regular Function
    handleDecreaseQunatity(product) {
        const { products } = this.state;
        const index = products.indexOf(product);

        if(products[index].qty === 0){
            return;
        }
        products[index].qty -= 1;
        this.setState({
            products: products
        });
    }

    handleDeleteProduct = (id) => {
        const { products } = this.state;
        const items = products.filter((item) => {  // this will return an array that will contain products (item) whose id != given id
            return item.id !== id;
        })
        this.setState({
            products: items
        })
    }

    render() {
        const { products } = this.state;
        return (
            <div className="cart"> 
                {/* these qty, price, title img are props */}
                {/* <CartItem qty={1} price={999} item={"Watch"} img={''} /> */}
                
                {
                    products.map((prod) => {
                        return (
                            <CartItem 
                                product={prod} 
                                key={prod.id} 
                                onIncreaseQuantity={this.handleIncreaseQunatity}  // using arrow function, no binding required.
                                onDecreaseQuantity={this.handleDecreaseQunatity.bind(this)} // if we are using regular function we have to bind our function reference with 'this', else 'this' will get lost and will be undefined, because it is getting internally called via React, and not via any Object. 
                                onDeleteProduct={this.handleDeleteProduct}
                            />
                        );
                    })
                }
            </div>
        );
    }
};


export default Cart;