export const authReducer = (state, action) => {

  switch (action.type) {

    case '[AUTH] - Login':
      console.log("USER FROM REDUCER", action.payload)
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case '[AUTH] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
      
    default:
      return state;
  }
};