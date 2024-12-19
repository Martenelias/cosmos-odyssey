import PropTypes from 'prop-types';
import { LandPlot, Clock, Rocket } from 'lucide-react';

const RouteList = ({ routes, handleReservation }) => {

  const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  return (
    <div className='grid grid-cols-1 gap-4'>
      {routes.length > 0 ? (
        routes.map((route, index) => {
          if (isNaN(route.totalPrice) || isNaN(route.duration)) return null;

          return (
            <div key={index} className='p-8 rounded-lg bg-background-500'>
              <div className='flex flex-col lg:flex-row justify-between items-center h-full w-full gap-4'>
                <div className='w-full h-full'>
                  {route.legs.map((leg, i) => (
                    <div key={i} className='flex flex-col justify-center items-center border-b py-2'>
                      <div className='flex justify-center items-center gap-4 w-full my-2'>
                        <p className='text-primary-500'>{leg.from}</p>
                        <p>{shortDateFormatter.format(new Date(leg.flightStart))}</p>
                        <img
                          src='/smallRocket.svg'
                          alt='Small rocket icon'
                          className='h-4 rotate-45'
                        />
                        <p>{shortDateFormatter.format(new Date(leg.flightEnd))}</p>
                        <p className='text-primary-500'>{leg.to}</p>
                      </div>
                      <div className='text-tertiary-200 flex flex-col gap-2'>
                        <p className='flex items-center gap-2'>
                          <LandPlot />
                          {leg.distance.toLocaleString()} km
                        </p>
                        <p className='flex items-center gap-2'>
                          <Clock />
                          {leg.duration} hours
                        </p>
                        <p className='flex items-center gap-2'>
                          <Rocket />
                          {leg.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='h-full flex flex-col justify-between items-center lg:border-l p-4'>
                  <div className='flex flex-col gap-4'>
                    <p className='flex items-center gap-2'>
                      <Clock />
                      {route.duration} hours
                    </p>
                    <p>Total Distance: {route.legs.reduce((total, leg) => total + leg.distance, 0).toLocaleString()} km</p>
                  </div>
                  <button
                    className='rounded-lg text-tertiary-50 py-2 px-4 mt-4 w-full bg-primary-500 hover:bg-primary-700'
                    onClick={() => handleReservation(route)}
                  >
                    €{(route.totalPrice).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No routes available.</p>
      )}
    </div>
  );
};

RouteList.propTypes = {
  handleReservation: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      legs: PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.string.isRequired,
          to: PropTypes.string.isRequired,
          flightStart: PropTypes.string.isRequired,
          flightEnd: PropTypes.string.isRequired,
          distance: PropTypes.number.isRequired,
          duration: PropTypes.number.isRequired,
          company: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default RouteList;