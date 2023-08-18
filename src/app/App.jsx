import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import '../styles/App.css';

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { DbContextProvider } from "../contexts/DbContext"
import { firebaseConfig } from '../config/firebase';

import { LoadingSpinner } from './Loading';
import { Success } from "./Success";
import { Scene } from "./Scene";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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