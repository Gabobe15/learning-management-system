import { useState } from 'react';
import { login } from '../../utils/auth';
// import apiInstance from '../../utils/axios';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../plugin/Toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import icons

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const { error } = await login(email, password);
		if (error) {
			setIsLoading(false);
			Toast().fire({
				title: error,
				icon: 'error',
			});
		} else {
			navigate('/');
			setIsLoading(false);
		}
	};

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<>
			<BaseHeader />
			<section
				className="container d-flex flex-column vh-100"
				style={{ marginTop: '150px' }}
			>
				<div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
					<div className="col-lg-5 col-md-8 py-8 py-xl-0">
						<div className="card shadow">
							<div className="card-body p-6">
								<div className="mb-4">
									<h1 className="mb-1 fw-bold">Sign in</h1>
									<span>
										Don’t have an account?
										<Link to="/register/" className="ms-1">
											Sign up
										</Link>
									</span>
								</div>
								{/* Form */}
								<form
									className="needs-validation"
									noValidate=""
									onSubmit={handleSubmit}
								>
									{/* Email */}
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Email Address
										</label>
										<input
											type="email"
											id="email"
											className="form-control"
											name="email"
											onChange={(e) => setEmail(e.target.value)}
											placeholder="johndoe@gmail.com"
											required=""
										/>
										<div className="invalid-feedback">
											Please enter valid username.
										</div>
									</div>

									{/* Password with Show/Hide Toggle */}
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<div className="input-group">
											<input
												type={isPasswordVisible ? 'text' : 'password'}
												id="password"
												className="form-control"
												name="password"
												onChange={(e) => setPassword(e.target.value)}
												placeholder="**************"
												required=""
											/>
											<button
												type="button"
												className="btn btn-outline-secondary"
												onClick={togglePasswordVisibility}
											>
												{isPasswordVisible ? <BsEyeSlash /> : <BsEye />}
											</button>
										</div>
										<div className="invalid-feedback">
											Please enter valid password.
										</div>
									</div>

									{/* Checkbox */}
									<div className="d-lg-flex justify-content-between align-items-center mb-4">
										<div className="form-check">
											<input
												type="checkbox"
												className="form-check-input"
												id="rememberme"
												required=""
											/>
											<label className="form-check-label" htmlFor="rememberme">
												Remember me
											</label>
											<div className="invalid-feedback">
												You must agree before submitting.
											</div>
										</div>
										<div>
											<Link to="/forgot-password/">Forgot your password?</Link>
										</div>
									</div>

									<div className="d-grid">
										{isLoading ? (
											<button
												type="submit"
												disabled
												className="btn btn-primary"
											>
												Processing <i className="fas fa-spinner fa-spin"></i>
											</button>
										) : (
											<button type="submit" className="btn btn-primary">
												Sign in <i className="fas fa-user-plus"></i>
											</button>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<BaseFooter />
		</>
	);
}

export default Login;
