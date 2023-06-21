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
		<div className="wholeSignUpContainer">
			<div className="signUpTextContainer">
				<div className="signUpText">
				<h2>Sign Up</h2>
				<p>It's quick and easy.</p>
				</div>
				<div className="xButton" onClick={closeModal}>✖</div>
			</div>
			<form onSubmit={handleSubmit} id="signUpForm">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="nameFields">
				<input className="nameInputs"
					placeholder="First Name"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<input className="nameInputs"
					placeholder="Last Name"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				</div>
				<input className="signUpFormInputs"
					placeholder="Email"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input className="signUpFormInputs"
					placeholder="New Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input className="signUpFormInputs"
					placeholder="Confirm New Password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<div className="smallText">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.</div>
				<button className='signUpButton' type="submit" disabled={!firstName || !lastName || !password || !confirmPassword || !email}>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
