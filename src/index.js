import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './fonts/AlbertSans-Bold.ttf'
import './fonts/AlbertSans-Regular.ttf'
import './styles/index.css'

import App from './app/App';
import { LoadingSpinner } from './app/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	<Suspense fallback={<LoadingSpinner/>}>
		<App/>
	</Suspense>
	// </React.StrictMode>
);
