const TravelRoutes = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-40 items-center p-10'>
      <div className='flex flex-col justify-center items-center shadow-2xl rounded-lg bg-background-500'>
        <h2 className='text-tertiary-50 text-base lg:text-xl p-4'>Start Your Interplanetary Adventure!</h2>
        <div className='flex justify-center items-center gap-8 p-6 lg:p-10'>
          <form className='flex flex-col justify-center items-center gap-4'>
            <div className='flex gap-4 lg:gap-8'>
              <input
                type='text'
                name='first-name'
                placeholder='First Name'
                className='rounded-lg placeholder-tertiary-200 text-sm lg:text-base px-4 bg-transparent border border-tertiary-50 w-full'
              />
              <input
                type='text'
                name='last-name'
                placeholder='Last Name'
                className='rounded-lg placeholder-tertiary-200 text-sm lg:text-base px-4 bg-transparent border border-tertiary-50 w-full'
              />
            </div>
            <button
              className='rounded-lg text-tertiary-200 text-sm lg:text-base py-2 px-4 w-full text-left bg-transparent border border-tertiary-50'
            >
              Your Location
            </button>
            <button
              className='rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700'
            >
              Search Routes
            </button>
          </form>
          <img src='/rocket.png' alt='A Rocket Image' className='h-40 hidden lg:block' />
        </div>
      </div>
      <div>
        <h1>list of destionations</h1>
      </div>
    </div>
  );
};

export default TravelRoutes;