import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react';

const FilterSortDropdowns = ({
  filterByCompany, 
  sortBy, 
  setFilterByCompany, 
  setSortBy, 
  filteredRoutes,
  selectedStartPlanet, 
  selectedEndPlanet
}) => {
  const [filteredByCompany, setFilteredByCompany] = useState(filteredRoutes);

  const companyOptions = ['All Companies', ...new Set(
    filteredRoutes
      .flatMap(route => route.legs.map(leg => leg.company))
      .filter(company => company)
  )];

  useEffect(() => {
    const filteredRoutesByCompany = handleCompanyFilter(filterByCompany);
    setFilteredByCompany(filteredRoutesByCompany);
  }, [filterByCompany, filteredRoutes, selectedStartPlanet, selectedEndPlanet]);

  const handleCompanyFilter = (selectedCompany) => {
    if (selectedCompany === 'All Companies') {
      return filteredRoutes;
    }
    return filteredRoutes.filter(route => 
      route.legs.every(leg => leg.company === selectedCompany) &&
      route.startPlanet === selectedStartPlanet &&
      route.endPlanet === selectedEndPlanet
    );
  };

  const sortOptions = [
    { value: 'totalPrice', label: 'Price' },
    { value: 'totalTravelTime', label: 'Travel Time' },
    { value: 'totalDistance', label: 'Distance' }
  ];

  return (
    <div className='flex justify-center items-center gap-4 w-full'>
      <Dropdown
        label={filterByCompany || 'Company'}
        options={companyOptions}
        onSelect={setFilterByCompany}
        buttonText='Select Company'
      />

      <Dropdown
        label={sortBy ? sortOptions.find(option => option.value === sortBy)?.label : 'Sort by'}
        options={sortOptions.map(option => option.label)}
        onSelect={(selectedSort) => setSortBy(sortOptions.find(option => option.label === selectedSort)?.value)}
        buttonText='Select Sorting'
      />
    </div>
  );
};

FilterSortDropdowns.propTypes = {
  filterByCompany: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  setFilterByCompany: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  filteredRoutes: PropTypes.array.isRequired,
  selectedStartPlanet: PropTypes.string.isRequired,
  selectedEndPlanet: PropTypes.string.isRequired,
};

export default FilterSortDropdowns;
