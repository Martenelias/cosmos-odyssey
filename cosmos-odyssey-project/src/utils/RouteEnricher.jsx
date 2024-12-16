export const addRoutesDetails = (routes) => {
  const enrichedRoutes = [];

  Object.entries(routes).forEach(([companyName, providerData]) => {
    const shortestRoute = providerData.routes.reduce((shortest, current) =>
      current.distance < (shortest?.distance || Infinity) ? current : shortest,
      null
    );

    if (!shortestRoute) {
      console.error(`No valid route found for ${companyName}`);
      return;
    }

    const detailedLegs = shortestRoute.legs.map((leg) => ({
      distance: leg.distance,
      duration: leg.duration,
      startTime: leg.legStartTime ? leg.legStartTime.toISOString() : 'N/A',
      endTime: leg.legEndTime ? leg.legEndTime.toISOString() : 'N/A',
    }));

    enrichedRoutes.push({
      companyName,
      ...shortestRoute,
      detailedLegs,
      totalPrice: shortestRoute.price,
      totalTravelTime: shortestRoute.duration,
    });
  });

  return enrichedRoutes;
};