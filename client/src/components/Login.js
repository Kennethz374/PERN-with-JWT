import React from "react";
import { useGlobalContext } from "../Context";

const Login = () => {
	const { handleAuth, isAuthenticated } = useGlobalContext();

	return <div>tHIS IS THE LOGIN PAGE</div>;
};

export default Login;
