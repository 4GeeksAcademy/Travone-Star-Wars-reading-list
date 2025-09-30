import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from '../store';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const useGlobalReducer = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer must be used within StoreProvider');
  }
  return context;
};

export default useGlobalReducer;