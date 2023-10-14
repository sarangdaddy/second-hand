import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import useAsync from '../../hooks/useAsync';
import { AUTHORIZATION_CODE } from '../../constants/login';
import { postLogin } from '../../api/login';

import * as S from './styles';
import { HOME, REGISTER } from '../../constants/routeUrl';

const Callback = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get(AUTHORIZATION_CODE);
  const { data } = useAsync(() => postLogin(code));
  const { handleLogin } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === 'FORBIDDEN') {
      const { nickname, profileUrl, oauthId } = data.data;
      navigate(
        `${REGISTER}?nickname=${nickname}&profileUrl=${profileUrl}&oauthId=${oauthId}`,
      );
    }

    if (data?.status === 'OK') {
      const { jwt } = data.data;
      handleLogin(jwt);
      navigate(HOME);
    }
  }, [data]);

  return (
    <>
      <S.Container>
        <S.loadingText>로딩중...</S.loadingText>
      </S.Container>
    </>
  );
};

export default Callback;
