import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router';

type User = {
  nip: string;
  nama: string;
  jabatan: string;
  cabangId?: string;
};

type ContextState = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

type AuthedContextState = {
  currentUser: User;
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
  const authRef = useRef(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authRef.current) {
      return;
    }
    if (!currentUser && location.pathname !== '/signin') {
      navigate('/signin');
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const useAuthed = () => {
  let context = useContext(AuthContext);
  if (!context.currentUser) {
    context.currentUser = {
      nip: '',
      nama: '',
      jabatan: '',
      cabangId: '',
    };
  }
  const authedContext: AuthedContextState = {
    currentUser: context.currentUser,
  };
  return authedContext;
};
