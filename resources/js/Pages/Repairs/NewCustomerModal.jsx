import React, { useState } from 'react';
<<<<<<< Updated upstream
=======
import PropTypes from 'prop-types';
>>>>>>> Stashed changes
import axios from 'axios';

const NewCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerType, setCustomerType] = useState('User');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

<<<<<<< Updated upstream
=======
        // Validate phone number
>>>>>>> Stashed changes
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(customerPhone)) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        try {
<<<<<<< Updated upstream
=======
            // Send POST request to add a new customer
>>>>>>> Stashed changes
            const response = await axios.post('/api/customers', {
                name: customerName,
                phone: customerPhone,
                customer_type: customerType,
            });

<<<<<<< Updated upstream
            // Check for successful response
            if (response.status === 201) {
                onAddCustomer(response.data); // Pass the new customer
                setSuccessMessage('Customer added successfully!');
                resetForm();

                // Close modal after a short delay
                setTimeout(() => {
                    setSuccessMessage(''); // Reset success message after 3 seconds
                    onClose(); // Auto-close modal after success
                }, 3000);
=======
            if (response.status === 201) {
                const newCustomer = response.data; // Get the new customer from the response
                onAddCustomer(newCustomer); // Pass the new customer to the parent component
                setSuccessMessage('Customer added successfully!');
                resetForm();

                // Close the modal after a short delay
                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000);
>>>>>>> Stashed changes
            } else {
                setErrorMessage('Failed to add customer: ' + (response.data.message || 'An unexpected error occurred.'));
            }
        } catch (error) {
<<<<<<< Updated upstream
            // Provide a more detailed error message
            if (error.response && error.response.data) {
=======
            if (error.response) {
>>>>>>> Stashed changes
                setErrorMessage('Failed to add customer: ' + (error.response.data.message || 'An unexpected error occurred.'));
            } else {
                setErrorMessage('Failed to add customer. Please check your internet connection or try again later.');
            }
        }
    };

    const resetForm = () => {
        setCustomerName('');
        setCustomerPhone('');
        setCustomerType('User');
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-3">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="input input-bordered"
<<<<<<< Updated upstream
=======
                            placeholder="Enter customer name"
>>>>>>> Stashed changes
                            required
                        />
                    </div>
                    <div className="form-control mb-3">
                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="input input-bordered"
<<<<<<< Updated upstream
=======
                            placeholder="Enter phone number"
>>>>>>> Stashed changes
                            required
                        />
                    </div>
                    <div className="form-control mb-3">
                        <label className="label">Customer Type</label>
                        <select
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="User">User</option>
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

<<<<<<< Updated upstream
export default NewCustomerModal;
=======
// PropTypes for type checking
NewCustomerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddCustomer: PropTypes.func.isRequired, // Ensure this is defined
};

export default NewCustomerModal;
>>>>>>> Stashed changes
