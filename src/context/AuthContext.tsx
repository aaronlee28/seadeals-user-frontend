import React, {
  createContext, FC, useMemo, useState,
} from 'react';

interface AuthToken {
  token?: string
}
interface Props {
  children: JSX.Element;
}
const AuthContext = createContext<{ auth: AuthToken, setAuth:(auth: AuthToken) => void }>(
  { auth: { token: '' }, setAuth: () => {} });

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<AuthToken>({});

  const providerAuth = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={providerAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
