const RouteList = ({ routes = [] }) => {
  const longDateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
          if (isNaN(route.totalPrice) || isNaN(route.duration)) return null; // Skip invalid routes

          return (
            <div key={index} className='p-8 rounded-lg bg-background-500'>
              <h3 className='text-primary-500'>
                Total Price: €{route.totalPrice.toFixed(2)} -{' '}
                <span className='text-tertiary-300'>
                  Total Duration: {route.duration} hours
                </span>
              </h3>
              <div className='flex flex-col lg:flex-row justify-between items-center h-full w-full gap-4'>
                <div className='w-full h-full'>
                  {route.legs.map((leg, i) => (
                    <div key={i} className='flex flex-col justify-center items-center border-b py-2'>
                      <div className='flex justify-center items-center gap-4 w-full'>
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
                      <div className='text-tertiary-200'>
                        <p>Distance: {leg.distance.toLocaleString()} km</p>
                        <p>Duration: {leg.duration.toFixed(2)} hours</p>
                        <p>Company: {leg.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='h-full flex flex-col justify-between items-center border-l p-4'>
                  <p>Total Duration: {route.duration} hours</p>
                  <p>Total Distance: {route.legs.reduce((total, leg) => total + leg.distance, 0).toLocaleString()} km</p>
                  <button className='rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'>
                    €{route.totalPrice.toFixed(2)}
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

export default RouteList;