import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireUserAccess = (Component) => {
  const RequireUserAccessComponent = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('unige-connect_token');

    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    }, [token, navigate]);

    if (!token) {
      return null;
    } else {
      return <Component {...props} />;
    }
  };

  return RequireUserAccessComponent;
};

export default RequireUserAccess;
