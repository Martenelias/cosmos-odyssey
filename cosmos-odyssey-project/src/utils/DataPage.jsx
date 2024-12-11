import { useState, useEffect } from 'react';
import fetchData from './ApiList';
import { getLegs, getProviders, getRoutesInfo } from './DataParser';

const DataPage = () => {
  const [legs, setLegs] = useState([]);
  const [providers, setProviders] = useState([]);
  const [routeInfos, setRouteInfos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      console.log('data:', data);
      const parsedLegs = getLegs(data);
      const parsedProviders = getProviders(parsedLegs);
      console.log('parsedProviders:', parsedProviders);
      const parsedRoutesInfo = getRoutesInfo(parsedLegs);
      console.log('parsedRoutesInfo:', parsedRoutesInfo);

      setLegs(parsedLegs);
      setProviders(parsedProviders);
      setRouteInfos(parsedRoutesInfo);
      console.log('parsedLegs:', parsedLegs);
    };

    loadData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[100px]'>
      {legs.map((leg, index) => (
        <div key={leg.id} className='pt-10'>
          <h3 className='bg-primary-500'>Legs index: {index + 1}: {leg.routeInfo.from.name} → {leg.routeInfo.to.name}</h3>
          <p>Distance: {leg.routeInfo.distance}</p>
          <ul>
            {providers.filter((provider) => provider.legId === leg.id).map((provider) => (
                <li key={provider.id} className='bg-secondary-500'>
                  <span>Company: {provider.company.name}</span>
                  <span>Flight Start: {provider.flightStart}</span>
                  <span>Flight End: {provider.flightEnd}</span>
                  <span>Price: {provider.price}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DataPage;