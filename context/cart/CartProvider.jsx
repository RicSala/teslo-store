import { useEffect, useReducer, useRef } from 'react';
import { CartContext, cartReducer } from '.';
import Cookie from 'js-cookie';

const CART_INITIAL_STATE = {
  isLoaded: false,
  productsInCart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};



// TODO: why this component is loading twice???
export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);


  const isMounted = useRef(false); // This is a workaround to avoid the useEffect to run twice, but it would be better to find out why it is running twice


  // This useEffect: load the cart from the cookie the first time the component loads
  useEffect(() => {

    if (isMounted.current) return; // if the component is already mounted, then return

    try {
      const cartFromCookies = Cookie.get('productsInCart') ? JSON.parse(Cookie.get('productsInCart')) : []; // get the cart from the cookie
      dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: cartFromCookies }) // and update the state

    } catch (error) {
      console.log("ERROR!", error)
      dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: [] })
    }
    isMounted.current = true; // set the component as mounted

  }, []); // run this effect only once


  // This useEffect: update the order summary state every time the cart changes
  useEffect(() => {

    const numberOfItems = state.productsInCart.reduce((prev, product) => prev + product.quantity, 0)
    const subtotal = state.productsInCart.reduce((prev, product) => prev + product.price * product.quantity, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const tax = subtotal * taxRate
    const total = subtotal + tax

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax,
      total
    }
    console.log("OrderSummary", orderSummary)

    dispatch({
      type: '[CART] - Update order summary',
      payload: orderSummary
    })

  }, [state.productsInCart]); // we do this every time the cart changes


  // This useEffect: save the cart to the cookie every time the cart changes
  useEffect(() => {
    Cookie.set('productsInCart', JSON.stringify(state.productsInCart)) // save the cart to the cookie (this is a side effect)...
  }, [state.productsInCart]); // ... when the cart changes


  // This useEffect: loads the shipping address from the cookie the first time the component loads
  useEffect(() => {
    const shippingAddressFromCookies = Cookie.get('address') ? JSON.parse(Cookie.get('address')) : undefined; // get the shipping address from the cookie

    if (!shippingAddressFromCookies) return; // if there is no shipping address in the cookie, then return

    dispatch({ type: '[CART] - Load shipping address from cookies | storage', payload: shippingAddressFromCookies }) // and update the state
  }, []); // run this effect only once


  const updateAddress = (address) => {
    Cookie.set('address', JSON.stringify(address))

    dispatch({ type: '[CART] - Update shipping address', payload: address }) // and update the state
  }


  // Given an array and an item, if the item is not in the array, then add it to the array, otherwise update the quantity
  const updateArray = (array, item) => {

    const itemIndex = array.findIndex((cartItem) => { // returns the index of the first element that satifies the condition
      return cartItem.id === item.id && cartItem.size === item.size // if the id and size are the same, then we have the same product
    })

    if (itemIndex === -1) { // if the item is not in the cart...
      return [...array, item] // ...add it to the cart
    } else {
      array[itemIndex].quantity += item.quantity // if the item is in the cart, then update the quantity
      return array // return the updated array
    }
  }

  // Given a product and quantity (in the product object), add it to the cart
  const addProductToCart = (product) => {

    const UpdatedCart = updateArray(state.productsInCart, product) // given a product and qty, create a new array of the cart

    dispatch({ // and update the state
      type: '[CART] - Update cart',
      payload: UpdatedCart
    });


  };


  const updateProduct = (product) => {
    dispatch({
      type: '[CART] - Update product quantity',
      payload: product
    })
  }


  const removeProductFromCart = (product) => {
    console.log("removeProductFromCart", product)

    dispatch({
      type: '[CART] - Remove product in cart',
      payload: product
    })
  }


  return (
    <CartContext.Provider value={{
      ...state,

      // methods
      addProductToCart,
      updateProduct,
      removeProductFromCart,
      updateAddress,
    }}>
      {children}
    </CartContext.Provider>
  );
};
