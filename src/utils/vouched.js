import api from './api';

const config = {
	// your webhook for POST verification processing
	// callbackURL: "https://www.vouched.id/",

	// // optional verification information for comparison
	// verification: {
	// 	firstName: 'First',
	// 	lastName: 'Last',
	// 	email: 'test@test.id',
	// 	phone: '000-111-2222',
	// },

	liveness: 'mouth',
	id: 'camera',
	includeBarcode: 'true',
	manualCaptureTimeout: 20000,
	showTermsAndPrivacy: true,
	
	appId: '~jBndy#OeBux5IVf_hLb-s2-2_ul3I',
	// your webhook for POST verification processing
	callbackURL: 'https://website.com/webhook',

	// mobile handoff
	crossDevice: true,
	crossDeviceQRCode: true,
	crossDeviceSMS: true,

	// have the user confirm information
	userConfirmation: {
		confirmData: true,
		confirmImages: true,
	},

	// callback during initialization of the web app
	onInit: ({ token, job }) => {
		console.log('initialization');
	},

	// callback when a user submits a photo
	onSubmit: ({ stage, attempts, job }) => {
		console.log('photo submitted');
	},

	// called when a job is completed.
	onDone: job => {
		// token used to query jobs
		console.log('Scanning complete', { token: job.token });

		// An alternative way to update your system based on the
		// results of the job. Your backend could perform the following:
		// 1. query jobs with the token
		// 2. store relevant job information such as the id and
		//    success property into the user's profile
		fetch(`/yourapi/idv?job_token=${job.token}`);

		// Redirect to the next page based on the job success
		if (job.result.success) {
			window.location.replace('');
		} else {
			window.location.replace('');
		}

		// An alternative way to update your system based on the
		// results of the job. Your backend could perform the following:
		// 1. query jobs with the token
		// 2. store relevant job information such as the id and
		//    success property into the user's profile
		// fetch(`/yourapi/idv?job_token=${job.token}`);

		// Redirect to the next page based on the job success
		// if (job.result.success) {
		//   window.location.replace("https://www.vouched.id/");
		// } else {
		//   window.location.replace("https://www.vouched.id/");
		// }
	},

	// callback executed after attempt to find camera device
	onCamera: ({ hasCamera, hasPermission }) => {
		console.log('attempted to find camera');
	},

	// callback when there are changes to the Camera DOM element
	onCameraEvent: cameraEvent => {
		console.log('camera DOM element updated');
	},

	// callback when a reverification job is complete
	onReverify: job => {
		console.log('reverification complete');
	},

	// callback when a survey is submitted, (per customer basis)
	onSurveyDone: job => {
		console.log('survey done');
	},

	// callback when user confirms data and photos
	onConfirm: userConfirmEvent => {
		console.log('user confirmation');
	},

	// theme
	theme: {
		name: 'verbose',
	},
};

const loadVouched = (userObj, state) => {
	console.log(userObj);
	const userId = userObj?._id
	
	const existingScript = document.getElementById('vouched');
	if (!existingScript) {
		const script = document.createElement('script');
		script.src = 'https://static.vouched.id/plugin/releases/latest/index.js';
		script.id = 'vouched';
		script.async = true;
		document.head.appendChild(script);
		script.onload = async () => {
			var vouched = window['Vouched']({
				liveness: 'mouth',
				id: 'camera',
				'x-test-request': true,
				includeBarcode: 'true',
				manualCaptureTimeout: 20000,
				showTermsAndPrivacy: true,
				appId: '~jBndy#OeBux5IVf_hLb-s2-2_ul3I',
				// your webhook for POST verification processing
				callbackURL: 'https://website.com/webhook',

				// mobile handoff
				crossDevice: true,
				crossDeviceQRCode: true,
				crossDeviceSMS: true,

				// have the user confirm information
				// userConfirmation: {
				// 	confirmData: true,
				// 	confirmImages: true,
				// },

				// callback during initialization of the web app
				onInit: ({ token, job }) => {
					console.log('initialization');
				},

				// callback when a user submits a photo
				onSubmit: ({ stage, attempts, job }) => {
					console.log('photo submitted');
				},

				// called when a job is completed.
				onDone: async job => {
					// token used to query jobs
					console.log('Scanning complete', { token: job.token });
					
					// An alternative way to update your system based on the
					// results of the job. Your backend could perform the following:
					// 1. query jobs with the token
					// 2. store relevant job information such as the id and
					//    success property into the user's profile

					// Redirect to the next page based on the job success
					if (job?.result?.success) {
						try {
							const user = await api
								.post(`/verify-user-acc/${userId}`, {
									data: job?.result,
									verifiedPerson: state
								})
								.then(() => {
									window.location.replace('/verification-success');
								});
							console.log(user);
						} catch (error) {
							console.log(error)
						}
					} else {
						window.location.replace('/home');
					}

					// An alternative way to update your system based on the
					// results of the job. Your backend could perform the following:
					// 1. query jobs with the token
					// 2. store relevant job information such as the id and
					//    success property into the user's profile
					// fetch(`/yourapi/idv?job_token=${job.token}`);

					// Redirect to the next page based on the job success
					// if (job.result.success) {
					//   window.location.replace("https://www.vouched.id/");
					// } else {
					//   window.location.replace("https://www.vouched.id/");
					// }
				},

				// callback executed after attempt to find camera device
				onCamera: ({ hasCamera, hasPermission }) => {
					console.log('attempted to find camera');
				},

				// callback when there are changes to the Camera DOM element
				onCameraEvent: cameraEvent => {
					console.log('camera DOM element updated');
				},

				// callback when a reverification job is complete
				onReverify: job => {
					console.log('reverification complete');
				},

				// callback when a survey is submitted, (per customer basis)
				onSurveyDone: job => {
					console.log('survey done');
				},

				// callback when user confirms data and photos
				onConfirm: userConfirmEvent => {
					console.log('user confirmation');
				},

				// theme
				theme: {
					name: 'verbose',
				},
			});
			console.log('mount vouched-element');
			console.log('userId', userId);
			vouched.mount('#vouched-element');
		};
	}
};

export default loadVouched;
