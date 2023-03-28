import React from 'react';
import Cart from './Cart'
import NavBar from './NavBar'
import { db } from './firebase';
import { collection, query, where, orderBy, getDocs, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// The extends keyword is used to create a child class of another class (parent). The child class inherits all the methods from another class.
class App extends React.Component {
  constructor() {
    // In JS, whenever you are inheriting from parent class, we first need to call the constructor of the parent class, this is done by calling super()
    super();
    this.state = {
      products: [],
      loading: true,
    }
  }

  async componentDidMount() {
    /* Data update after refresh */

    // const q = collection(db, 'products');
    // const querySnapshot = await getDocs(q);
    
    // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());  
    // })

    // const products = querySnapshot.docs.map((doc) => {
    //   const data = doc.data();
    //   data['id'] = doc.id;
    //   return data;  
    // })

    // this.setState({
    //   products,
    //   loading: false
    // })


    /* Attaching a listener, Data Updates immediately */

    const q = collection(db, 'products');
    // const q = query(collection(db, 'products'), where('qty', '==', 3), where('price', '<', 15000));   // quering
    const unsub = onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;  
      })
  
      this.setState({
        products,
        loading: false
      }) 
    });
    
  }

  // Unlike regular functions, arrow functions do not have their own 'this'. 
  // The value of 'this' inside an arrow function remains the same throughout the lifecycle of the function
  // and is always bound to the value of 'this' in the closest non-arrow parent function.

  // Arrow Function
  handleIncreaseQunatity = async (product) => {
    // this.state.qty++;             // this will only change qty in our state object, React doesn't refresh or re-render our component so it doesn't get reflected in JSX
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // // setState method-1
    // // this.setState(() => {
    // //     return {
    // //         products: products
    // //     }
    // // })

    // // setstate method-2
    // this.setState({
    //   // products: products

    //   // using short-hand property, as key & value are same
    //   products
    // });

    /* we will be updating values in our firebase now */
    const q = collection(db, 'products');
    const docRef = doc(q, products[index].id);
    try {
      await updateDoc(docRef, {
        qty: products[index].qty + 1
      })
    } catch (e) {
      console.log('Error in Updating: ', e);
    }
  }

  // Regular Function
  async handleDecreaseQunatity(product) {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;
    // this.setState({
    //   products: products
    // });

    /* we will be updating values in our firebase now */
    const q = collection(db, 'products');
    const docRef = doc(q, products[index].id);
    try {
      await updateDoc(docRef, {
        qty: products[index].qty - 1
      })
    } catch (e) {
      console.log('Error in Updating: ', e);
    }
  }

  handleDeleteProduct = async (id) => {
    // const { products } = this.state;
    // const items = products.filter((item) => {  // this will return an array that will contain products (item) whose id != given id
    //   return item.id !== id;
    // })

    // this.setState({
    //   products: items
    // })

    /* we will be updating values in our firebase now */
    const q = collection(db, 'products');
    const docRef = doc(q, id);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.log('Error in Deleting: ', e);
    }
  }

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    for(let i in products){
      count += products[i].qty;
    }
    return count;
  }

  getTotalPrice = () => {
    const { products } = this.state;
    let price = 0;
    for(let i in products){
      price += products[i].price * products[i].qty;
    }
    return price;
  }

  addProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        item: "Product",
        qty: 1,
        price: 100,
        img: ''
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <NavBar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{padding: 20, fontSize: 20, cursor: 'pointer'}}> Add a Product </button>
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQunatity}  // using arrow function, no binding required.
          onDecreaseQuantity={this.handleDecreaseQunatity.bind(this)} // if we are using regular function we have to bind our function reference with 'this', else 'this' will get lost and will be undefined, because it is getting internally called via React, and not via any Object. 
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1> Loading Products... </h1>}
        <div style={ {fontSize: 20, padding: 10} }> TOTAL: ₹ {this.getTotalPrice()} </div>
      </div>
    );
  }
}

export default App;