// RouteFinder.js
import { processRoutes } from './routeProcessor';

// Example of how you would call the function
export const findAllRoutes = (routeInfos, providers, selectedPlanet, selectedEndPlanet) => {
  console.log("Starting search from:", selectedPlanet, "to:", selectedEndPlanet);

  // Initialize cheapRoutes as an empty array
  let allRoutes = [];

  // Use the processRoutes function to get the allest routes
  allRoutes = processRoutes(allRoutes, routeInfos, providers, selectedPlanet, selectedEndPlanet);

  console.log("all Routes:", allRoutes);

  return allRoutes;
};
