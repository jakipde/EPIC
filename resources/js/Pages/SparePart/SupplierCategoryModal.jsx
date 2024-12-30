import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

const SupplierCategoryModal = ({ isOpen, onClose, onAddSupplier, onAddCategory }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        supplierName: "",
        supplierAddress: "",
        supplierPhone: "",
        categoryName: "",
        categoryPicture: null,
        subCategoryName: "",
        selectedCategory: "",
        selectedSupplier: "",
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
            fetchSuppliers();
            resetForm();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/product-categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setNotification("Failed to load categories.");
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get("/api/suppliers");
            setSuppliers(response.data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            setNotification("Failed to load suppliers.");
        }
    };

    const resetForm = () => {
        setSelectedOption("");
        setFormData({
            supplierName: "",
            supplierAddress: "",
            supplierPhone: "",
            categoryName: "",
            categoryPicture: null,
            subCategoryName: "",
            selectedCategory: "",
            selectedSupplier: "",
        });
        setNotification(""); // Clear notification
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleFormChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleAddButtonClick = async () => {
        try {
            let response;
            if (selectedOption === "supplier") {
                response = await axios.post("/api/suppliers", {
                    name: formData.supplierName,
                    contact_name: formData.supplierAddress,
                    phone: formData.supplierPhone,
                });
                onAddSupplier(response.data);
                setNotification("Supplier added successfully!");
            } else if (selectedOption === "category") {
                const formDataToSend = new FormData();
                formDataToSend.append("name", formData.categoryName);
                formDataToSend.append("supplier_id", formData.selectedSupplier);
                if (formData.categoryPicture) {
                    formDataToSend.append("photo", formData.categoryPicture);
                }
                response = await axios.post("/api/product-categories", formDataToSend);
                onAddCategory(response.data);
                setNotification("Category added successfully!");
            } else if (selectedOption === "subcategory") {
                response = await axios.post("/api/product-subcategories", {
                    name: formData.subCategoryName,
                    product_category_id: formData.selectedCategory,
                });
                setNotification("Subcategory added successfully!");
            }

            // Refresh categories and suppliers after adding data
            await fetchCategories();
            await fetchSuppliers();
            resetForm(); // Reset form after successful submission
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding data:", error.response ? error.response.data : error.message);
            setNotification("Failed to add data. Please try again.");
        }
    };

    const renderForm = () => {
        if (selectedOption === "supplier") {
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
                    {/* Add additional fields here if needed */}
                </div>
            );
        } else if (selectedOption === "category") {
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
                    <label className="block mb-2">Select Supplier</label>
                    <select
                        className="input input-bordered w-full mb-4"
                        name="selectedSupplier"
                        value={formData.selectedSupplier}
                        onChange={handleFormChange}
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    <label className="block mb-2">Upload Picture</label>
                    <input
                        type="file"
                        className="input input-bordered w-full mb-4"
                        name="categoryPicture"
                        onChange={handleFormChange}
                    />
                </div>
            );
        } else if (selectedOption === "subcategory") {
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
                        {categories.map((category) => {
                            const supplier = suppliers.find(s => s.id === category.supplier_id);
                            const displayText = supplier ? `${category.name} (${supplier.name})` : category.name;
                            return (
                                <option key={category.id} value={category.id}>
                                    {displayText}
                                </option>
                            );
                        })}
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
                            {selectedOption === "supplier" ? "Supplier" : selectedOption === "category" ? "Category" : "Subcategory"}
                        </h2>
                    </div>
                    {notification && (
                        <div className={`mb-4 p-2 text-center ${notification.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                            {notification}
                        </div>
                    )}
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => handleOptionSelect("supplier")}
                            className="mr-2 btn btn-primary"
                        >
                            Supplier
                        </button>
                        <button
                            onClick={() => handleOptionSelect("category")}
                            className="mr-2 btn btn-primary"
                        >
                            Category
                        </button>
                        <button
                            onClick={() => handleOptionSelect("subcategory")}
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
