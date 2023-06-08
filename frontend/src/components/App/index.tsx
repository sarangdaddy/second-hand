import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';
import GlobalStyles from '../../styles/GlobalStyles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>Hello World!</div>
    </ThemeProvider>
  );
};

export default App;
