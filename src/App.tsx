import React from 'react';
import styles from './App.module.css';
import EmojifyInput from "./EmojifyInput";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.app}>
        <EmojifyInput />
      </div>
    </ThemeProvider>
  );
}

export default App;
