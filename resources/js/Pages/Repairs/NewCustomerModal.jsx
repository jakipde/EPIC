import React, { useState } from 'react';
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

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(customerPhone)) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        try {
            const response = await axios.post('/api/customers', {
                name: customerName,
                phone: customerPhone,
                customer_type: customerType,
            });

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
            } else {
                setErrorMessage('Failed to add customer: ' + (response.data.message || 'An unexpected error occurred.'));
            }
        } catch (error) {
            // Provide a more detailed error message
            if (error.response && error.response.data) {
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

export default NewCustomerModal;
