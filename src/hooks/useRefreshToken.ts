import jwt_decode from 'jwt-decode';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh/access-token', {
      withCredentials: true,
    });
    const decode:any = jwt_decode(response.data.data.id_token);
    const accessToken = response.data.data.id_token;
    const { user, scope } = decode;

    setAuth({ user, roles: scope.split(' '), accessToken });

    setAuth((prev:any) => ({ ...prev, accessToken }));

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
