import React from 'react';
import {ModalProps} from '../types/@types';

const Modal: React.FC<ModalProps> = ({children, isOpen, onClose}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" />

      <div className="relative mx-auto mt-10 max-w-3xl rounded-lg overflow-y-auto bg-white">
        <div className="px-4 py-5 sm:px-6">
          {children}
          <button className="flex justify-end" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
