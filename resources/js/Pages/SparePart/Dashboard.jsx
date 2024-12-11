import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import SearchInput from '../../Components/DaisyUI/SearchInput';
import Button from '../../Components/DaisyUI/Button';
import axios from 'axios';
import EditSparePartModal from './EditSparePartModal'; // Import the modal component

const Dashboard = ({ spareparts }) => {
    const [search, setSearch] = useState('');
    const [selectedSparePart, setSelectedSparePart] = useState(null); // State to hold the selected spare part for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    const filteredSpareParts = spareparts.filter(part => {
        const name = part.name ? String(part.name).toLowerCase() : '';
        const brand = part.brand ? String(part.brand).toLowerCase() : '';
        const type = part.type ? String(part.type).toLowerCase() : '';
        const model = part.model ? String(part.model).toLowerCase() : '';

        return (
            name.includes(search.toLowerCase()) ||
            brand.includes(search.toLowerCase()) ||
            type.includes(search.toLowerCase()) ||
            model.includes(search.toLowerCase())
        );
    });

    const handleEdit = (part) => {
        setSelectedSparePart(part); // Set the selected spare part for editing
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
        setSelectedSparePart(null); // Reset selected spare part
    };

    const handleDelete = async (part) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete spare part with ID: ${part.id}?`);
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/spare-parts/${part.id}`); // Ensure this URL is correct
                if (response.data.success) {
                    alert('Spare part deleted successfully');
                    // Optionally, update the state to remove the deleted spare part
                }
            } catch (error) {
                console.error('Error deleting spare part:', error);
                alert('Failed to delete spare part.');
            }
        }
    };

    return (
        <AuthenticatedLayout page={'Spare Parts'} action={'Dashboard'}>
            <Head title="Spare Parts Dashboard" />

            <div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row gap-1">
                        <Button size="sm" type="primary">
                            Add Spare Part
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="Search spare parts..."
                        />
                    </div>
                </div>

                {/* Spare Parts Table */}
                <div className="overflow-x-auto">
                    <table className="table mb-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Type</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSpareParts.map((part) => (
                                <tr key={part.id}>
                                    <td>{part.name}</td>
                                    <td>{part.brand}</td>
                                    <td>{part.type}</td>
                                    <td>{part.model}</td>
                                    <td>${part.price}</td>
                                    <td>
                                        <Button size="sm" onClick={() => handleEdit(part)}>Edit</Button>
                                        <Button size="sm" type="danger" onClick={() => handleDelete(part)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Editing Spare Part */}
            {isModalOpen && (
                <EditSparePartModal
                    part={selectedSparePart}
                    onClose={handleCloseModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
