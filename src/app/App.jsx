import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import '../styles/App.css';

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { DbContextProvider } from "../contexts/DbContext"
import { firebaseConfig } from '../config/firebase';

import { LoadingSpinner } from './Loading';
import { Success } from "./Success";
import { Scene } from "./Scene";
import { Live } from "./Live";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Index = () => {
	const navigate = useNavigate()
	const [visible, setVisible] = useState(true)

	const handleFooter = () => setVisible(!visible)

	return (<div>
		<img src="/logo192.png" alt="center" onDoubleClick={handleFooter}/>
		<p>Hecho con ❤️ por el equipo de dinamización de la orquesta 🎻</p>
		<div className={`footer live${visible?' show':''}`}>
			<div className="footer-body" style={{flexDirection: 'column'}}>
				<div className="footer-text">
					<p style={{fontSize: '1.5rem'}}>📊 Panel de progreso</p>
				</div>
				<button className="live-button" onClick={() => navigate('/live', {state: { admin: true }})}>Ver en directo</button>
			</div>
		</div>
	</div>
	)
}

const App = () => {
	return (
		<div className="App">
			<div className="App-body">
				<Suspense fallback={<LoadingSpinner/>}>
					<DbContextProvider value={db}>
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