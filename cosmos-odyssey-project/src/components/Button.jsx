import PropTypes from 'prop-types';

const Button = ({ type = 'button', onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg text-tertiary-50 py-2 px-4 w-full bg-primary-500 hover:bg-primary-700 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
