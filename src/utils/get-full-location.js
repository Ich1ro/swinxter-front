import { LocationClient, SearchPlaceIndexForTextCommand } from "@aws-sdk/client-location";

const getFullCoordinatesFromAWS = async (address) => {
    const client = new LocationClient({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        },
    });

    const indexName = "explore.place";

    try {
        const command = new SearchPlaceIndexForTextCommand({
            IndexName: indexName,
            Text: address,
        });

        const response = await client.send(command);

        if (response.Results && response.Results.length > 0) {
            const { Geometry, AddressNumber, Street, Municipality, Region, Country } =
                response.Results[0].Place;

            const data = {
                coordinates: Geometry.Point,
				location: {
					address: `${AddressNumber || ""}`,
					street: `${Street || ""}`,
					municipality: `${Municipality}`,
					region: `${Region}`,
					country: `${Country}`
				}
            };

            return data;
        } else {
            console.error("No results found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates from AWS:", error);
        return null;
    }
};

export default getFullCoordinatesFromAWS;