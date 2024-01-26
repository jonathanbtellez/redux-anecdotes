/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ANECDOTE_ADDED": {
      return (state = `Anecdote "${action.payload}" added`);
    }
    case "ANECDOTE_VOTED": {
      return (state = `Anecdote "${action.payload}" voted`);
    }
    case "ANECDOTE_ADDED_ERROR": {
      return (state = "Too short anecdote, must have lenght 5 or more");
    }
    case "CLEAR": {
      return (state = null);
    }
    default:
      return state;
  }
};

const AnecdoteContext = createContext();

export const useNotifyValue = () => {
  const notifyAndDispatch = useContext(AnecdoteContext);
  return notifyAndDispatch[0];
};

export const useNotifyDispatch = () => {
  const notifyAndDispatch = useContext(AnecdoteContext);
  return notifyAndDispatch[1];
};

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer);
  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;
