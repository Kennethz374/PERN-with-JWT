import "./App.css";
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { useGlobalContext } from "./Context";

const App = () => {
	const { isAuthenticated } = useGlobalContext();

	return (
		<Router>
			<Switch>
				<Route exact path="/auth/register">
					{!isAuthenticated ? <Register /> : <Redirect to="/auth/login" />}
				</Route>

				<Route exact path="/auth/login">
					{!isAuthenticated ? <Login /> : <Redirect to="/dashboard" />}
				</Route>

				<Route exact path="/dashboard">
					{isAuthenticated ? <Dashboard /> : <Redirect to="/auth/login" />}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
