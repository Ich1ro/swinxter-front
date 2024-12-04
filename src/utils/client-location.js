import { LocationClient, SearchPlaceIndexForTextCommand } from "@aws-sdk/client-location";

const getCoordinatesFromAWS = async (state, city) => {
    const client = new LocationClient({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        },
    });

    const indexName = "explore.place";

    const searchText = `${city}, ${state}`;

    try {
        const command = new SearchPlaceIndexForTextCommand({
            IndexName: indexName,
            Text: searchText,

        });
        const response = await client.send(command);

        if (response.Results && response.Results.length > 0) {
            const location = response.Results[0].Place.Geometry.Point;
			return { lat: location[1], lon: location[0] };
        } else {
            console.error("No results found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates from AWS:", error);
        return null;
    }
};

export default getCoordinatesFromAWS;
