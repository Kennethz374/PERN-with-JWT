import "./App.css";
import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Loading from "./components/Loading";
import { useGlobalContext } from "./Context";

const App = () => {
	const { isAuthenticated, verifyAuth } = useGlobalContext();

	useEffect(() => {
		verifyAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{/* <ActivityModal /> */}
				</Route>
				<Route exact path="/dashboard">
					{isAuthenticated === "loading" ? (
						<Loading />
					) : !isAuthenticated ? (
						<Redirect to="/auth/login" />
					) : (
						<Dashboard />
					)}
					{/* {!isAuthenticated ? <Redirect to="/auth/login" /> : <Dashboard />} */}
				</Route>

				<Route exact path="/auth/register">
					{!isAuthenticated ? <Register /> : <Redirect to="/auth/login" />}
				</Route>

				<Route exact path="/auth/login">
					{!isAuthenticated ? <Login /> : <Redirect to="/dashboard" />}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
