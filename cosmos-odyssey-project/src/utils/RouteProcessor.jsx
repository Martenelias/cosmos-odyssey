// Function to update cheapRoutes with the cheapest routes
function updateCheapRoutes(cheapRoutes, detailedRoute, currentPlanet, selectedEndPlanet) {
  console.log("Processing detailedRoute:", detailedRoute);

  // Step 1: For the first iteration, add all routes as new routes to cheapRoutes
  if (cheapRoutes.length === 0) {
      const newRoute = {
          path: [detailedRoute.from, detailedRoute.to],
          totalPrice: detailedRoute.price,
          duration: detailedRoute.duration,
          legs: [detailedRoute],
      };
      cheapRoutes.push(newRoute);
      console.log("Added initial route to cheapRoutes:", newRoute);
      return cheapRoutes;
  }

  // Step 2: Try to extend existing routes in `cheapRoutes`
  const extendedRoutes = [];
  cheapRoutes.forEach((route) => {
      const lastLeg = route.legs[route.legs.length - 1];
      const lastFlightEnd = new Date(lastLeg.flightEnd);

      if (lastLeg.to === detailedRoute.from && lastFlightEnd <= new Date(detailedRoute.flightStart)) {
          console.log("Extending route:", route);

          // Extend the route
          const extendedRoute = {
              ...route,
              path: [...route.path, detailedRoute.to],
              totalPrice: route.totalPrice + detailedRoute.price,
              duration: route.duration + detailedRoute.duration,
              legs: [...route.legs, detailedRoute],
          };
          extendedRoutes.push(extendedRoute);

          console.log("Extended route created:", extendedRoute);
      }
  });

  // Step 3: If no routes could be extended, add as a new route
  if (extendedRoutes.length === 0) {
      const newRoute = {
          path: [detailedRoute.from, detailedRoute.to],
          totalPrice: detailedRoute.price,
          duration: detailedRoute.duration,
          legs: [detailedRoute],
      };
      cheapRoutes.push(newRoute);
      console.log("No route extended. Added new route:", newRoute);
  } else {
      // Add all extended routes back to cheapRoutes
      cheapRoutes.push(...extendedRoutes);
  }

  console.log("Updated cheapRoutes after processing:", cheapRoutes);
  return cheapRoutes;
}


// Function to process the routes and find the cheapest ones
export const processRoutes = (cheapRoutes, routeInfos, providers, selectedPlanet, selectedEndPlanet) => {
  let currentPlanet = selectedPlanet;
  let visitedPlanets = new Set();

  console.log(`1. Starting search from ${selectedPlanet} to ${selectedEndPlanet}`);

  while (currentPlanet !== selectedEndPlanet && !visitedPlanets.has(currentPlanet)) {
      console.log(`2. Processing planet: ${currentPlanet}`);
      visitedPlanets.add(currentPlanet);

      // Step 1: Get available routes from the current planet to the next planet in the path
      const availableRoutes = routeInfos.filter(route => route.from.name === currentPlanet);
      console.log(`3. Available routes from ${currentPlanet}:`, availableRoutes);

      // Step 2: Get detailed routes, matching providers with routes and filtering by time validity
      const detailedRoutes = availableRoutes.flatMap(route => {
        // Only consider routes that start from the current planet
        if (route.from.name !== currentPlanet) {
          return []; // Skip routes that don't start from the current planet
        }
      
        const matchingProviders = providers.filter(provider => provider.legId === route.legId);
        return matchingProviders.map(provider => {
          const flightStart = new Date(provider.flightStart);
          const flightEnd = new Date(provider.flightEnd);
      
          // Ensure that the flight times are valid and the flight doesn't miss a connection
          if (flightEnd > flightStart) {
            return {
              from: route.from.name,
              to: route.to.name,
              legId: route.legId,
              price: provider.price,
              company: provider.company.name,
              duration: calculateDuration(provider.flightStart, provider.flightEnd), // Calculate duration here
              flightStart,
              flightEnd,
              distance: route.distance,
            };
          }
          return null;  // Skip invalid routes
        }).filter(route => route !== null);
      });
      
      
      console.log(`4. Valid detailed routes for ${currentPlanet}:`, detailedRoutes);

      // Step 3: Update cheapRoutes with valid detailed routes
      detailedRoutes.forEach(detailedRoute => {
          cheapRoutes = updateCheapRoutes(cheapRoutes, detailedRoute, currentPlanet, selectedEndPlanet);
      });

      console.log(`5. Updated cheapRoutes after ${currentPlanet}:`, cheapRoutes);

      // Step 4: Set the current planet to the next planet with the cheapest valid route
      currentPlanet = getNextPlanetWithCheapestRoute(cheapRoutes, visitedPlanets);
      if (!currentPlanet) break;
      console.log(`6. Next planet to visit: ${currentPlanet}`);
  }

  // Step 5: Filter out routes that don't reach the destination or have NaN durations
  // cheapRoutes = cheapRoutes.filter(route => 
  //    route.path.includes(selectedEndPlanet)
  // );

  console.log("7. Final valid cheap routes:", cheapRoutes);
  console.log("Filtering cheapRoutes for selected end planet:", selectedEndPlanet);
  console.log("Routes before filtering:", cheapRoutes);
  cheapRoutes = cheapRoutes.filter(route => 
    route.path[0] === selectedPlanet && route.path[route.path.length - 1] === selectedEndPlanet
  );
  console.log("Routes after filtering:", cheapRoutes);

  return cheapRoutes;
};

const calculateDuration = (flightStart, flightEnd) => {
  const start = new Date(flightStart);
  const end = new Date(flightEnd);
  const durationMs = end - start; // Get the difference in milliseconds

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60)); // Convert to hours
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert the remainder to minutes

  return hours * 60 + minutes; // Return total duration in minutes
};




// Helper function to check if a route is still potentially valid
const isRoutePotential = (route, selectedEndPlanet) => {
  const lastPlanet = route.path[route.path.length - 1];
  return lastPlanet === selectedEndPlanet || route.legs.some(leg => leg.to === selectedEndPlanet);
};

// Helper function to get the next planet to visit
const getNextPlanetWithCheapestRoute = (cheapRoutes, visitedPlanets) => {
  // Sort the cheapRoutes by price or duration to get the cheapest one
  cheapRoutes.sort((a, b) => a.totalPrice - b.totalPrice || a.duration - b.duration);

  // Find the next planet to visit based on the cheapest route
  for (const route of cheapRoutes) {
      const nextPlanet = route.path[route.path.length - 1];
      if (!visitedPlanets.has(nextPlanet)) {
          return nextPlanet;
      }
  }
  return null;
};
