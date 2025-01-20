import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Header from './components/Header';
import './styles/global.css';
// import './styles/components.css';

const App = () => {
    const [theme, setTheme] = useState('light-mode');

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light-mode' ? 'dark-mode' : 'light-mode'));
    };

    return (
        <div className={`app-container ${theme}`}>
            <Router>
                <Header toggleTheme={toggleTheme} theme={theme} />
                <Routes>
                    <Route path="/" element={<HomePage theme={theme} />} />
                    <Route path="/country/:name" element={<DetailPage theme={theme} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
