import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  return async () => {
    try {
      await axiosPrivate.post('/sign_out', JSON.stringify({ user_id: parseInt(auth.user.user_id, 10) }));
    } catch (err) {
      console.error(err);
    }
    setAuth({});
  };
};

export default useLogout;
