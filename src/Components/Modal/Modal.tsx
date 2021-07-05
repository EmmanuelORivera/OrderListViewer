import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './BackDrop';
import ModalOverlay from './ModalOverlay';
import { UseBooleanSetValue } from '../../Utils/useBoolean';

interface Props {
  setShowModal: UseBooleanSetValue;
  render: () => JSX.Element;
}

const Modal: FC<Props> = ({ setShowModal, render }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop setShowModal={setShowModal} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay render={render} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
