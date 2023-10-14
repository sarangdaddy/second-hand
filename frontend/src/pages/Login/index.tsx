import * as S from './styles';

import { GITHUB_CLIENT_ID, GITHUB_OAUTH_URL } from '../../constants/login';
import Button from '../../components/Button';
import NavBarTitle from '../../components/NavBarTitle';
import teamLogo from '../../assets/images/teamLogo.png';

const Login = () => {
  const onLoginButtonClick = () => {
    window.location.assign(`${GITHUB_OAUTH_URL}?client_id=${GITHUB_CLIENT_ID}`);
  };

  return (
    <>
      <NavBarTitle type="high" centerTitle="내 계정" />
      <S.Container>
        <Button fullWidth active onClick={onLoginButtonClick}>
          GitHub 으로 로그인 하기
        </Button>
        <S.loginImg src={teamLogo} alt="teamLogo" />
      </S.Container>
    </>
  );
};

export default Login;
