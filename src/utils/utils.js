import { getPreciseDistance } from 'geolib'

export const calculateDistance = (fLong, sLong, fLat, sLat) => {
	var pdis = getPreciseDistance(
		{ latitude: Number(fLat), longitude: Number(fLong) },
		{ latitude: Number(sLat), longitude: Number(sLong) }
	);
	const factor = 0.621371;
	return ((pdis / 1000) * factor).toFixed(0);
};