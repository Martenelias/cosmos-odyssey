import { Dropdown } from 'flowbite-react';
import PropTypes from 'prop-types';

const FilterSortDropdowns = ({ filterByCompany, sortBy, setFilterByCompany, setSortBy, filteredRoutes }) => {
  return (
    <div className='flex gap-4 mb-4'>
      <Dropdown
        label={filterByCompany || 'Choose Company'}
        color='light'
        theme={{ floating: { target: 'w-full' } }}
        placement='bottom'
      >
        {['', ...new Set(filteredRoutes.map((route) => route.companyName))].map((company) => (
          <Dropdown.Item key={company} onClick={() => setFilterByCompany(company)}>
            {company || 'All Companies'}
          </Dropdown.Item>
        ))}
      </Dropdown>

      <Dropdown
        label={sortBy || 'Sort by'}
        color='light'
        theme={{ floating: { target: 'w-full' } }}
        placement='bottom'
      >
        {['totalPrice', 'totalTravelTime', 'totalDistance'].map((sortOption) => (
          <Dropdown.Item key={sortOption} onClick={() => setSortBy(sortOption)}>
            {sortOption === 'totalPrice'
              ? 'Price'
              : sortOption === 'totalTravelTime'
              ? 'Travel Time'
              : 'Distance'}
          </Dropdown.Item>
        ))}
      </Dropdown>
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
