import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

import { ACCESS_TOKEN } from '../constants/login';
import { getMembers } from '../api/member';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserInfo {
  locationDatas: Array<any>;
  nickname: string;
  profileUrl: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  handleLogin: (accessToken: string) => void;
  handleLogout: () => void;
  handleUpdateUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileUrl: '',
    locationDatas: [],
  });

  const handleLogin = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserInfo({
        nickname: '',
        profileUrl: '',
        locationDatas: [],
      });

      return; // 로그인 상태가 아니면 추가 작업을 수행하지 않음
    }

    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const res = await getMembers(accessToken);
      const { data } = res;

      setUserInfo({
        nickname: data.data.nickname,
        profileUrl: data.data.profileUrl,
        locationDatas: data.data.locationDatas,
      });
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  const handleUpdateUserInfo = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const res = await getMembers(accessToken);
    const { data } = res;

    setUserInfo({
      nickname: data.data.nickname,
      profileUrl: data.data.profileUrl,
      locationDatas: data.data.locationDatas,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        handleLogin,
        handleLogout,
        handleUpdateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
