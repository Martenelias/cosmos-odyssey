const getLegs = (data) => data?.legs || [];

const getProviders = (legs) => legs.map((leg) => leg.providers).flat();

const getRoutesInfo = (legs) => legs.map((leg) => leg.routeInfo);



export { getLegs, getProviders, getRoutesInfo };