import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

//We wrap the ENTIRE App in AuthContextProvider because now, we have ONE central place for the state-management which is the dedicated context component/file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthContextProvider><App /></AuthContextProvider>);
