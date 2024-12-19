import PropTypes from 'prop-types';
import { X, ClockArrowUp, ClockArrowDown, Clock, BadgeEuro } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ReservationContainer = ({ route, closeReservation, firstName, lastName, confirmReservation }) => {
  const { totalPrice, duration, legs } = route;

  const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const firstLegStart = shortDateFormatter.format(new Date(legs[0]?.flightStart));
  const lastLegEnd = shortDateFormatter.format(new Date(legs[legs.length - 1]?.flightEnd));

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-background-900 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-tertiary-50 text-background-500 p-8 m-4 rounded-lg max-w-lg w-full'>
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-lg w-full'>Reservation Details</h2>
          <button onClick={closeReservation} className='flex justify-end items-center p-4'>
            <X size={40} />
          </button>
        </div>

        <div className='flex gap-2'>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <ul className='flex flex-col gap-4 my-4'>
          <p className='flex items-center gap-2'>
            <ClockArrowUp />
            {firstLegStart.toLocaleString()}
          </p>
          <p className='flex items-center gap-2'>
            <ClockArrowDown />
            {lastLegEnd.toLocaleString()}
          </p>
          <p className='flex items-center gap-2'>
            <BadgeEuro />
            {(totalPrice).toFixed(2)}
          </p>
          <p className='flex items-center gap-2'>
            <Clock />
            {duration} hours
          </p>
          <div className='border-t-2 border-background-500 pt-4'>
            <ul>
              {legs.map((leg, index) => (
                <li key={index}>
                  {leg.from} to {leg.to} with {leg.company}
                </li>
              ))}
            </ul>
          </div>
        </ul>
        <NavLink
          to='/reservations'
          className='rounded-lg text-tertiary-50  py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'
          onClick={confirmReservation}
        >
            Book Reservation
        </NavLink>
      </div>
    </div>
  );
};

ReservationContainer.propTypes = {
  route: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    legs: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        flightStart: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        flightEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      })
    ).isRequired,
  }).isRequired,
  closeReservation: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  confirmReservation: PropTypes.func.isRequired,
};


export default ReservationContainer;
