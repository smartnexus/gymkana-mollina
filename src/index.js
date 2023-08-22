import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts/AlbertSans-Bold.ttf'
import './fonts/AlbertSans-Regular.ttf'
import './styles/index.css'

import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	<App/>
	// </React.StrictMode>
);
