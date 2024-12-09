import { NavLink } from 'react-router-dom';

const Intro = () => {

  return (
    <div className='min-h-screen flex justify-end bg-[url("/galaxy.jpg")] bg-cover'>
      <div className='min-h-screen max-w-[600px] w-full py-8 px-16'>
        <div className='flex flex-col justify-center items-center h-full gap-16'>
          <h1 className='font-orbitron text-4xl text-center text-backgroundLight-500'>Cosmos<br/>Odyssey</h1>
          <p className='font-orbitron text-lg text-center text-backgroundLight-700'>Explore the Solar System Like Never Before!</p>
          <div className='h-full border'></div>
          <NavLink to='/content' className='bg-backgroundLight-500 text-backgroundDark-500 font-exo-2 hover:scale-110 transition-transform duration-500 py-4 px-8 rounded-lg mb-16'>
            EXPLORE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Intro;