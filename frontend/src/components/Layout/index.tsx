import { Outlet } from 'react-router-dom';

import TabBar from '../TabBar';
import * as S from './styles';

const Layout = () => {
  return (
    <>
      <S.OutletStyle>
        <Outlet />
      </S.OutletStyle>
      <TabBar />
    </>
  );
};

export default Layout;
