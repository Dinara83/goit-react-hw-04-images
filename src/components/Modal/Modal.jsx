import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClickModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClickModal);
  }

  handleClickModal = ({ target, currentTarget, code }) => {
    if (currentTarget === target || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { handleClickModal } = this;
    return createPortal(
      <div className={css.overlay} onClick={handleClickModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
