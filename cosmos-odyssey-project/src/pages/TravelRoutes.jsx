import { Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import fetchData from '../utils/ApiList';
import { getLegs, getRoutesInfo, getProviders } from '../utils/DataParser';
import { Rocket } from 'lucide-react';

const TravelRoutes = () => {
  const [routeInfos, setRouteInfos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedStartPlanet, setSelectedStartPlanet] = useState('');
  const [selectedEndPlanet, setSelectedEndPlanet] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedLegId, setSelectedLegId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showShortDestinations, setShowShortDestinations] = useState(false);
  const [showShortProviders, setShowShortProviders] = useState(false);
  const [bigRadio, setBigRadio] = useState(false);
  const [smallRadio, setSmallRadio] = useState(false);

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
  
    // Format as YYYY-MM-DD HH:mm
    const formattedDate = dateObj.getFullYear() + '-' +
                          String(dateObj.getMonth() + 1).padStart(2, '0') + '-' +
                          String(dateObj.getDate()).padStart(2, '0') + ' ' +
                          String(dateObj.getHours()).padStart(2, '0') + ':' +
                          String(dateObj.getMinutes()).padStart(2, '0');
  
    return formattedDate;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        const parsedLegs = getLegs(data);
        const parsedRoutesInfo = getRoutesInfo(parsedLegs);
        const parsedProviders = getProviders(parsedLegs);

        console.log('Loaded Legs:', parsedLegs);
        console.log('Loaded Route Infos:', parsedRoutesInfo);
        console.log('Loaded Providers:', parsedProviders);

        setRouteInfos(parsedRoutesInfo);
        setProviders(parsedProviders);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleSearchRoutes = (e) => {
    e.preventDefault();
    if (!selectedStartPlanet) {
      alert('Please select a planet!');
      return;
    }

    if (bigRadio && selectedStartPlanet === selectedEndPlanet) {
      alert('Please choose a different destination than your starting location.');
      return;
    }

    if (smallRadio) {
      const filteredRoutes = routeInfos.filter(
        (route) => route.from?.name === selectedStartPlanet
      );
      setFilteredRoutes(filteredRoutes);
      setShowShortDestinations(true);
      setShowShortProviders(false);
    }
  };

  const handleChooseRoute = (route) => {
    console.log('Chose Route:', route);
    setSelectedLegId(route.legId);
  };

  const filteredProviders = providers.filter((provider) => provider.legId === selectedLegId);

  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-28 items-center p-4'>
      <div className='max-w-[800px] w-full'>
        <div className='flex flex-col justify-center items-center shadow-2xl rounded-lg bg-background-500'>
          <h2 className='text-tertiary-50 text-base lg:text-xl px-4 pt-10'>Start Your Interplanetary Adventure!</h2>
          <div className='flex justify-center items-center gap-8 p-6 lg:p-10'>
            <form
              className='flex flex-col justify-center items-center gap-4'
              onSubmit={handleSearchRoutes}
            >
              <div className='flex gap-4 lg:gap-8'>
                <input
                  type='text'
                  name='first-name'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='rounded-lg placeholder-tertiary-200 text-sm text-tertiary-50 lg:text-base px-4 bg-transparent border border-tertiary-50 w-full'
                />
                <input
                  type='text'
                  name='last-name'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='rounded-lg placeholder-tertiary-200 text-sm text-tertiary-50 lg:text-base px-4 bg-transparent border border-tertiary-50 w-full'
                />
              </div>
              <div className='w-full flex justify-start items-center gap-4'>
                <input
                  type='radio'
                  name='short-routes'
                  value='short'
                  checked={smallRadio}
                  onChange={() => {
                    setBigRadio(false);
                    setSmallRadio(true);
                  }}
                  className='form-radio'
                />
                <span className='text-tertiary-50'>Only short routes</span>
              </div>  
              <div className='w-full flex justify-start items-center gap-4'>
                <input
                  type='radio'
                  name='long-routes'
                  value='long'
                  checked={bigRadio}
                  onChange={() => {
                    setSmallRadio(false);
                    setBigRadio(true);
                  }}
                  className='form-radio'
                />
                <span className='text-tertiary-50'>Only long routes</span>
              </div>
              
              <div className='block w-full'>
                <Dropdown
                  label={selectedStartPlanet || 'Your Location'}
                  color='light'
                  theme={{ floating: { target: 'w-full' } }}
                >
                  {['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((startPlanet) => (
                    <Dropdown.Item
                      key={startPlanet}
                      onClick={() => setSelectedStartPlanet(startPlanet)}
                    >
                      {startPlanet}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              {bigRadio && (
                <div className='block w-full'>
                  <Dropdown
                    label={selectedEndPlanet || 'Your Destination'}
                    color='light'
                    theme={{ floating: { target: 'w-full' } }}
                  >
                    {['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((endPlanet) => (
                      <Dropdown.Item
                        key={endPlanet}
                        onClick={() => setSelectedEndPlanet(endPlanet)}
                      >
                        {endPlanet}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
              )}
              <button
                type='submit'
                onClick={() => setShowShortDestinations(true)}
                className='rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'
              >
                Search Routes
              </button>
            </form>
            <img src='/rocket.png' alt='A Rocket Image' className='h-40 hidden lg:block' />
          </div>
        </div>
        {showShortDestinations && (
          <div className='p-6 mt-8 bg-background-500 rounded-lg shadow-2xl'>
          <h2 className='text-tertiary-50 text-base lg:text-xl pb-4 w-full'>
            List of Destinations for {firstName || 'Guest'} {lastName || ''}
          </h2>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <div key={route.id} className='p-4 mb-4 w-full border rounded-lg flex justify-between items-center'>
                <div>
                  <h3 className='text-primary-500 text-base lg:text-lg'>
                    {route.from.name} → {route.to.name}
                  </h3>
                  <p className='text-tertiary-50 text-sm lg:text-base'>{route.distance} km</p>
                </div>
                <button
                  onClick={() => {
                    handleChooseRoute(route);
                    setShowShortProviders(true);
                  }}
                  className='rounded-lg text-tertiary-50 text-sm lg:text-base py-2 px-4 bg-primary-500 hover:bg-primary-700'
                >
                  Choose Route
                </button>
              </div>
            ))
          ) : (
            <p className='text-tertiary-200'>No routes available. Please select a location.</p>
          )}
        </div>
        )}
        
        {showShortProviders && (
          <div className='p-6 mt-8 bg-background-500 rounded-lg shadow-2xl'>
          <h2 className='text-tertiary-50 text-base lg:text-xl pb-4 w-full'>List of Companies for this Route</h2>
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <div key={provider.id} className='p-4 mb-4 w-full border rounded-lg flex justify-between items-center'>
                <div className='text-tertiary-50 flex flex-col justify-center items-start gap-2'>
                  <h3 className='text-primary-500 text-base lg:text-lg'>{provider.company.name}</h3>
                  <p className='text-tertiary-50 text-sm lg:text-base flex justify-center items-center gap-1'><Rocket size={16} />{formatDate(provider.flightStart)}</p>
                  <p className='text-tertiary-50 text-sm lg:text-base flex justify-center items-center gap-1'><Rocket size={16} className='rotate-180' /> {formatDate(provider.flightEnd)}</p>
                  <p className='text-tertiary-500 text-base lg:text-lg'>€ {provider.price}</p>
                </div>
                <button
                  className='rounded-lg text-tertiary-50 text-sm lg:text-base py-2 px-4 bg-primary-500 hover:bg-primary-700'
                >
                  Book Reservation
                </button>
              </div>
            ))
          ) : (
            <p className='text-tertiary-200'>No providers available for this route.</p>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default TravelRoutes;
