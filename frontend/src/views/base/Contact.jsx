import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Toast from '../plugin/Toast';

// third party

function Contact() {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm('service_xvu2y9b', 'template_yh61d8z', form.current, {
				publicKey: 'zcv468BIa2uXfDV0P',
			})
			.then(() => {
				Toast().fire({
					icon: 'success',
					title: 'Email sent successfully',
				});
				form.current.reset();
			})
			.catch(() => {
				Toast().fire({
					icon: 'error',
					title: 'Something went wrong please try again later.',
				});
			});
	};

	return (
		<div className="bg-tertiary">
			<BaseHeader />
			<form className="container my-5" ref={form} onSubmit={sendEmail}>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6">
						<div className="card p-4">
							<div className="h2 mt-3 text-center">Contact form</div>
							<div className="h5 my-3 text-center">
								We will get back to you in the next 48 hours thanks.
							</div>
							<div className="mb-3">
								<label htmlFor="from_email" className="form-label">
									Email account
								</label>
								<input
									name="from_email"
									type="email"
									className="form-control"
									id="from_email"
									placeholder="name@example.com"
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="subject" className="form-label">
									Subject
								</label>
								<input
									name="subject"
									type="text"
									className="form-control"
									id="subject"
									placeholder="I am talking about..."
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="message" className="form-label">
									Message
								</label>
								<textarea
									name="message"
									className="form-control"
									id="message"
									placeholder="Leave us your message here"
									rows="5"
									required
								></textarea>
							</div>
							<button type="submit" className="btn btn-primary w-100">
								Send Message
							</button>
						</div>
					</div>
				</div>
			</form>

			<BaseFooter />
		</div>
	);
}

export default Contact;
