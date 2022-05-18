import React, {
  useContext,
  createContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from 'react';

type User = {
  nip: string;
  nama: string;
  jabatan: string;
};

type ContextState = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<ContextState>({
  currentUser: null,
  setCurrentUser: () => {
    return {} as User;
  },
});

interface Props {
  user: User | null;
}
type AppProps = React.PropsWithChildren<Props>;
export const AuthProvider = ({ children, user }: AppProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
