import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

const NewCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerType, setCustomerType] = useState('User '); // New state for Customer Type
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message

        // Validate phone number format (basic validation)
        const phoneRegex = /^[0-9]{10,15}$/; // Adjust regex as needed
        if (!phoneRegex.test(customerPhone)) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        try {
            // Make an API call to add the customer
            const response = await axios.post('/api/customers', {
                name: customerName,
                phone: customerPhone,
                customer_type: customerType,
            });

            // Call the onAddCustomer function passed from the parent component
            onAddCustomer(response.data); // Assuming the API returns the created customer
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error adding customer:', error);
            setErrorMessage('Failed to add customer. Please try again.');
        }
    };

    const resetForm = () => {
        setCustomerName('');
        setCustomerPhone('');
        setCustomerType('User '); // Reset customer type
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                {errorMessage && <div className="alert alert-error">{errorMessage}</div>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Customer Type</span>
                        </label>
                        <select
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="User ">User </option>
                            <option value="Store">Store</option>
                        </select>
                    </div>
                    <div className="modal-action flex justify-end">
                        <button type="button" onClick={onClose} className="btn">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Customer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCustomerModal;
