export const updatePriceLists = (priceList, priceLists) => {
  const newPriceLists = [...priceLists, priceList];
  return newPriceLists.slice(-15);
};

export const pruneOldReservations = (reservations, validPriceLists) => {
  const validPrices = new Set(validPriceLists.map((pl) => pl.validUntil));
  return reservations.filter((reservation) => validPrices.has(reservation.expiresAt));
};

export const addReservationToPriceList = (reservation, validUntil, reservations) => {
  const updatedReservation = { ...reservation, expiresAt: validUntil };
  return [...reservations, updatedReservation];
};
