export const enrichRoutes = (routes) => {
  return routes.map((route) => ({
    path: route.path,
    distance: route.distance,
    duration: route.duration,
    price: route.price,
    companies: [...new Set(route.companies)],
    detailedLegs: route.legs.map((leg) => ({
      distance: leg.distance,
      duration: leg.duration,
      startTime: leg.legStartTime?.toISOString() || 'N/A',
      endTime: leg.legEndTime?.toISOString() || 'N/A',
      company: leg.company,
    })),
  }));
};
