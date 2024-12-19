import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { updatePriceLists, pruneOldReservations, addReservationToPriceList } from './PriceListManager';

const ReservationContext = createContext();

export const useReservationContext = () => useContext(ReservationContext);

// this is the context provider that will wrap the application
export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem('reservations');
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  // priceLists will store the last 15 price lists
  const [priceLists, setPriceLists] = useState(() => {
    const savedPriceLists = localStorage.getItem('priceLists');
    return savedPriceLists ? JSON.parse(savedPriceLists) : [];
  });

  // save reservations and priceLists to localStorage
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('priceLists', JSON.stringify(priceLists));
  }, [reservations, priceLists]);

  // addPriceList will be used to add a new price list to the priceLists state
  const addPriceList = useCallback((priceList) => {
    setPriceLists((prev) => updatePriceLists(priceList, prev));
  }, []);

  // addReservation will be used to add a new reservation to the reservations state
  const addReservation = (reservation, validUntil) => {
    const updatedReservations = addReservationToPriceList(
      reservation,
      validUntil,
      reservations
    );
    setReservations(updatedReservations);
  };

  // prune old reservations every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const validPriceLists = priceLists.slice(-15);
      setReservations((currentReservations) => {
        const prunedReservations = pruneOldReservations(
          currentReservations,
          validPriceLists
        );
        if (JSON.stringify(prunedReservations) !== JSON.stringify(currentReservations)) {
          return prunedReservations;
        }
        return currentReservations;
      });
    }, 60000);
  
    return () => clearInterval(interval);
  }, [priceLists]);
  

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, addPriceList }}>
      {children}
    </ReservationContext.Provider>
  );
};

ReservationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
