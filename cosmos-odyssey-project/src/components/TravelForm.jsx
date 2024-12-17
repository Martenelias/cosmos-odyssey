import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const TravelForm = ({
  firstName,
  lastName,
  selectedPlanet,
  selectedEndPlanet,
  setFirstName,
  setLastName,
  setSelectedPlanet,
  setSelectedEndPlanet,
  handleSearchRoutes,
}) => {
  const planets = ['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  return (
    <form className='flex justify-center items-center gap-4 p-8 mb-12 bg-background-500 rounded-lg' onSubmit={handleSearchRoutes}>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex gap-4 w-full'>
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='rounded-lg placeholder-tertiary-200 text-sm text-tertiary-50 lg:text-sm px-4 bg-transparent border border-tertiary-50 w-full'
          />
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='rounded-lg placeholder-tertiary-200 text-sm text-tertiary-50 lg:text-sm px-4 bg-transparent border border-tertiary-50 w-full'
          />
        </div>
        <div className='w-full'>
          <Dropdown
            label={selectedPlanet || 'Location'}
            options={planets}
            onSelect={setSelectedPlanet}
            buttonText='Location'
          />
        </div>

        <div className='w-full'>
          <Dropdown
            label={selectedEndPlanet || 'Destination'}
            options={planets}
            onSelect={setSelectedEndPlanet}
            buttonText='Destination'
          />
        </div>
        <Button
          type='submit'
        >
          Search Routes
        </Button>
      </div>
      <img src='/rocket.png' alt='A beautiful rocket in the cosmos' className='lg:h-64 md:h-52 hidden md:block' />
    </form>
  );
};
TravelForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  selectedPlanet: PropTypes.string,
  selectedEndPlanet: PropTypes.string,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setSelectedPlanet: PropTypes.func.isRequired,
  setSelectedEndPlanet: PropTypes.func.isRequired,
  handleSearchRoutes: PropTypes.func.isRequired,
};

export default TravelForm;
