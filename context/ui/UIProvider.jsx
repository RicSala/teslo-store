import { useReducer } from 'react';
import { UIContext, uiReducer } from '.';

const UI_INITIAL_STATE = {
  isMenuOpen: false,
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - toggle' });
  };


  return (
    <UIContext.Provider value={{
      ...state,

      // Methods
      toggleSideMenu
    }}>
      {children}
    </UIContext.Provider>
  );
};

