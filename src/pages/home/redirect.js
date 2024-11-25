import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('unige-connect_token', token);
      navigate('/dashboard');
    } else {
      localStorage.removeItem('unige-connect_token');
      navigate('/');
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}

export default Redirect;
