import PropTypes from 'prop-types';

const RouteList = ({ routes }) => {
  return (
    <>
      {routes.map((route, index) => (
        <div key={index} className='p-4 border ...'>
          <h3 className='text-primary-500'>{route.companyName}</h3>
          <p>Total Price: ${route.totalPrice}</p>
          <p>Total Travel Time: {route.totalTravelTime} hours</p>
          <p>Total Distance: {route.distance} km</p>
          <div>
            <h4 className='text-tertiary-50'>Route Details:</h4>
            {route.detailedLegs.map((leg, i) => (
              <div key={i} className='ml-4 ...'>
                <p>Leg {i + 1}:</p>
                <p>Start: {new Date(leg.startTime).toLocaleString()}</p>
                <p>End: {new Date(leg.endTime).toLocaleString()}</p>
                <p>Distance: {leg.distance} km</p>
                <p>Duration: {leg.duration} hours</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
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
