import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';
import Toast from '../plugin/Toast';

function AdminRegister() {
	const navigate = useNavigate();
	const [fullname, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [tel_no, setTel_no] = useState('');
	const [sex, setSex] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};

		if (!fullname) newErrors.fullname = 'Full name is required.';
		if (!email) newErrors.email = 'Email is required.';
		if (!tel_no) newErrors.tel_no = 'Full name is required.';
		if (!sex) newErrors.sex = 'Sex is required.';
		if (!role) newErrors.role = 'Role is required.';
		if (!password) newErrors.password = 'Password is required.';
		if (password !== password2) newErrors.password2 = 'Passwords do not match.';

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		// console.log(fullname, email,tel_no, sex, role, password, password2);
		setIsLoading(true);
		const { error } = await register(
			fullname,
			email,
			tel_no,
			sex,
			role,
			password,
			password2
		);
		if (error) {
			Toast().fire({
				title: error,
				icon: 'error',
			});
			setIsLoading(false);
		} else {
			setIsLoading(false);
			navigate('/');
			Toast().fire({
				title: 'Registration successful',
				icon: 'success',
			});

			// resetting form after submission
			setFullName('');
			setEmail('');
			setTel_no('');
			setRole('');
			setSex('');
			password('');
			password2('');
		}
	};

	return (
		<>
			<BaseHeader />

			<section className="container d-flex flex-column vh-90 my-4">
				<div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
					<div className="col-lg-5 col-md-8 py-8 py-xl-0">
						<div className="card shadow">
							<div className="card-body p-6">
								<div className="mb-4">
									<h1 className="mb-1 fw-bold">Sign up</h1>
								</div>
								{/* Form */}
								<form
									className="needs-validation"
									noValidate=""
									onSubmit={handleSubmit}
								>
									{/* Full Name */}
									<div className="mb-3">
										<label htmlFor="full_name" className="form-label">
											Full Name
										</label>
										<input
											type="text"
											id="full_name"
											onChange={(e) => setFullName(e.target.value)}
											className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
											name="fullname"
											placeholder="John Doe"
											required=""
										/>
										{errors.fullname && (
											<div className="invalid-feedback">{errors.fullname}</div>
										)}
									</div>

									{/* Email Address */}
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Email Address
										</label>
										<input
											type="email"
											id="email"
											className={`form-control ${errors.email ? 'is-invalid' : ''}`}
											onChange={(e) => setEmail(e.target.value)}
											name="email"
											placeholder="johndoe@gmail.com"
											required=""
										/>
										{errors.email && (
											<div className="invalid-feedback">{errors.email}</div>
										)}
									</div>
									{/* telephone number  */}
									<div className="mb-3">
										<label htmlFor="tel_no" className="form-label">
											Telephone phone
										</label>
										<input
											type="text"
											id="tel_no"
											onChange={(e) => setTel_no(e.target.value)}
											className={`form-control ${errors.tel_no ? 'is-invalid' : ''}`}
											name="tel_no"
											placeholder="+254 / 07..."
											required=""
										/>
										{errors.tel_no && (
											<div className="invalid-feedback">{errors.tel_no}</div>
										)}
									</div>

									{/* Sex */}
									<div className="mb-3">
										<label>Sex:</label>
										<div className="d-flex mb-2">
											<div
												className="form-check me-3"
												style={{ margin: '5px 10px' }}
											>
												<input
													type="radio"
													value="male"
													checked={sex === 'male'}
													onChange={(e) => setSex(e.target.value)}
													className="form-check-input"
													id="male"
												/>
												<label className="form-check-label" htmlFor="male">
													Male
												</label>
											</div>
											<div
												className="form-check"
												style={{ margin: '5px 10px' }}
											>
												<input
													type="radio"
													value="female"
													checked={sex === 'female'}
													onChange={(e) => setSex(e.target.value)}
													className="form-check-input"
													id="female"
												/>
												<label className="form-check-label" htmlFor="female">
													Female
												</label>
											</div>
										</div>
										{errors.sex && (
											<div className="text-danger">{errors.sex}</div>
										)}
									</div>

									{/* Role */}
									<div className="mb-3">
										<label>Role:</label>
										<select
											value={role}
											onChange={(e) => setRole(e.target.value)}
											className={`form-control w-100 ${errors.role ? 'is-invalid' : ''}`}
										>
											<option value="">----- select role ----</option>
											<option value="student">Student</option>
											<option value="teacher">Teacher</option>
											<option value="admin">Admin</option>
										</select>
										{errors.role && (
											<div className="text-danger">{errors.role}</div>
										)}
									</div>

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

									<div>
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

export default AdminRegister;
