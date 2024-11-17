import React, { useCallback, useEffect, useReducer } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { getApiClient } from './server/get_api_client';
import { UserContext } from './contexts/user_context';

import Nav from './common/nav';
import Footer from './common/footer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-user':
      return { ...state, user: action.me };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });
  const { user } = state;

  useEffect(() => {
    if (localStorage.getItem('unige-connect_token')) {
      getApiClient()
        .me()
        .then((response) =>
          dispatch({ type: 'set-user', me: response.data.me })
        );
    }
  }, []);

  const setUser = useCallback((me) => {
    dispatch({ type: 'set-user', me: me });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Nav />
      <RouterProvider future={{ v7_startTransition: true }}router={router} />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
