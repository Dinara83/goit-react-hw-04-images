import PropTypes from 'prop-types';

import css from './btn.module.css';

const Button = ({ onloadMore }) => {
  return (
    <div className={css.containerBtn}>
      <button type="button" className={css.button} onClick={onloadMore}>
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
