import { useState, useEffect } from 'react';
import { Dropdown } from 'flowbite-react';
import fetchData from '../utils/ApiList';
import { getLegs, getRoutesInfo, getProviders } from '../utils/DataParser';

const TravelRoutes = () => {
  const [routeInfos, setRouteInfos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedEndPlanet, setSelectedEndPlanet] = useState(null);
  const [routesContainer, setRoutesContainer] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        const parsedLegs = getLegs(data);
        const parsedRoutesInfo = getRoutesInfo(parsedLegs);
        const parsedProviders = getProviders(parsedLegs);

        setRouteInfos(parsedRoutesInfo);
        setProviders(parsedProviders);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const findJourneyByProviders = (currentPlanet, destination) => {
    const providerRoutes = {};
    
    providers.forEach((provider) => {
      const allRoutes = [];
      const visited = new Set();
  
      const depthSearch = (current, path, distance, legs, price, duration, startTime) => {
        // Stop if the current planet has been visited
        if (visited.has(current)) return;
        visited.add(current);
  
        // If destination is reached
        if (current === destination) {
          allRoutes.push({
            path: [...path, current],
            distance,
            legs: [...legs],
            price,
            duration,
            startTime,
          });
          visited.delete(current);
          return;
        }
  
        // Find next possible routes
        const nextRoutes = routeInfos.filter(
          (route) => route.from.name === current && !visited.has(route.to.name)
        );
  
        for (const nextRoute of nextRoutes) {
          const legPrice = provider.price || 0;
  
          // Use the provider's flight start/end to calculate leg duration
          const legStartTime = startTime || new Date(provider.flightStart);
          const legDuration = Math.round(
            (new Date(provider.flightEnd) - new Date(provider.flightStart)) / 3600000
          ); // Convert ms to hours
  
          const legEndTime = new Date(legStartTime.getTime() + legDuration * 60 * 60 * 1000);
  
          depthSearch(
            nextRoute.to.name,
            [...path, current],
            distance + nextRoute.distance,
            [...legs, {
              legId: nextRoute.legId,
              distance: nextRoute.distance,
              duration: legDuration,
              legStartTime,
              legEndTime,
            }],
            price + legPrice,
            duration + legDuration, // Accumulate duration
            legEndTime // Next leg's startTime
          );
        }
  
        visited.delete(current); // Backtrack
      };
  
      // Start the DFS search from the current planet
      depthSearch(currentPlanet, [], 0, [], 0, 0, null);
  
      // If valid routes are found, process them
      if (allRoutes.length > 0) {
        providerRoutes[provider.company.name] = {
          routes: allRoutes,
          totalPrice: allRoutes.reduce((total, route) => total + route.price, 0),
          totalTime: allRoutes.reduce((total, route) => total + route.duration, 0),
        };
      } else {
        console.log(`No valid routes found for ${provider.company.name}`);
      }
    });
  
    console.log('Provider Routes after processing:', providerRoutes);
    return providerRoutes;
  };
  
  
  const addRoutesDetails = (routes) => {
    const enrichedRoutes = [];
  
    Object.entries(routes).forEach(([companyName, providerData]) => {
      const shortestRoute = providerData.routes.reduce((shortest, current) =>
        current.distance < (shortest?.distance || Infinity) ? current : shortest,
        null
      );
  
      if (!shortestRoute) {
        console.error(`No valid route found for ${companyName}`);
        return; // Skip if no route exists
      }
  
      const detailedLegs = shortestRoute.legs.map((leg) => ({
        distance: leg.distance,
        duration: leg.duration,
        startTime: leg.legStartTime ? leg.legStartTime.toISOString() : 'N/A',
        endTime: leg.legEndTime ? leg.legEndTime.toISOString() : 'N/A',
      }));
  
      enrichedRoutes.push({
        companyName,
        ...shortestRoute,
        detailedLegs, // Enriched legs
        totalPrice: shortestRoute.price,
        totalTravelTime: shortestRoute.duration, // Already calculated duration
      });
    });
  
    return enrichedRoutes;
  };
  
  

  const handleSearchRoutes = (e) => {
    e.preventDefault();
  
    if (!selectedPlanet || !selectedEndPlanet) {
      alert('Please select a location and destination!');
      return;
    }
  
    if (!firstName || !lastName) {
      alert('Please enter your first and last name!');
      return;
    }
  
    if (selectedPlanet === selectedEndPlanet) {
      alert('Please select a different destination!');
      return;
    }
  
    // Step 1: Find routes by providers
    const allProviderRoutes = findJourneyByProviders(selectedPlanet, selectedEndPlanet);
    console.log('All Provider Routes:', allProviderRoutes);
  
    if (Object.keys(allProviderRoutes).length === 0) {
      alert('No possible routes found.');
      setFilteredRoutes([]);
      setRoutesContainer(false);
      return;
    }
  
    // Step 2: Add detailed information to each route (prices, travel times, providers)
    const enrichedRoutes = addRoutesDetails(allProviderRoutes, providers);
  
    // Step 3: Set the filtered routes for display
    setFilteredRoutes(enrichedRoutes);
    setRoutesContainer(true);
  
    console.log('Enriched Routes:', enrichedRoutes);
  };
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-28 items-center p-4'>
      <div className='max-w-[800px] w-full'>
        <div className='flex flex-col justify-center items-center shadow-2xl rounded-lg bg-background-500'>
          <h2 className='text-tertiary-50 text-base lg:text-xl px-4 pt-10'>
            Start Your Interplanetary Adventure!
          </h2>
          <form
            className='flex flex-col justify-center items-center gap-4 p-6'
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
            <div className='block w-full'>
              <Dropdown
                label={
                  <span className='text-background-500 text-base'>
                    {selectedPlanet || 'Your Location'}
                  </span>
                }
                color='light'
                theme={{ floating: { target: 'w-full' } }}
                placement='bottom'
              >
                {[
                  'Earth',
                  'Mars',
                  'Venus',
                  'Mercury',
                  'Jupiter',
                  'Saturn',
                  'Uranus',
                  'Neptune',
                ].map((startPlanet) => (
                  <Dropdown.Item
                    key={startPlanet}
                    onClick={() => setSelectedPlanet(startPlanet)}
                  >
                    {startPlanet}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className='block w-full'>
              <Dropdown
                label={
                  <span className='text-background-500 text-base'>
                    {selectedEndPlanet || 'Destination'}
                  </span>
                }
                color='light'
                theme={{ floating: { target: 'w-full' } }}
                placement='bottom'
              >
                {[
                  'Earth',
                  'Mars',
                  'Venus',
                  'Mercury',
                  'Jupiter',
                  'Saturn',
                  'Uranus',
                  'Neptune',
                ].map((endPlanet) => (
                  <Dropdown.Item
                    key={endPlanet}
                    onClick={() => setSelectedEndPlanet(endPlanet)}
                  >
                    {endPlanet}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <button
              type='submit'
              className='rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'
            >
              Search Routes
            </button>
          </form>
        </div>
        {routesContainer && filteredRoutes.length > 0 && (
          <div className='p-6 mt-8 bg-background-500 rounded-lg shadow-2xl flex flex-col gap-4'>
            <h2 className='text-tertiary-50 text-base lg:text-xl pb-4 w-full'>
              List of Routes for
              <span className='ml-2 text-primary-500'>
                {selectedPlanet} → {selectedEndPlanet}
              </span>
            </h2>
            
            {filteredRoutes.map((route, index) => (
              <div
                key={index}
                className='border border-tertiary-200 rounded-lg p-4 bg-background-700'
              >
                <h3 className='text-primary-500 text-lg mb-2'>{route.companyName}</h3>
                <p className='text-tertiary-50'>
                  <strong>Path:</strong> {route.path.join(' → ')}
                </p>
                <p className='text-tertiary-50'>
                  <strong>Total Price:</strong> ${route.totalPrice.toLocaleString()}
                </p>
                <p className='text-tertiary-50'>
                  <strong>Total Travel Time:</strong> {route.totalTravelTime} hours
                </p>
                <p className='text-tertiary-50'>
                  <strong>Total Distance:</strong> {route.distance.toLocaleString()} km
                </p>

                <div className='mt-4'>
                  <h4 className='text-tertiary-200 text-base mb-2'>Detailed Legs:</h4>
                  {route.detailedLegs.map((leg, legIndex) => (
                    <div
                      key={legIndex}
                      className='border border-primary-500 rounded-md p-3 mb-3 bg-background-900'
                    >
                      <p className='text-tertiary-50'>
                        <strong>Leg {legIndex + 1}:</strong>
                      </p>
                      <p className='text-tertiary-50'>
                        <strong>Start Time:</strong> {new Date(leg.startTime).toLocaleString()}
                      </p>
                      <p className='text-tertiary-50'>
                        <strong>End Time:</strong> {new Date(leg.endTime).toLocaleString()}
                      </p>
                      <p className='text-tertiary-50'>
                        <strong>Distance:</strong> {leg.distance.toLocaleString()} km
                      </p>
                      <p className='text-tertiary-50'>
                        <strong>Duration:</strong> {leg.duration} hours
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TravelRoutes;