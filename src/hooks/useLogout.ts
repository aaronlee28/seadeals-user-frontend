import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  return async () => {
    try {
      await axios.post(
        '/sign_out',
        JSON.stringify({ user_id: auth.user.user_id }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
    } catch (err) {
      console.error(err);
    }
    setAuth({});
  };
};

export default useLogout;
