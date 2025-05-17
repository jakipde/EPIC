import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

            if (response.status === 201) {
                const newCustomer = response.data;
                onAddCustomer(newCustomer);
                setSuccessMessage('Customer added successfully!');
                resetForm();

                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000);
            } else {
                setErrorMessage('Failed to add customer: ' + (response.data.message || 'An unexpected error occurred.'));
            }
        } catch (error) {
            if (error.response) {
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
                            placeholder="Enter customer name"
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
                            placeholder="Enter phone number"
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

NewCustomerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddCustomer: PropTypes.func.isRequired,
};

export default NewCustomerModal;