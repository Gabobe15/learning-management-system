import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';

function About() {
	return (
		<div>
			<BaseHeader />
			<div style={{padding:'50px 150px'}}>
				<div>
					<h2>About Us</h2>
					<p>
						Welcome to Samaha School, where we are dedicated to empowering
						individuals with the skills and knowledge needed to excel in today's
						competitive world. Our vocational school offers a range of
						specialized courses designed to meet the demands of a dynamic job
						market and equip our students with practical, hands-on experience.
					</p>
				</div>
				<div>
					<h2>Our Mission</h2>
					<p>
						At Samaha School, our mission is to provide high-quality vocational
						education that bridges the gap between traditional academic learning
						and real-world professional skills. We strive to create an inclusive
						and supportive learning environment that fosters creativity,
						innovation, and personal growth.
					</p>
				</div>
				<div>
					<h3>Our Courses</h3>
					<ul style={{listStyleType:'none'}}>
						<li>
							<h5>1.English language</h5>
							<ul>
								<li>
									Our English language program focuses on enhancing
									communication skills, grammar, and vocabulary. Whether you are
									looking to improve your business English or prepare for
									international exams, our comprehensive courses will help you
									achieve fluency and confidence.
								</li>
							</ul>
						</li>
						<li>
							<h5>2.Kiswahili Language</h5>
							<ul>
								<li>
									The Kiswahili language course is designed for both beginners
									and advanced learners. Gain proficiency in one of Africa's
									most widely spoken languages, essential for both personal and
									professional communication in the region.
								</li>
							</ul>
						</li>
						<li>
							<h5>3.Graphic Design</h5>
							<ul>
								<li>
									Dive into the world of visual creativity with our graphic
									design course. Learn the principles of design, typography, and
									digital illustration using industry-standard software. Our
									hands-on approach ensures you build a strong portfolio to
									showcase your skills.
								</li>
							</ul>
						</li>
						<li>
							<h5>4.Video Editing</h5>
							<ul>
								<li>
									Master the art of storytelling through video with our video
									editing program. From basic editing techniques to advanced
									post-production skills, you will learn to create engaging and
									professional-quality videos for various media platforms.
								</li>
							</ul>
						</li>
						<li>
							<h5>5.Programming</h5>
							<ul>
								<li>
									Our programming course covers fundamental to advanced coding
									skills. Whether you are interested in web development,
									software engineering, or app creation, our curriculum is
									designed to provide you with the technical expertise needed in
									today's tech-driven world.
								</li>
							</ul>
						</li>
					</ul>
				</div>
				{/* why choose us  */}
				<div>
					<h4>Why Choose Us</h4>
					<ul>
						<li>
							<b>Experienced Instructors: </b>
							Learn from industry professionals who bring real-world experience
							and knowledge to the classroom.
						</li>
						<li>
							<b>Hands-On Training:</b> Our practical approach ensures that you
							gain the skills needed to succeed in your chosen field.
						</li>
						<li>
							<b>Modern Facilities:</b> Study in a well-equipped environment
							with access to the latest tools and technologies.
						</li>
						<li>
							<b>Career Support:</b> Benefit from our career services, including
							resume building, interview preparation, and job placement
							assistance.
						</li>
						<li>
							<b>Flexible Learning:</b> We offer both in-person and online
							classes to accommodate your schedule and learning preferences.
						</li>
					</ul>
				</div>
				<div style={{margin:'50px 0'}}>
					<h4>Join Us</h4>
					<p>
						At Samaha College, we believe in the power of education to transform
						lives. Whether you are starting your career, changing professions,
						or looking to enhance your skills, we are here to support your
						journey. Join our community of learners and take the first step
						towards a brighter future.
					</p>
				</div>
				<div>
					<h4>Contact Us</h4>
					<p>
						For more information about our courses and enrollment details,please
						contact us at:
					</p>
					<ul>
						<li><b>Phone:</b> +2547 2241 8100</li>
						<li><b>Email:</b> samahacollege@gmail.com</li>
						<li><b>Address:</b> Eight street, Darsalaam shopping center 8th floor</li>
						<li><b>Website:</b> www.samahacollege.com</li>
				
					</ul>
				</div>
			</div>
			<BaseFooter />
		</div>
	);
}

export default About;
