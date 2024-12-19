// Recursive function to explore all possible routes
function exploreAllRoutes(currentRoute, allRoutes, routeInfos, providers, endPlanet, visitedPlanets, filterByCompany) {
  const lastPlanet = currentRoute.path[currentRoute.path.length - 1];
  const lastLeg = currentRoute.legs.length > 0 ? currentRoute.legs[currentRoute.legs.length - 1] : undefined;
  const lastFlightEnd = lastLeg ? new Date(lastLeg.flightEnd) : null;
  
  // If the last planet matches the endPlanet, add the route to allRoutes
  if (lastPlanet === endPlanet) {
    allRoutes.push({ ...currentRoute });
    return;
  }
  
  // Get all available routes from the last planet
  const availableRoutes = routeInfos.filter(route => route.from.name === lastPlanet);
  
  for (const route of availableRoutes) {
    // Skip if the planet has already been visited in this path (to avoid cycles)
    if (visitedPlanets.has(route.to.name)) {
      continue;
    }
  
    // Get matching providers for the current leg
    const matchingProviders = providers.filter(provider => {
      const matchesLeg = provider.legId === route.legId;
      const matchesCompany = !filterByCompany || filterByCompany === 'All Companies' || provider.company.name === filterByCompany;
      return matchesLeg && matchesCompany;
    });
  
    for (const provider of matchingProviders) {
      const flightStart = new Date(provider.flightStart);
      const flightEnd = new Date(provider.flightEnd);
  
      // Ensure the flight times are valid and do not overlap with the previous leg
      if ((!lastFlightEnd || flightStart >= lastFlightEnd) && flightEnd > flightStart) {
        // Create a new extended route
        const newRoute = {
          path: [...currentRoute.path, route.to.name],
          totalPrice: currentRoute.totalPrice + provider.price,
          duration: currentRoute.duration + calculateDuration(provider.flightStart, provider.flightEnd),
          legs: [...currentRoute.legs, {
            from: route.from.name,
            to: route.to.name,
            legId: route.legId,
            price: provider.price,
            company: provider.company.name,
            duration: calculateDuration(provider.flightStart, provider.flightEnd),
            flightStart,
            flightEnd,
            distance: route.distance
          }]
        };
  
        // Recursively explore the next planet
        visitedPlanets.add(route.to.name);
        exploreAllRoutes(newRoute, allRoutes, routeInfos, providers, endPlanet, visitedPlanets, filterByCompany);
        visitedPlanets.delete(route.to.name); // Backtrack
      }
    }
  }
}
  
// Function to process the routes and find all possible ones
export const processRoutes = (allRoutes, routeInfos, providers, selectedPlanet, selectedEndPlanet, filterByCompany) => {
  console.log(`1. Starting search from ${selectedPlanet} to ${selectedEndPlanet}`);
  
  const visitedPlanets = new Set();
  const initialRoute = {
    path: [selectedPlanet],
    totalPrice: 0,
    duration: 0,
    legs: []
  };
  
  visitedPlanets.add(selectedPlanet);
  exploreAllRoutes(initialRoute, allRoutes, routeInfos, providers, selectedEndPlanet, visitedPlanets, filterByCompany);
  
  // Filter out routes that don't reach the destination
  console.log('Filtering allRoutes for selected end planet:', selectedEndPlanet);
  console.log('Routes before filtering:', allRoutes);
  allRoutes = allRoutes.filter(route => 
    route.path[0] === selectedPlanet && route.path[route.path.length - 1] === selectedEndPlanet
  );
  
  console.log('Routes after filtering:', allRoutes);
  return allRoutes;
};
  
// Helper function to calculate duration
const calculateDuration = (flightStart, flightEnd) => {
  const start = new Date(flightStart);
  const end = new Date(flightEnd);
  const durationMs = end - start; // Get the difference in milliseconds
  
  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60)); // Convert to hours
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert the remainder to minutes
  
  return hours * 60 + minutes; // Return total duration in minutes
};
  