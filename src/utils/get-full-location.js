import {
	LocationClient,
	SearchPlaceIndexForTextCommand,
} from '@aws-sdk/client-location';
import { withAPIKey } from '@aws/amazon-location-utilities-auth-helper';

const getFullCoordinatesFromAWS = async address => {
	const authHelper = withAPIKey(
		process.env.REACT_APP_AWS_GEO_SECRET_ACCESS_KEY,
		process.env.REACT_APP_AWS_REGION
	);

	const client = new LocationClient(authHelper.getClientConfig());
	console.log(client);

	const indexName = 'explore.place';

	try {
		const command = new SearchPlaceIndexForTextCommand({
			IndexName: indexName,
			Text: address,
			// Key: process.env.REACT_APP_AWS_GEO_SECRET_ACCESS_KEY,
		});

		const response = await client.send(command);

		console.log(response);

		if (response.Results && response.Results.length > 0) {
			console.log(response.Results);
			const {
				Geometry,
				AddressNumber,
				Street,
				Municipality,
				Region,
				Country,
			} = response.Results[0].Place;

			const data = {
				coordinates: Geometry.Point,
				location: {
					address: `${AddressNumber || ''}`,
					street: `${Street || ''}`,
					municipality: `${Municipality}`,
					region: `${Region}`,
					country: `${Country}`,
				},
			};

			return data;
		} else {
			console.error('No results found.');
			return null;
		}
	} catch (error) {
		console.error('Error fetching coordinates from AWS:', error);
		return null;
	}
};

export default getFullCoordinatesFromAWS;
