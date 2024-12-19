const getLegs = (data) => data?.legs || [];

// add legId to providers
const getProviders = (legs) =>
  legs.flatMap((leg) =>
    leg.providers.map((provider) => ({
      ...provider,
      legId: leg.id,
    }))
  );

// add legId to routeInfo
const getRoutesInfo = (legs) =>
  legs.map((leg) => ({
    ...leg.routeInfo,
    legId: leg.id,
  }));

export { getLegs, getProviders, getRoutesInfo };
