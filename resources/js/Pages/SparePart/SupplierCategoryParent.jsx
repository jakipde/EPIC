import React, { useState } from 'react';
import SparePartsFormModal from './SparePartsFormModal';
import SupplierCategoryModal from './SupplierCategoryModal';

const MainComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isSparePartsModalOpen, setIsSparePartsModalOpen] = useState(false);
    const [isSupplierCategoryModalOpen, setIsSupplierCategoryModalOpen] = useState(false);

    const handleAddSupplier = (newSupplier) => {
        setSuppliers((prev) => [...prev, newSupplier]);
    };

    const handleAddCategory = (newCategory) => {
        setCategories((prev) => [...prev, newCategory]);
    };

    const handleOpenSparePartsModal = () => {
        setIsSparePartsModalOpen(true);
    };

    const handleCloseSparePartsModal = () => {
        setIsSparePartsModalOpen(false);
    };

    return (
        <div>
            <button onClick={() => setIsSupplierCategoryModalOpen(true)}>Add Supplier/Category</button>
            <button onClick={handleOpenSparePartsModal}>Add Spare Part</button>

            <SupplierCategoryModal
                isOpen={isSupplierCategoryModalOpen}
                onClose={() => setIsSupplierCategoryModalOpen(false)}
                onAddSupplier={handleAddSupplier}
                onAddCategory={handleAddCategory}
            />

            <SparePartsFormModal
                isOpen={isSparePartsModalOpen}
                onClose={handleCloseSparePartsModal}
                suppliers={suppliers}
                categories={categories}
            />
        </div>
    );
};

export default MainComponent;
