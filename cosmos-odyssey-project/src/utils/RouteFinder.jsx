import { processRoutes } from './RouteProcessor';

export const findAllRoutes = (routeInfos, providers, selectedPlanet, selectedEndPlanet, filterByCompany) => {

  // Initialize cheapRoutes as an empty array
  let allRoutes = [];

  // Use the processRoutes function to get the allest routes
  allRoutes = processRoutes(allRoutes, routeInfos, providers, selectedPlanet, selectedEndPlanet, filterByCompany);

  return allRoutes;
};
