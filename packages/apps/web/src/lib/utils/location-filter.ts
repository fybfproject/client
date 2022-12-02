const getDegreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const radius = 6371; // Radius of the earth in km

  const dLat = getDegreesToRadians(lat2 - lat1); // deg2rad below
  const dLon = getDegreesToRadians(lon2 - lon1);

  const formula =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(getDegreesToRadians(lat1)) *
      Math.cos(getDegreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(formula), Math.sqrt(1 - formula));
  const d = radius * c;

  return d;
};
