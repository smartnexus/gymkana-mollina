import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import '../styles/App.css';

import { initializeApp } from "firebase/app";
import { forceLongPolling, getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { DbContextProvider } from "../contexts/DbContext"
import { firebaseConfig, providerKey } from '../config/firebase';

import { LoadingSpinner } from './Loading';
import { Success } from "./Success";
import { Scene } from "./Scene";
import { Live } from "./Live";
import { connectionHandler } from "../utils";
import { Header } from "./Header";

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(providerKey),
	isTokenAutoRefreshEnabled: true
});
const db = getDatabase(app);

const Index = () => {
	const navigate = useNavigate()
	const [visible, setVisible] = useState(false)

	const handleFooter = () => setVisible(!visible)

	return (<div>
		<img src="/logo192.png" alt="center" onDoubleClick={handleFooter}/>
		<p>Hecho con ❤️ por el equipo de dinamización de la orquesta 🎻</p>
		<div className="footer-wrapper">
			<div className={`footer live${visible?' show':''}`}>
				<div className="footer-body" style={{flexDirection: 'column'}}>
					<div className="footer-text">
						<p style={{fontSize: '1.5rem'}}>📊 Panel de progreso</p>
					</div>
					<button className="live-button" onClick={() => navigate('/live', {state: { admin: true }})}>Ver en directo</button>
				</div>
			</div>
		</div>
	</div>
	)
}

const App = () => {
	const [connected, setConnected] = useState(true)
	const handler = () => connectionHandler(db, setConnected)
	useEffect(() => {
		forceLongPolling()
		document.addEventListener("visibilitychange", handler);
		return () => {
			document.removeEventListener('visibilitychange', handler)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="App">
			<div className="App-body">
				<div className="header-container">
					<Header/>
				</div>
				<Suspense fallback={<LoadingSpinner/>}>
					<DbContextProvider value={db} status={connected}>
						<div className="main-container">
							<Router>
								<Routes>
									<Route path={`/location/:id`} Component={Scene}/>
									<Route path={`/success`} Component={Success}/>
									<Route path={`/live`} Component={Live}/>
									<Route path={'*'} Component={Index}/>
								</Routes>
							</Router>
						</div>
					</DbContextProvider>
				</Suspense>
			</div>
		</div>
	);
}

export default App;