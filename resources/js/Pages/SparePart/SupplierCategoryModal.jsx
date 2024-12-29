import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const SupplierCategoryModal = ({ isOpen, onClose, categories }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierAddress: '',
        supplierPhone: '',
        categoryName: '',
        categoryPicture: null,
        subCategoryName: '',
        selectedCategory: '', // Added to track selected category in subcategory form
    });

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
            setSelectedOption('');
            onClose();
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setFormData({
            supplierName: '',
            supplierAddress: '',
            supplierPhone: '',
            categoryName: '',
            categoryPicture: null,
            subCategoryName: '',
            selectedCategory: '', // Reset the selected category when changing options
        });
    };

    const handleFormChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleAddButtonClick = () => {
        console.log('Form submitted:', formData);
        // Handle form submission (you can add the actual submission logic here)
        onClose(); // Close the modal after submission
    };

    const renderForm = () => {
        if (selectedOption === 'supplier') {
            return (
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="Supplier Name"
                        name="supplierName"
                        value={formData.supplierName}
                        onChange={handleFormChange}
                    />
                    <label className="block mb-2">Address</label>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="Supplier Address"
                        name="supplierAddress"
                        value={formData.supplierAddress}
                        onChange={handleFormChange}
                    />
                    <label className="block mb-2">Phone Number</label>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="Phone Number"
                        name="supplierPhone"
                        value={formData.supplierPhone}
                        onChange={handleFormChange}
                    />
                </div>
            );
        } else if (selectedOption === 'category') {
            return (
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="Category Name"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleFormChange}
                    />
                    <label className="block mb-2">Picture</label>
                    <input
                        type="file"
                        className="input input-bordered w-full mb-4"
                        name="categoryPicture"
                        onChange={handleFormChange}
                    />
                </div>
            );
        } else if (selectedOption === 'subcategory') {
            return (
                <div>
                    <label className="block mb-2">Subcategory Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="Subcategory Name"
                        name="subCategoryName"
                        value={formData.subCategoryName}
                        onChange={handleFormChange}
                    />
                    <label className="block mb-2">Select Category</label>
                    <select
                        className="input input-bordered w-full mb-4"
                        name="selectedCategory"
                        value={formData.selectedCategory}
                        onChange={handleFormChange}
                    >
                        <option value="">Select Category</option>
                        {Array.isArray(categories) && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
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
                <div className="bg-white p-6 rounded shadow-lg w-2/3 max-w-4xl">
                    <div className="mb-4 text-center">
                        <h2 className="text-lg font-bold">
                            {selectedOption === 'supplier' ? 'Supplier' : selectedOption === 'category' ? 'Category' : selectedOption === 'subcategory' ? 'Subcategory' : 'Select Supplier, Category, or Subcategory'}
                        </h2>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => handleOptionSelect('supplier')}
                            className="mr-2 btn btn-primary"
                        >
                            Supplier
                        </button>
                        <button
                            onClick={() => handleOptionSelect('category')}
                            className="mr-2 btn btn-primary"
                        >
                            Category
                        </button>
                        <button
                            onClick={() => handleOptionSelect('subcategory')}
                            className="btn btn-primary"
                        >
                            Subcategory
                        </button>
                    </div>

                    {selectedOption && (
                        <div className="mt-4">
                            {renderForm()}
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleAddButtonClick}
                                    className="btn btn-success"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default SupplierCategoryModal;
