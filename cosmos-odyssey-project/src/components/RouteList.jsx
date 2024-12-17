import PropTypes from 'prop-types';
import { Clock, LandPlot } from 'lucide-react';

const RouteList = ({ routes }) => {
  const longDateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  return (
    <div className='grid grid-cols-1 gap-4'>
      {routes.map((route, index) => (
        <div key={index} className='p-8 rounded-lg bg-background-500'>
          <h3 className='text-primary-500'>
            {route.companyName} -{' '}
            <span className='text-tertiary-300'>
              {longDateFormatter.format(new Date(route.detailedLegs[0].startTime))}
            </span>
          </h3>
          <div className='flex flex-col lg:flex-row justify-between items-center h-full w-full gap-4'>
            <div className='w-full h-full'>
              {route.detailedLegs.map((leg, i) => (
                <div key={i} className='flex flex-col justify-center items-center border-b py-2'>
                  <div className='flex justify-center items-center gap-4 w-full'>
                    <div className='flex justify-center text-lg  items-center gap-4'>
                      <p className='text-primary-500'>{route.path[i]}</p>
                      <p>
                        {shortDateFormatter.format(new Date(leg.startTime))}
                      </p>
                    </div>
                    <img src='/smallRocket.svg' alt='Small rocket svg image' className='h-4 rotate-45' />
                    <div className='flex justify-center text-lg items-center gap-4'>
                      <p>
                        {shortDateFormatter.format(new Date(leg.endTime))}
                      </p>
                      <p className='text-primary-500'>{route.path[i + 1]}</p>
                    </div>
                  </div>
                  <div className='text-tertiary-200'>
                    <p>{leg.distance} km</p>
                    <p>{leg.duration} hours</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='h-full flex flex-col justify-between items-center border-l p-4'>
              <div className='felx flex-col justify-center items-center gap-4 h-full'>
                <p className='flex justify-start items-center gap-4'>
                  <Clock />
                  {route.totalTravelTime} h
                </p>
                <p className='flex justify-start items-center gap-4'>
                  <LandPlot />
                  {route.distance}
                </p>
              </div>
              <button className='rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'>
                €{route.totalPrice}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

RouteList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      totalTravelTime: PropTypes.number.isRequired,
      distance: PropTypes.number.isRequired,
      detailedLegs: PropTypes.arrayOf(
        PropTypes.shape({
          startTime: PropTypes.string.isRequired,
          endTime: PropTypes.string.isRequired,
          distance: PropTypes.number.isRequired,
          duration: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default RouteList;
