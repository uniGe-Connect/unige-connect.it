import React, { useContext } from 'react';
import OfflineNav from './offlineNav';
import UserNav from './user_nav';
import { UserContext } from '../contexts/user_context';

function Nav() {
  const { user } = useContext(UserContext);

  return (
    user ? <UserNav /> : <OfflineNav />
  );
}

export default Nav;
