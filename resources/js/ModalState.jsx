import React, { useState, useEffect } from 'react';
import DataInputModal from 'Components/DaisyUI/DataInputModal';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [categories, setCategories] = useState([]);

    const toggleModal = (data = null) => {
        setModalData(data);
        setIsOpen(!isOpen);
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('api/categories');
            const categoryData = await response.json();
            setCategories(categoryData);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    return (
        <div>
            <button onClick={() => toggleModal()}>Open Modal</button>
            <DataInputModal isOpen={isOpen} data={modalData} onClose={toggleModal} categories={categories} />
        </div>
    );
};

export default App;
