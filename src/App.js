import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </ThemeProvider>
    );
}

export default App;
