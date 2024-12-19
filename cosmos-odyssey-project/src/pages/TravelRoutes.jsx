import { useState, useEffect } from 'react';
import fetchData from '../utils/ApiList';
import { getLegs, getRoutesInfo, getProviders } from '../utils/DataParser';
import { findAllRoutes } from '../utils/RouteFinder';
import { getTopRoutes } from '../utils/TopRoutes';
import TravelForm from '../components/TravelForm';
import FilterSortDropdowns from '../components/FilterSortDropdowns';
import ReservationContainer from '../components/ReservationContainer';
import RouteList from '../components/RouteList';
import { useReservationContext } from '../components/ReservationContext';

const TravelRoutes = () => {
  const [routeInfos, setRouteInfos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedEndPlanet, setSelectedEndPlanet] = useState(null);
  const [routesContainer, setRoutesContainer] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filterByCompany, setFilterByCompany] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [reservationWindow, setReservationWindow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      const parsedLegs = getLegs(data);
      const parsedRoutesInfo = getRoutesInfo(parsedLegs);
      const parsedProviders = getProviders(parsedLegs);

      console.log('Loaded Route Infos:', parsedRoutesInfo);
      console.log('Loaded Providers:', parsedProviders);

      setRouteInfos(parsedRoutesInfo);
      setProviders(parsedProviders);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (
      routeInfos.length > 0 &&
      providers.length > 0 &&
      selectedPlanet &&
      selectedEndPlanet
    ) {
      const allRoutes = findAllRoutes(
        routeInfos,
        providers,
        selectedPlanet,
        selectedEndPlanet,
        filterByCompany
      );

      let filteredRoutes = getTopRoutes(allRoutes);

      if (sortBy === 'totalPrice') {
        filteredRoutes.sort((a, b) => a.totalPrice - b.totalPrice);
      } else if (sortBy === 'totalTravelTime') {
        filteredRoutes.sort((a, b) => a.duration - b.duration);
      } else if (sortBy === 'totalDistance') {
        filteredRoutes.sort((a, b) => a.distance - b.distance);
      }

      setFilteredRoutes(filteredRoutes);
    }
  }, [routeInfos, providers, selectedPlanet, selectedEndPlanet, filterByCompany, sortBy]);


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

    setRoutesContainer(true);
  };

  const { addReservation } = useReservationContext();

  const confirmReservation = () => {
    addReservation({
      route: selectedRoute,
      firstName,
      lastName,
    });
    setReservationWindow(false);
    setSelectedRoute(null);
  };

  const handleReservation = (route) => {
    setSelectedRoute(route);
    setReservationWindow(true);
    console.log('Selected Route onClick:', route);
  };
  
  const closeReservationWindow = () => {
    setReservationWindow(false);
    setSelectedRoute(null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-28 items-center p-4'>
      <div className='max-w-[800px] w-full'>
        <h1 className='text-tertiary-50 lg:text-xl text-base w-full text-center pb-12'>
          Choose Your Destinations and Explore the Cosmos!
        </h1>
        <TravelForm
          {...{
            firstName,
            lastName,
            selectedPlanet,
            selectedEndPlanet,
            setFirstName,
            setLastName,
            setSelectedPlanet,
            setSelectedEndPlanet,
            handleSearchRoutes,
          }}
        />
        {routesContainer && (
          <div className='text-tertiary-50 rounded-lg'>
            <div className='flex justify-between items-center mb-4 w-full bg-background-500 rounded-lg p-4'>
              <img src='/rocket.svg' alt='A rocket svg image' className='h-16 p-4' />
              <div className='flex flex-col lg:flex-row gap-4 w-full'>
                <div className='flex items-center w-full'>
                  <div className='flex justify-center w-full items-center gap-4 lg:border-l lg:border-r border-l-none ml-4'>
                    <p className='text-lg'>{selectedPlanet}</p>
                    <img src='/smallRocket.svg' alt='Small rocket svg image' className='h-4 rotate-45' />
                    <p className='text-lg'>{selectedEndPlanet}</p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-4 w-full px-4'>
                  <FilterSortDropdowns
                    {...{ filterByCompany, sortBy, setFilterByCompany, setSortBy, filteredRoutes, selectedStartPlanet: selectedPlanet, selectedEndPlanet }}
                  />
                </div>
              </div>
            </div>
            <RouteList 
              routes={filteredRoutes} 
              handleReservation={handleReservation} 
            />

          </div>
        )}
        {reservationWindow && selectedRoute && (
          <ReservationContainer
            route={selectedRoute}
            closeReservation={closeReservationWindow}
            firstName={firstName}
            lastName={lastName}
            confirmReservation={confirmReservation}
          />
        )}

      </div>
    </div>
  );
};

export default TravelRoutes;
