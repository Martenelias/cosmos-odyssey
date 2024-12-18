// RouteFinder.js
import { processRoutes } from './routeProcessor';

// Example of how you would call the function
export const findCheapRoutes = (routeInfos, providers, selectedPlanet, selectedEndPlanet) => {
  console.log("Starting search from:", selectedPlanet, "to:", selectedEndPlanet);

  // Initialize cheapRoutes as an empty array
  let cheapRoutes = [];

  // Use the processRoutes function to get the cheapest routes
  cheapRoutes = processRoutes(cheapRoutes, routeInfos, providers, selectedPlanet, selectedEndPlanet);

  console.log("Cheap Routes:", cheapRoutes);

  return cheapRoutes;
};
