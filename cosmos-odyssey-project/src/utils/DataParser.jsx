const getLegs = (data) => data?.legs || [];

const getProviders = (legs) =>
  legs.flatMap((leg) =>
    leg.providers.map((provider) => ({
      ...provider,
      legId: leg.id,
    }))
  );

const getRoutesInfo = (legs) =>
  legs.map((leg) => ({
    ...leg.routeInfo,
    legId: leg.id,
  }));

export { getLegs, getProviders, getRoutesInfo };
