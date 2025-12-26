// src/utils/dataReducer.js

export const ACTIONS = {
  SET: "SET",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export function dataReducer(state, action) {    
  switch (action.type) {
    case ACTIONS.SET:        
      return action.payload; 

    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.UPDATE:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

    case ACTIONS.DELETE:
      return state.filter((item) => item.id !== action.payload); // payload adalah ID

    default:
      return state;
  }
}
