import { Helmet } from 'react-helmet';

const EmailWidget = () => {
	return (
		<div>
			<Helmet>
				<meta
					httpEquiv={"Content-Security-Policy"}
					content="default-src 'self'; script-src 'self' https://imitate.email;"
				/>
			</Helmet>
			<iframe
				src="https://imitate.email/Widget?projectName=&mailboxId=&wId=localhost%3A5173&jwt="
				sandbox="allow-scripts allow-same-origin"
				title="Email Widget"
				style={{ width: '100%', height: '100%', border: 'none' }}
			></iframe>
		</div>
	);
};

export default EmailWidget;
