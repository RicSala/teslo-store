export const cartReducer = (state, action) => {
  switch (action.type) {
    case '[CART] - LoadCart from cookies | storage':
      const newCart = [...action.payload]
      
      return {
        ...state,
        isLoaded: true,
        productsInCart: newCart,
      };

    case '[CART] - Update cart':
      return {
        ...state,
        productsInCart: action.payload,
      };

    case '[CART] - Update product quantity':
      return {
        ...state,
        productsInCart: 
          state.productsInCart.map((product) => {
            if (product._id === action.payload._id && product.size === action.payload.size) { // if the id and size are the same, then we have the same product and we have to update the quantity
            return action.payload }

            return product // if the id and size are not the same, then return the product
          })
      };

    case '[CART] - Remove product in cart':
      return {
        ...state,
        productsInCart: state.productsInCart.filter((product) => {
          return product._id !== action.payload._id || product.size !== action.payload.size
        })
      }

    case '[CART] - Update order summary':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
};