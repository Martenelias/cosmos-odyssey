export const findJourneyByProviders = (currentPlanet, destination, routeInfos, providers) => {
  const providerRoutes = {};
  
  providers.forEach((provider) => {
    const allRoutes = [];
    const visited = new Set();

    const depthSearch = (current, path, distance, legs, price, duration, startTime) => {
      // Stop if the current planet has been visited
      if (visited.has(current)) return;
      visited.add(current);

      // If destination is reached
      if (current === destination) {
        allRoutes.push({
          path: [...path, current],
          distance,
          legs: [...legs],
          price,
          duration,
          startTime,
        });
        visited.delete(current);
        return;
      }

      // Find next possible routes
      const nextRoutes = routeInfos.filter(
        (route) => route.from.name === current && !visited.has(route.to.name)
      );

      for (const nextRoute of nextRoutes) {
        const legPrice = provider.price || 0;

        // Use the provider's flight start/end to calculate leg duration
        const legStartTime = startTime || new Date(provider.flightStart);
        const legDuration = Math.round(
          (new Date(provider.flightEnd) - new Date(provider.flightStart)) / 3600000
        ); // Convert ms to hours

        const legEndTime = new Date(legStartTime.getTime() + legDuration * 60 * 60 * 1000);

        depthSearch(
          nextRoute.to.name,
          [...path, current],
          distance + nextRoute.distance,
          [...legs, {
            legId: nextRoute.legId,
            distance: nextRoute.distance,
            duration: legDuration,
            legStartTime,
            legEndTime,
          }],
          price + legPrice,
          duration + legDuration, // Accumulate duration
          legEndTime // Next leg's startTime
        );
      }

      visited.delete(current); // Backtrack
    };

    // Start the DFS search from the current planet
    depthSearch(currentPlanet, [], 0, [], 0, 0, null);

    // If valid routes are found, process them
    if (allRoutes.length > 0) {
      providerRoutes[provider.company.name] = {
        routes: allRoutes,
        totalPrice: allRoutes.reduce((total, route) => total + route.price, 0),
        totalTime: allRoutes.reduce((total, route) => total + route.duration, 0),
      };
    } else {
      console.log(`No valid routes found for ${provider.company.name}`);
    }
  });

  console.log('Provider Routes after processing:', providerRoutes);
  return providerRoutes;
};