<<<<<<< HEAD
=======
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

>>>>>>> 822f71f (FEAT: TabBar를 이용한 라우터 기능 구현)
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';
import GlobalStyles from '../../styles/GlobalStyles';
<<<<<<< HEAD
import NavBarHome from '../NavBarHome';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NavBarHome type="low" />
      </ThemeProvider>
    </>
=======
import HomePage from '../HomePage';
import SalesPage from '../SalesPage';
import HeartPage from '../HeartPage';
import ChatPage from '../ChatPage';
import AccountPage from '../AccountPage';
import ErrorPage from '../ErrorPage';
import Layout from '../Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sales', element: <SalesPage /> },
      { path: '/heart', element: <HeartPage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '/account', element: <AccountPage /> },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
>>>>>>> 822f71f (FEAT: TabBar를 이용한 라우터 기능 구현)
  );
};

export default App;
