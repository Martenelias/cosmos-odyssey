import { useReservationContext } from '../components/ReservationContext';
import { LandPlot, Clock, Rocket } from 'lucide-react';

const Reservations = () => {
  const { reservations, deleteReservation } = useReservationContext();
  console.log('Reservations:', reservations);

  return (
    <div className='min-h-screen bg-gradient-to-b from-secondary-700 to-background-900 font-exo-2 flex flex-col pt-28 items-center p-4'>
      <div className='max-w-[800px] w-full'>
        <h1 className='text-tertiary-50 text-lg text-center pb-12'>Reservations</h1>
        <ul className='w-full flex flex-col gap-4'>
          {reservations.map((reservation, index) => (
            <li key={index} className='bg-background-500 rounded-lg p-4'>
              <div className='text-tertiary-50 p-4 rounded-lg'>
                <p className='text-primary-500 text-lg'>
                  {reservation.firstName} {reservation.lastName}
                </p>
                <div className='flex lg:flex-row flex-col gap-4 my-2 border-b-2 pb-2'>
                  <div className='flex items-center gap-2'>
                    {reservation.route.legs[0].from}
                    <img
                      src='/smallRocket.svg'
                      alt='Small rocket icon'
                      className='h-4 rotate-45'
                    />
                    {reservation.route.legs[reservation.route.legs.length - 1].to}
                  </div>
                  <p className='flex items-center gap-2'>
                    <LandPlot />
                    {reservation.route.totalPrice.toFixed(2)}
                  </p>
                  <p className='flex items-center gap-2'>
                    <Clock />
                    {reservation.route.duration} hours
                  </p>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <ul className='text-tertiary-200 flex flex-col gap-2 w-full'>
                    {reservation.route.legs.map((leg, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <Rocket />
                        {leg.from} to {leg.to} with {leg.company}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => deleteReservation(index)}
                    className='rounded-lg text-tertiary-50 py-2 px-4 mt-4 bg-tertiary-500 hover:bg-tertiary-700'
                  >
                      Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservations;
