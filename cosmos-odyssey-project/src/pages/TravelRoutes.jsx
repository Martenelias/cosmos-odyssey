import { useState, useEffect } from 'react';
import fetchData from '../utils/ApiList';
import { getLegs, getRoutesInfo, getProviders } from '../utils/DataParser';
import { findJourneyByProviders } from '../utils/JourneyFinder';
import { addRoutesDetails } from '../utils/RouteEnricher';
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
      const legs = getLegs(data);
      setRouteInfos(getRoutesInfo(legs));
      setProviders(getProviders(legs));
    };
    loadData();
  }, []);

  const handleSearchRoutes = (e) => {
    e.preventDefault();
    const allRoutes = findJourneyByProviders(selectedPlanet, selectedEndPlanet, routeInfos, providers);
    const enrichedRoutes = addRoutesDetails(allRoutes);
    setFilteredRoutes(enrichedRoutes);
    setRoutesContainer(true);
  };

  const getFilteredAndSortedRoutes = () => {
    let routes = [...filteredRoutes];

    if (filterByCompany) {
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
          <>
            <FilterSortDropdowns
              {...{ filterByCompany, sortBy, setFilterByCompany, setSortBy, filteredRoutes }}
            />
            <RouteList routes={getFilteredAndSortedRoutes()} />
          </>
        )}
      </div>
    </div>
  );
};

export default TravelRoutes;
