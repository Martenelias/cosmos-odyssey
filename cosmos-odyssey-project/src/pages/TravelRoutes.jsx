import { useState, useEffect } from 'react';
import fetchData from '../utils/ApiList';
import { getLegs, getRoutesInfo, getProviders } from '../utils/DataParser';
import { findAllJourneys } from '../utils/JourneyFinder';
import { enrichRoutes } from '../utils/RouteEnricher';
import TravelForm from '../components/TravelForm';
import FilterSortDropdowns from '../components/FilterSortDropdowns';
import RouteList from '../components/RouteList';

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

  const handleSearchRoutes = (e) => {
    e.preventDefault();
    const allRoutes = findAllJourneys(selectedPlanet, selectedEndPlanet, routeInfos, providers);
    const enrichedRoutes = enrichRoutes(allRoutes);
    setFilteredRoutes(enrichedRoutes);
    setRoutesContainer(true);
  };

  const getFilteredAndSortedRoutes = () => {
    let routes = [...filteredRoutes];
  
    if (filterByCompany && filterByCompany !== 'All Companies') {
      routes = routes.filter((route) => route.companyName === filterByCompany);
    }
  
    if (sortBy) {
      routes.sort((a, b) => {
        if (sortBy === 'totalPrice') return a.totalPrice - b.totalPrice;
        if (sortBy === 'totalTravelTime') return a.totalTravelTime - b.totalTravelTime;
        if (sortBy === 'totalDistance') return a.distance - b.distance;
        return 0;
      });
    }
  
    return routes;
  };
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-28 items-center p-4'>
      <div className='max-w-[800px] w-full'>
        <h1 className='text-tertiary-50 lg:text-xl text-base w-full text-center pb-12'>Choose Your Destinations and Explore the Cosmos!</h1>
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
                  {...{ filterByCompany, sortBy, setFilterByCompany, setSortBy, filteredRoutes }}
                  />
                </div>
              </div>
            </div>
            <RouteList routes={getFilteredAndSortedRoutes()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelRoutes;
