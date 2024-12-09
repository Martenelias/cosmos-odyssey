import { NavLink } from 'react-router-dom';

const Intro = () => {

  return (
    <div>
      <h1>Welcome to Cosmos Odyssey</h1>
      <NavLink to='/content' className='py-2 px-4 bg-blue-300 rounded m-2'>
        Explore
      </NavLink>
    </div>
  );
};

export default Intro;