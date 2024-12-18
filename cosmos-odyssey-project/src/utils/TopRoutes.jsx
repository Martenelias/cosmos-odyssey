export const getTopRoutes = (routes, limit = 15) => {
  // Sort routes first by price, then by duration
  const sortedRoutes = routes.sort((a, b) => a.totalPrice - b.totalPrice || a.duration - b.duration);
  
  // Limit the results to the top `limit` routes
  return sortedRoutes.slice(0, limit);
};
