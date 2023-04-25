import { useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from '.';
import Cookies from 'js-cookie';
import { tesloApi } from '../../api';
import axios from 'axios';
import { useRouter } from 'next/router';

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined, // When we load the app, we don't know the user
};

export const AuthProvider = ({ children }) => {

  const router = useRouter(); // 
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  // Every time the app loads we check if there is a token in the cookies and revalidate it
  useEffect(() => { // TODO: this is running twice, we need to fix it
    // get token from the cookies
    checkToken();
  }, []);


  const checkToken = async () => {

    if (Cookies.get('token') === undefined) return; // if there is no token, we don't do anything (we don't want to call the endpoint

    try {
      // call endpoint to validate token
      const {data} = await tesloApi.get('/user/validate-token')
      // revalidate token saving the new one
      Cookies.set('token', data.token);
      // dispatch action to update the user in the state
      dispatch({type: '[AUTH] - Login', payload: data.user});

    } catch (error) {
    // If there is an error, delete the token and the user from cookies
      Cookies.remove('token');
    }

  }




  const loginUser = async (email, password) => {
    try {
      const {data} = await tesloApi.post('/user/login', { email, password });
      const {token, user} = data;
      // Save token in cookies
      Cookies.set('token', token);
      // Save user in state
      dispatch({type: '[AUTH] - Login', payload: user});
      return true

    } catch (error) { // We only return one type of error because we don't want to show the user the error message
      console.log("ERROR!", error)
      return false
    }
  }


  
  const registerUser = async ({name, email, password}) => {

    try {
      const {data} = await tesloApi.post('/user/register', { name, email, password });
      const {token, user} = data;
      // Save token in cookies
      Cookies.set('token', token);
      // Save user in state
      dispatch({type: '[AUTH] - Login', payload: user});
      // return true
      return {
        hasError: false,
      }
      
    } catch (error) {
        if(axios.isAxiosError(error)) { // here we do want to give the user the error message
          return {
            hasError: true,
            error: error.response?.data.error
          }
        }
        return {
          hasError: true,
          error: 'Ha ocurrido un error inesperado'
        }
    } 

  }


  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('productsInCart');
    router.reload(); // reload the page to update the state instead of dispatching an action (as we removed the cookies, we don't have the user anymore)
  }



  // We return the state and the methods so we can use them in the components
  return (
    <AuthContext.Provider value={{ 
        ...state,
        
        // methods
        loginUser,
        registerUser,
        logoutUser,
        }}>
      {children}
    </AuthContext.Provider>
  );
};
