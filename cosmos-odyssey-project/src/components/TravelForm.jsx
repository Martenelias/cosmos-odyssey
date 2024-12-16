import { Dropdown } from 'flowbite-react';
import PropTypes from 'prop-types';

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
    <form className='flex flex-col justify-center items-center gap-4 p-6 border' onSubmit={handleSearchRoutes}>
      <div className='flex gap-4 lg:gap-8'>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='rounded-lg ...'
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='rounded-lg ...'
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
          {planets.map((planet) => (
            <Dropdown.Item key={planet} onClick={() => setSelectedPlanet(planet)}>
              {planet}
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
          {planets.map((planet) => (
            <Dropdown.Item key={planet} onClick={() => setSelectedEndPlanet(planet)}>
              {planet}
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
  );
};
TravelForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  selectedPlanet: PropTypes.string.isRequired,
  selectedEndPlanet: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setSelectedPlanet: PropTypes.func.isRequired,
  setSelectedEndPlanet: PropTypes.func.isRequired,
  handleSearchRoutes: PropTypes.func.isRequired,
};

export default TravelForm;
