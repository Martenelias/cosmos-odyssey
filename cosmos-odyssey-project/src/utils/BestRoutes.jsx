// Prindib massiivid loetavamalt
export const logArray = (array, title) => {
  console.log(`--- ${title} ---`);
  array.forEach((item, index) => console.log(`${index + 1}.`, item));
};

// Filtreerib unikaalseid sihtkohti
export const getUniqueDestinations = (routes) => {
  const destinations = new Set();
  routes.forEach(route => destinations.add(route.to));
  return Array.from(destinations);
};
