import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Modal from '../../Components/DaisyUI/Modal';
import Button from '../../Components/DaisyUI/Button';
import axios from 'axios';

const EditSparePartModal = ({ part, onClose }) => {
    const [name, setName] = useState(part.name);
    const [brand, setBrand] = useState(part.brand);
    const [type, setType] = useState(part.type);
    const [model, setModel] = useState(part.model);
    const [price, setPrice] = useState(part.price);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/spare-parts/${part.id}`, {
                name,
                brand,
                type,
                model,
                price,
            });
            if (response.data.success) {
                alert('Spare part updated successfully');
                onClose();
            }
        } catch (error) {
            console.error('Error updating spare part:', error);
            alert('Failed to update spare part.');
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Spare Part</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Model</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-end">
                    <Button size="sm" type="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button size="sm" type="primary" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditSparePartModal;
