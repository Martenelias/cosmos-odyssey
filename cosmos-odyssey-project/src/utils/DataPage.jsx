import { useState, useEffect } from 'react';
import fetchData from './ApiList';
import { getLegs, getProviders, getRoutesInfo } from './DataParser';

const DataPage = () => {
  const [legs, setLegs] = useState([]);
  const [providers, setProviders] = useState([]);
  const [routesInfo, setRoutesInfo] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      const parsedLegs = getLegs(data);
      const parsedProviders = getProviders(parsedLegs);
      const parsedRoutesInfo = getRoutesInfo(parsedLegs);
      setLegs(parsedLegs);
      console.log('parsedLegs:', parsedLegs);
      setProviders(parsedProviders);
      console.log('parsedProviders:', parsedProviders);
      setRoutesInfo(parsedRoutesInfo);
      console.log('parsedRoutesInfo:', parsedRoutesInfo);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>data overview</h1>
      <h2>Legs</h2>
      <pre className='bg-primary-500'>{JSON.stringify(legs, null, 2)}</pre>
      <h2>Providers</h2>
      <pre>{JSON.stringify(providers, null, 2)}</pre>
      <h2>Routes Info</h2>
      <pre className='bg-primary-500'>{JSON.stringify(routesInfo, null, 2)}</pre>
    </div>
  );
};

export default DataPage;