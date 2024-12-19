import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ReservationContext = createContext();

export const useReservationContext = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const addReservation = (reservation) => {
    setReservations((prev) => [...prev, reservation]);
    console.log('Added reservation:', reservation);
  };

  const deleteReservation = (index) => {
    setReservations((prev) => {
      const newReservations = [...prev];
      newReservations.splice(index, 1);
      return newReservations;
    });
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, deleteReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

ReservationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};