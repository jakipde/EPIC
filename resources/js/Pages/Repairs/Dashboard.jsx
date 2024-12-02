import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import EditRepairModal from './EditRepairModal'; // Import the modal component

const Dashboard = ({ repairs, categories }) => {
    const [search, setSearch] = useState('');
    const [selectedRepair, setSelectedRepair] = useState(null); // State to hold the selected repair for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    const filteredRepairs = repairs.filter(repair => {
        const customerId = repair.customer_id ? String(repair.customer_id).toLowerCase() : '';
        const phoneBrand = repair.phone_brand ? String(repair.phone_brand).toLowerCase() : '';
        const damageDescription = repair.damage_description ? String(repair.damage_description).toLowerCase() : '';

        return (
            customerId.includes(search.toLowerCase()) ||
            phoneBrand.includes(search.toLowerCase()) ||
            damageDescription.includes(search.toLowerCase())
        );
    });

    const handleEdit = (repair) => {
        setSelectedRepair(repair); // Set the selected repair for editing
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
        setSelectedRepair(null); // Reset selected repair
    };

    const handleDelete = async (repair) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete repair with ID: ${repair.id}?`);
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/repairs/${repair.id}`); // Ensure this URL is correct
                if (response.data.success) {
                    alert('Repair deleted successfully');
                    // Optionally, update the state to remove the deleted repair
                }
            } catch (error) {
                console.error('Error deleting repair:', error);
                alert('Failed to delete repair.');
            }
        }
    };

    return (
        <AuthenticatedLayout page={'Repairs'} action={'Dashboard'}>
            <Head title="Repairs Dashboard" />

            <div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row gap-1">
                        <Button size="sm" type="primary">
                            Add Repair
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="Search repairs..."
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table mb-4">
                        <thead>
                            <tr>
                                <th>Entry Date</th>
                                <th>Customer ID</th>
                                <th>Cashier</th>
                                <th>Phone Brand</th>
                                <th>Damage Description</th>
                                <th>Technician ID</th>
                                <th>Invoice Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRepairs.map((repair) => (
                                <tr key={repair.id}>
                                    <td>{repair.entry_date}</td>
                                    <td>{repair.customer_id}</td>
                                    <td>{repair.cashier}</td>
                                    <td>{repair.phone_brand}</td>
                                    <td>{repair.damage_description}</td>
                                    <td>{repair.technician_id}</td>
                                    <td>{repair.invoice_number}</td>
                                    <td>
                                        <Button size="sm" onClick={() => handleEdit(repair)}>Edit</Button>
                                        <Button size="sm" onClick={() => handleDelete(repair)} type="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Repair Modal */}
            {isModalOpen && (
                <EditRepairModal
                    modalState={{ isOpen: isModalOpen, data: selectedRepair }}
                    categories={categories}
                    onClose={handleCloseModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
