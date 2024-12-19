// this is a helper file that contains functions that are used to manage the price lists and reservations in the app.
export const updatePriceLists = (priceList, priceLists) => {
  const newPriceLists = [...priceLists, priceList];
  return newPriceLists.slice(-15);
};

// This function will remove any reservations that have expired from the reservations array.
export const pruneOldReservations = (reservations, validPriceLists) => {
  const validPrices = new Set(validPriceLists.map((pl) => pl.validUntil));
  return reservations.filter((reservation) => validPrices.has(reservation.expiresAt));
};

// This function will add a new reservation to the reservations array.
export const addReservationToPriceList = (reservation, validUntil, reservations) => {
  const updatedReservation = { ...reservation, expiresAt: validUntil };
  return [...reservations, updatedReservation];
};
