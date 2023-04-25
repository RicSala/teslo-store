export const uiReducer = (state, action) => {
  switch (action.type) {

    case '[UI] - toggle':
      console.log("from reducer")
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};