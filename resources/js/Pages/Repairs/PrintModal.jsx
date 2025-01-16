import React, { useEffect, useState } from 'react';

const PrintModal = ({ isOpen, onClose, onPrint }) => {
    const printTypes = ['Dot Matrix', 'Thermal', 'JET', 'Non Print'];
    const [selectedPrintType, setSelectedPrintType] = useState('');

    // Close modal when clicking outside
    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal')) {
            onClose(); // Close modal if clicked outside the modal content
        }
    };

    // Close modal when pressing the "Esc" key
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            onClose(); // Close modal when "Esc" is pressed
        }
    };

    // Attach event listeners for "Esc" key press and outside click
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.addEventListener('click', handleClickOutside);
        }

        // Cleanup event listeners on modal close
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handlePrint = (type) => {
        setSelectedPrintType(type); // Set the selected print type
    };

    const handleConfirmPrint = () => {
        onPrint(selectedPrintType); // Call the onPrint function with the selected type
        onClose(); // Close the modal after printing
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : 'hidden'}`}>
            <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
                <h3 className="font-bold text-xl mb-4 text-center">Select Print Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Print Type Selection */}
                    <div className="flex flex-col">
                        {printTypes.map((type) => (
                            <button
                                key={type}
                                className={`btn ${selectedPrintType === type ? 'btn-primary' : 'btn-outline'} mb-2`}
                                onClick={() => handlePrint(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Showcase Area */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h4 className="font-bold">Selected Print Type:</h4>
                        <p className="text-lg text-green-600">{selectedPrintType || 'None'}</p>
                        <div className="mt-2 p-2 border border-gray-200 rounded">
                            <p className="text-sm">This is a preview of how the print will look.</p>
                        </div>
                    </div>
                </div>

                <div className="modal-action flex justify-end mt-4">
                    <button type="button" className="btn btn-primary ml-2" onClick={handleConfirmPrint} disabled={!selectedPrintType}>
                        Confirm Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrintModal;
