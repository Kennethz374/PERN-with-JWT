import React from "react";
import { useGlobalContext } from "../Context";

const Login = () => {
	const { onSubmitForm, loginUrl, input, handleInputs } = useGlobalContext();
	const { user_email, user_password } = input;

	return (
		<section className="login-container">
			<div className="login-form-center" style={{ textAlign: "center" }}>
				<h1>Login</h1>
				<form
					className="login-form"
					style={{
						display: "flex",
						flexDirection: "column",
						width: "80%",
						margin: "1rem auto",
					}}
					onSubmit={(e) => onSubmitForm(e, loginUrl, user_email, user_password)}
				>
					<input
						type="email"
						name="user_email"
						className="login-input"
						placeholder="email"
						value={user_email}
						onChange={(e) => handleInputs("user_email", e.target.value)}
					/>
					<input
						type="password"
						className="login-input"
						name="user_password"
						placeholder="password"
						value={user_password}
						onChange={(e) => handleInputs("user_password", e.target.value)}
					/>
					<button
						className="login-button"
						style={{ margin: "2rem auto", width: "30%" }}
					>
						Login
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
