import { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ label, options, onSelect, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className='relative w-full'>
      <button
        onClick={toggleDropdown}
        type='button'
        className='w-full flex justify-center items-center text-white bg-transparent border border-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-500 rounded-lg text-sm px-4 py-2 text-center inline-flex items-center'
      >
        {label || buttonText}
        <svg
          className='w-2.5 h-2.5 ms-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute left-0 right-0 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full'>
          <ul className='py-2 text-sm text-tertiary-500'>
            {options.map((option, index) => (
              <li key={index}>
                <a
                  href='#'
                  onClick={() => handleOptionClick(option)}
                  className='block px-4 py-2 hover:bg-primary-500'
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  buttonText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
