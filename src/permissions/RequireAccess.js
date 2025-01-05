import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user_context';
import { USER_TYPE } from '../Enum/userType';

const RequireAccess = (Component) => {
  const RequireUserAccessComponent = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('unige-connect_token');
    useEffect(() => {
      if (user) {
        if (user.type === USER_TYPE.PROFESSOR) {
          navigate('/professor/dashboard');
        } else if (user.type === USER_TYPE.STUDENT) {
          navigate('/dashboard');
        }
      } else if (!token) {
        navigate('/');
      }
    }, [token, navigate, user]);

    if (!token) {
      return <Component {...props} />;
    }
  };

  return RequireUserAccessComponent;
};

export default RequireAccess;
