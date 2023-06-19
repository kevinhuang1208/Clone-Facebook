import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	//
	const validEmail = new RegExp(
		'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
	 );


	// const [emailErr, setEmailErr] = useState(false);
    // const validate = (email) => {
    //   if (!validEmail.test(email)) {
    //      setEmailErr(true);
    //   }
	// }
   //

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validate(email);
		// if (emailErr) {
		// 	setErrors([
		// 		"Email must be formatted correctly"
		// 	])
		// 	setEmailErr(false)
		// 	return
		// }
		if (!validEmail.test(email)) {
			setErrors([
				"Email must be in valid format!"
			]);
			return
		 }
		if(password.length < 4 || confirmPassword.length < 4) {
			setErrors([
				"Password must be more than 3 characters!"
			])
			return
		}
		if(password.length > 20 || confirmPassword.length > 20) {
			setErrors([
				"Password cannot exceed 20 characters!"
			])
			return
		}
		if (password !== confirmPassword) {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
			return
		}
		setErrors([]);
		await dispatch(signUp(firstName, lastName, email, password));
		closeModal();

		// if (password === confirmPassword) {
		// 	const data = await dispatch(signUp(firstName, lastName, email, password));
		// 	if (data) {
		// 		setErrors(data);
		// 	} else {
		// 		closeModal();
		// 	}
		// } else {
		// 	setErrors([
		// 		"Confirm Password field must be the same as the Password field",
		// 	]);
		// }
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" disabled={!firstName || !lastName || !password || !confirmPassword || !email}>Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
