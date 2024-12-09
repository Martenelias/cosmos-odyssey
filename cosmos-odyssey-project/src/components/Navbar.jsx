import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar className='bg-backgroundDark-900 text-backgroundLight-500 font-exo-2 fixed w-full'>
      <Navbar.Brand href="/">
      <img src="/space.svg" className="mr-3 xl:h-12 lg:h-9 h-7" alt="Cosmos Odyssey Logo" />
      <span className="self-center whitespace-nowrap text-lg lg:text-xl">Cosmos Odyssey</span>
      </Navbar.Brand>
      <Navbar.Toggle className='hover:bg-transparent text-backgroundLight-500' />
      <Navbar.Collapse>
        <NavLink to='/' active className='text-xl md:text-lg  my-2 py-2 px-4 rounded-lg hover:bg-backgroundDark-500'>
          Home
        </NavLink>
        <NavLink to='/routes' className='text-xl md:text-lg  my-2 py-2 px-4 rounded-lg hover:bg-backgroundDark-500'>
          Routes
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;