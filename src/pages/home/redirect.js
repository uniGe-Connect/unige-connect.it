import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user_context';

function Redirect() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(user);
    if (token) {
      localStorage.setItem('unige-connect_token', token);
      navigate('/dashboard');
    } else {
      localStorage.removeItem('unige-connect_token');
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  return <p>Redirecting...</p>;
}

export default Redirect;
