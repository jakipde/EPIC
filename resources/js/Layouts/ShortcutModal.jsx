import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ isOpen, onClose }) => {
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={handleOverlayClick}
            >
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-lg font-bold">Select an Option</h2>
                    <div className="mt-4">
                        <button
                            onClick={() => handleOptionSelect('repair')}
                            className="mr-2 btn btn-primary"
                        >
                            Add New Repair
                        </button>
                        <button
                            onClick={() => handleOptionSelect('customer')}
                            className="btn btn-primary"
                        >
                            Add New Customer
                        </button>
                    </div>
                    {selectedOption && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold">
                                You selected: {selectedOption === 'repair' ? 'Add New Repair' : 'Add New Customer'}
                            </h3>
                            {/* Here you can add the form or additional content based on the selected option */}
                        </div>
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
