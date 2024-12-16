import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar className='bg-background-700 text-tertiary-50 font-exo-2 fixed w-full z-50'>
      <Navbar.Brand href='/'>
      <img src='/space.svg' className='pl-2 mr-3 xl:h-8 lg:h-6 h-5' alt='Cosmos Odyssey Logo' />
      <span className='self-center whitespace-nowrap text-base font-orbitron'>Cosmos Odyssey</span>
      </Navbar.Brand>
      <Navbar.Toggle className='hover:bg-transparent text-tertiary-50' />
      <Navbar.Collapse>
        <NavLink to='/' active className='text-base md:text-sm my-1 py-2 px-4 rounded-lg hover:bg-primary-900'>
          Home
        </NavLink>
        <NavLink to='/routes' className='v my-1 py-2 px-4 rounded-lg hover:bg-primary-900'>
          Routes
        </NavLink>
        <NavLink to='/reservations' className='v my-1 py-2 px-4 rounded-lg hover:bg-primary-900'>
          Reservations
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;