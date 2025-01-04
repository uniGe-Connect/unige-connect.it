import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user_context';
import { USER_TYPE } from '../Enum/userType';

const RequireProfAccess = (Component) => {
  const RequireUserAccessComponent = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('unige-connect_token');
    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    }, [token, navigate]);

    if (user) {
      if (user.type !== USER_TYPE.PROFESSOR) {
        navigate('/');
      } else {
        return <Component {...props} />;
      }
    }

    if (!token) {
      return null;
    } else {
      return <Component {...props} />;
    }
  };

  return RequireUserAccessComponent;
};

export default RequireProfAccess;
