import React from "react";

import { useGlobalContext } from "../Context";
import "../css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
	const { onSubmitForm, loginUrl, input, handleInputs } = useGlobalContext();
	const { user_email, user_password } = input;

	return (
		<section className="login-container">
			<div className="login-form-center">
				<h1 className="section-title">Login</h1>
				<form
					className="login-form"
					onSubmit={(e) => onSubmitForm(e, loginUrl, user_email, user_password)}
				>
					<input
						className="input-email"
						type="email"
						name="user_email"
						placeholder="email"
						value={user_email}
						onChange={(e) => handleInputs("user_email", e.target.value)}
					/>
					<input
						className="input-password"
						type="password"
						name="user_password"
						placeholder="password"
						value={user_password}
						onChange={(e) => handleInputs("user_password", e.target.value)}
					/>
					<button className="login-button">Login</button>
					<Link to="/auth/register" className="login-button">
						<span>Move to Register</span>
					</Link>
				</form>
			</div>
		</section>
	);
};

export default Login;
