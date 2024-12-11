const getLegs = (data) => data?.legs || [];

const getProviders = (legs) =>
  legs.map((leg) =>
    leg.providers.map((provider) => ({
      ...provider,
      legId: leg.id,
    }))).flat();

const getRoutesInfo = (legs) =>
  legs.map((leg) => ({
    ...leg.routeInfo,
    legId: leg.id,
    }));



export { getLegs, getProviders, getRoutesInfo };