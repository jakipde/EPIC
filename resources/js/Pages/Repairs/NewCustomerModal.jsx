import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerType, setCustomerType] = useState('User'); // Removed trailing space
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New success message

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal')) {
            onClose();
        }
    };

    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

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

            onAddCustomer(response.data); // Assuming API returns the created customer
            setSuccessMessage('Customer added successfully!');
            resetForm();
            setTimeout(onClose, 2000); // Auto-close modal after success
        } catch (error) {
            setErrorMessage('Failed to add customer. Please try again.');
        }
    };

    const resetForm = () => {
        setCustomerName('');
        setCustomerPhone('');
        setCustomerType('User');
    };

    useEffect(() => {
        console.log('Rendering New Customer Modal'); // Log when rendering the modal
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
