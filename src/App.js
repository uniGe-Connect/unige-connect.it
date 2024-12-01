import React, { useCallback, useEffect, useReducer } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { getApiClient } from './server/get_api_client';
import { UserContext } from './contexts/user_context';
import { LoaderContext } from './contexts/loader_context';
import { Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-user':
      return { ...state, user: action.me };
    case 'set-loader':
      return { ...state, loader: action.loader };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loader: false
  });
  const { user, loader } = state;

  useEffect(() => {
    if (localStorage.getItem('unige-connect_token')) {
      getApiClient()
        .me()
          .then((response) =>
          dispatch({ type: 'set-user', me: response.data })
        );
    }
  }, []);

  const setUser = useCallback((me) => {
    dispatch({ type: 'set-user', me: me });
  }, []);

  const setLoader = useCallback((loader) => {
    dispatch({ type: 'set-loader', loader: loader });
  }, []);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      <UserContext.Provider value={{ user, setUser }}>
          <CustomDimmer active={loader} inverted>
            <Loader size='large'>Loading</Loader>
          </CustomDimmer>
        <RouterProvider future={{ v7_startTransition: true }}router={router} />
      </UserContext.Provider>
    </LoaderContext.Provider>
  );
};

const CustomDimmer = styled(Dimmer)`
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;

`;

export default App;
