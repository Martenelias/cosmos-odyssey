import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const FilterSortDropdowns = ({ filterByCompany, sortBy, setFilterByCompany, setSortBy, filteredRoutes }) => {
  const companyOptions = ['All Companies', ...new Set(filteredRoutes.map((route) => route.companyName))];

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
  filterByCompany: PropTypes.string,
  sortBy: PropTypes.string,
  setFilterByCompany: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  filteredRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilterSortDropdowns;
