import { useState } from 'react';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import apiInstance from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../plugin/Toast';

function CreateNewPassword() {
	const { token } = useParams();
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();
	const validateForm = () => {
		const newErrors = {};
		if (!password) newErrors.password = 'Password is required.';
		if (password !== password2) newErrors.password2 = 'Passwords do not match.';

		return newErrors;
	};

	const handleCreatePassword = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return; // Prevent form submission
		}
		setIsLoading(true);
		Toast().fire({
			title: 'Password does not match',
			icon: 'warning',
		});

		try {
			await apiInstance.post(`user/reset/`, { token, password }).then((res) => {
				console.log(res.data);
				setIsLoading(false);
				Toast().fire({
					title: res.data.message,
					icon: 'warning',
				});
				navigate('/login/');
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
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
									<h1 className="mb-1 fw-bold">Create New Password</h1>
									<span>Choose a new password for your account</span>
								</div>
								<form
									className="needs-validation"
									noValidate=""
									onSubmit={handleCreatePassword}
								>
									{/* Password */}
									<div className="mb-3 position-relative">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<input
											type={showPassword ? 'text' : 'password'}
											id="password"
											className={`form-control ${errors.password ? 'is-invalid' : ''}`}
											onChange={(e) => setPassword(e.target.value)}
											name="password"
											placeholder="**************"
											required=""
										/>
										<i
											className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
											style={{
												cursor: 'pointer',
												top: '75%',
												right: '5%',
												transform: 'translateY(-50%)',
											}}
											onClick={() => setShowPassword(!showPassword)}
										></i>
										{errors.password && (
											<div className="invalid-feedback">{errors.password}</div>
										)}
									</div>

									{/* Confirm Password */}
									<div className="mb-3 position-relative">
										<label htmlFor="password2" className="form-label">
											Confirm Password
										</label>
										<input
											type={showPassword2 ? 'text' : 'password'}
											id="password2"
											className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
											onChange={(e) => setPassword2(e.target.value)}
											name="password2"
											placeholder="**************"
											required=""
										/>
										<i
											className={`fas ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
											style={{
												cursor: 'pointer',
												top: '75%',
												right: '5%',
												transform: 'translateY(-50%)',
											}}
											onClick={() => setShowPassword2(!showPassword2)}
										></i>
										{errors.password2 && (
											<div className="invalid-feedback">{errors.password2}</div>
										)}
									</div>

									{/* Submit Button */}
									<div>
										<div className="d-grid">
											{isLoading === true && (
												<button
													type="submit"
													disabled
													className="btn btn-primary"
												>
													Processing <i className="fas fa-spinner fa-spin"></i>
												</button>
											)}
											{isLoading === false && (
												<button type="submit" className="btn btn-primary">
													Reset password
												</button>
											)}
										</div>
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

export default CreateNewPassword;
