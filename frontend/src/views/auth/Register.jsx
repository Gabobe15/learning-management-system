import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
// import apiInstance from '../../utils/axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../utils/auth';
import Toast from '../plugin/Toast';

function Register() {
	const navigate = useNavigate();
	const [fullname, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const { error } = await register(fullname, email, password, password2);
		if (error) {
			Toast().fire({
				title: error,
				icon: 'error',
			});
			setIsLoading(false);
		} else {
			setIsLoading(false);
				Toast().fire({
					title: 'registration successful',
					icon: 'success',
				});
			navigate('/');
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
									<h1 className="mb-1 fw-bold">Sign up</h1>
									<span>
										Already have an account?
										<Link to="/login/" className="ms-1">
											Sign In
										</Link>
									</span>
								</div>
								{/* Form */}
								<form
									className="needs-validation"
									noValidate=""
									onSubmit={handleSubmit}
								>
									{/* Username */}
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Full Name
										</label>
										<input
											type="text"
											id="full_name"
											onChange={(e) => setFullName(e.target.value)}
											className="form-control"
											name="full_name"
											placeholder="John Doe"
											required=""
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Email Address
										</label>
										<input
											type="email"
											id="email"
											className="form-control"
											onChange={(e) => setEmail(e.target.value)}
											name="email"
											placeholder="johndoe@gmail.com"
											required=""
										/>
									</div>

									{/* Password */}
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<input
											type="password"
											id="password"
											className="form-control"
											onChange={(e) => setPassword(e.target.value)}
											name="password"
											placeholder="**************"
											required=""
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Confirm Password
										</label>
										<input
											type="password"
											id="password2"
											className="form-control"
											onChange={(e) => setPassword2(e.target.value)}
											name="password"
											placeholder="**************"
											required=""
										/>
									</div>
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
													Sign Up <i className="fas fa-user-plus"></i>
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

export default Register;
