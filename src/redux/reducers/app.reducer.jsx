const INITIAL_STATE = {
  currentTable: [],
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_TABLE":
      return {
        ...state,
        currentTable: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
