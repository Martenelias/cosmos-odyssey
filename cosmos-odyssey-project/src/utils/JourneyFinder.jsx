export const findAllJourneys = (currentPlanet, destination, routeInfos, providers) => {
  const allRoutes = [];
  const visited = new Set();

  const depthSearch = (current, path, distance, legs, price, duration, startTime, companies) => {
    if (visited.has(current)) return;
    visited.add(current);

    if (current === destination) {
      allRoutes.push({
        path: [...path, current],
        distance,
        legs: [...legs],
        price,
        duration,
        startTime,
        companies: [...companies],
      });
      visited.delete(current);
      return;
    }

    const nextRoutes = routeInfos.filter((route) => route.from.name === current);
    for (const nextRoute of nextRoutes) {
      providers.forEach((provider) => {
        if (provider.legId === nextRoute.legId) {
          const legPrice = provider.price || 0;
          const routeStartTime = new Date(provider.flightStart);
          const routeEndTime = new Date(provider.flightEnd);

          if (isNaN(routeStartTime.getTime()) || isNaN(routeEndTime.getTime())) return;

          const legDuration = Math.round((routeEndTime - routeStartTime) / 3600000);
          const legStartTime = startTime || routeStartTime;

          depthSearch(
            nextRoute.to.name,
            [...path, current],
            distance + nextRoute.distance,
            [
              ...legs,
              {
                legId: nextRoute.legId,
                distance: nextRoute.distance,
                duration: legDuration,
                legStartTime,
                legEndTime: routeEndTime,
                company: provider.company.name,
              },
            ],
            price + legPrice,
            duration + legDuration,
            routeEndTime,
            [...companies, provider.company.name]
          );
        }
      });
    }

    visited.delete(current);
  };

  depthSearch(currentPlanet, [], 0, [], 0, 0, null, []);
  console.log('All Routes:', allRoutes);
  return allRoutes;
};
