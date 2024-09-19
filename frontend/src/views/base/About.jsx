import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import bannerImage from '/ai.png';

import './about.css';
import { NavLink } from 'react-router-dom';

function About() {
	return (
		<div>
			<BaseHeader />
			<div className="about-us-container container my-5">
				<div className="row">
					{/* Left Column: About Us Text (2/3) */}
					<div className="col-lg-7 col-md-12 d-flex align-items-center text-left">
						<div className="about-us-text">
							<h1 className="display-4 font-weight-bold mb-4">
								About Gabobe Dev
							</h1>
							<p className="lead mb-5">
								Gabobe Dev is an e-learning platform offering a variety of
								courses to help you excel in programming, networking,
								certifications (CompTIA A+ and N+), video production, graphic
								design, language learning, computer basics, and computerized
								accounting. We provide high-quality, accessible, and engaging
								education that equips learners for success in the fast-evolving
								tech industry.
							</p>
							<NavLink to="/" className="btn btn-primary btn-md px-4 fs-3">
								Explore Our Courses
							</NavLink>
						</div>
					</div>

					{/* Right Column: Image (1/3) */}
					<div className="col-lg-5 col-md-12">
						<img
							src={bannerImage}
							alt="Gabobe Dev Courses"
							className="img-fluid banner-image"
						/>
					</div>
				</div>

				{/* Courses Section */}
				<div className="row mt-5">
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Programming</h3>
								<p className="card-text">
									Learn web development, Python, JavaScript, and more.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Networking</h3>
								<p className="card-text">
									Master networking fundamentals, including CompTIA A+ and N+
									certifications.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Video Production</h3>
								<p className="card-text">
									Become proficient in Premiere Pro, CapCut, After Effects, and
									Audition.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Graphic Design</h3>
								<p className="card-text">
									Design stunning visuals using Photoshop and Illustrator.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Languages</h3>
								<p className="card-text">
									Learn Kiswahili and English through comprehensive courses.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">ICDL / Computer Basics</h3>
								<p className="card-text">
									Gain essential computer skills for daily operations and
									efficiency.
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Computerized Accounting</h3>
								<p className="card-text">
									Master QuickBooks, Tally, and Peachtree to handle business
									finances effectively.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BaseFooter />
		</div>
	);
}

export default About;
