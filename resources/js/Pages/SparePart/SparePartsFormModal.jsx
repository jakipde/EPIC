import React, { useState, useEffect, useRef } from "react";
import SupplierCategoryModal from "./SupplierCategoryModal";
import axios from 'axios'; // Import axios for making HTTP requests

const SparePartsFormModal = ({ isOpen, onClose, onAddSparePart }) => {
    const [sku, setSku] = useState('');
    const [supplier, setSupplier] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [nameInBarcode, setNameInBarcode] = useState('');
    const [grade, setGrade] = useState('');
    const [stock, setStock] = useState(0);
    const [minStock, setMinStock] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
    const [storePrice, setStorePrice] = useState(0);
    const [specialPrice, setSpecialPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [ecommerceLink, setEcommerceLink] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [isSupplierCategoryModalOpen, setIsSupplierCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState([]); // State to hold categories
    const [subCategories, setSubCategories] = useState([]); // State to hold subcategories
    const [suppliers, setSuppliers] = useState([]); // State to hold suppliers
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Generate random SKU when the modal opens
            const randomSku = `SKU-${Math.floor(1000000 + Math.random() * 9000000)}`;
            setSku(randomSku);

            // Reset fields when modal opens
            resetFields();

            // Fetch suppliers when the modal opens
            fetchSuppliers();
        }
    }, [isOpen]);

    const resetFields = () => {
        setSupplier('');
        setProductCode('');
        setProductName('');
        setNameInBarcode('');
        setGrade('');
        setStock(0);
        setMinStock(0);
        setCostPrice(0);
        setStorePrice(0);
        setSpecialPrice(0);
        setSellingPrice(0);
        setEcommerceLink('');
        setCategory('');
        setSubCategory('');
        setDescription('');
        setProductImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset file input
        }
    };

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
        }
    };

    const handleSupplierChange = async (e) => {
        const selectedSupplierId = e.target.value;
        setSupplier(selectedSupplierId);
        setCategory(''); // Reset category when supplier changes
        setSubCategory(''); // Reset subcategory when supplier changes
        setSubCategories([]); // Clear subcategories

        if (selectedSupplierId) {
            try {
                // Fetch categories based on selected supplier
                const response = await axios.get(`/api/product-categories?supplier_id=${selectedSupplierId}`);
                setCategories(response.data); // Store categories in state

                // Optionally, fetch the default category if needed
                if (response.data.length > 0) {
                    setCategory(response.data[0].id); // Set default selected category
                    // Now fetch subcategories for the default category
                    const subResponse = await axios.get(`/api/product-categories/${response.data[0].id}/subcategories`);
                    setSubCategories(subResponse.data); // Store subcategories in state
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        } else {
            setCategories([]); // Clear categories if no supplier is selected
        }
    };

    const handleCategoryChange = async (e) => {
        const selectedCategoryId = e.target.value;
        setCategory(selectedCategoryId);
        setSubCategory(''); // Reset subcategory when category changes
        setSubCategories([]); // Clear subcategories

        if (selectedCategoryId) {
            try {
                // Fetch subcategories based on selected category
                const response = await axios.get(`/api/product-categories/${selectedCategoryId}/subcategories`);
                setSubCategories(response.data); // Store subcategories in state
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newSparePart = {
            sku,
            supplier,
            product_code: productCode,
            product_name: productName,
            name_in_barcode: nameInBarcode,
            grade,
            stock,
            min_stock: minStock,
            cost_price: costPrice,
            store_price: storePrice,
            special_price: specialPrice,
            selling_price: sellingPrice,
            ecommerce_link: ecommerceLink,
            category,
            sub_category: subCategory,
            description,
            product_image: productImage,
        };

        setLoading(true);
        try {
            // Submit the new spare part
            await axios.post('/api/spare-parts', newSparePart);
            alert("Spare part added successfully!");
            resetFields(); // Reset fields after success
            onClose();
        } catch (error) {
            setErrorMessage("Error adding spare part: " + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }

        onAddSparePart(newSparePart);
        onClose();
    };

    const openSupplierCategoryModal = () => {
        setIsSupplierCategoryModalOpen(true);
    };

    const closeSupplierCategoryModal = () => {
        setIsSupplierCategoryModalOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box max-w-5xl w-full p-4">
                <div className="mb-4 flex justify-between items-center">
                    <div className="font-bold text-lg">{sku}</div>
                    <button className="btn btn-primary" onClick={openSupplierCategoryModal}>
                        Add Supplier/Category
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Supplier</span>
                                </label>
                                <select
                                    value={supplier}
                                    onChange={handleSupplierChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">--SELECT SUPPLIER--</option>
                                    {suppliers.map((sup) => (
                                        <option key={sup.id} value={sup.id}>
                                            {sup.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Name in Barcode</span>
                                </label>
                                <input
                                    type="text"
                                    value={nameInBarcode}
                                    onChange={(e) => setNameInBarcode(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select
                                            value={category}
                                            onChange={handleCategoryChange}
                                            className="select select-bordered"
                                            required
                                        >
                                            <option value="">--SELECT CATEGORY--</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Sub-category</span>
                                        </label>
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="select select-bordered"
                                            required
                                        >
                                            <option value="">-- SELECT SUB-CATEGORY--</option>
                                            {subCategories.map((subCat) => (
                                                <option key={subCat.id} value={subCat.id}>
                                                    {subCat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Grade</span>
                                </label>
                                <input
                                    type="text"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered"
                                    placeholder="Enter product description"
                                ></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text">Stock</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={stock}
                                        onChange={(e) => setStock(Math.max(0, e.target.value))}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text">Minimum Stock</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={minStock}
                                        onChange={(e) => setMinStock(Math.max(0, e.target.value))}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered"
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-control mb-10">
                        <label className="label">
                            <span className="label-text">Link e-commerce (optional)</span>
                        </label>
                        <input
                            type="text"
                            value={ecommerceLink}
                            onChange={(e) => setEcommerceLink(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>

                    {/* Spacing */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* Pricing Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Cost Price</span>
                            </label>
                            <input
                                type="number"
                                value={costPrice}
                                onChange={(e) => setCostPrice(Math.max(0, e.target.value))}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Store Price</span>
                            </label>
                            <input
                                type="number"
                                value={storePrice}
                                onChange={(e) => setStorePrice(Math.max(0, e.target.value))}
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Special Price</span>
                            </label>
                            <input
                                type="number"
                                value={specialPrice}
                                onChange={(e) => setSpecialPrice(Math.max(0, e.target.value))}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Selling Price</span>
                            </label>
                            <input
                                type="number"
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(Math.max(0, e.target.value))}
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-action flex justify-end">
                        <button type="button" onClick={onClose} className="btn">Close</button>
                        <button type="submit" class="btn btn-primary ml-2">Submit</button>
                    </div>
                </form>
                {/* Render the SupplierCategoryModal */}
                <SupplierCategoryModal
                    isOpen={isSupplierCategoryModalOpen}
                    onClose={closeSupplierCategoryModal}
                />
            </div>
        </div>
    );
};

export default SparePartsFormModal;
