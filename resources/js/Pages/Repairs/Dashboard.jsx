import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import EditRepairModal from './EditRepairModal'; // Import the modal component
import Accordion from '@/Components/DaisyUI/Accordion'; // Import the Accordion component

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

                {/* Repairs Table */}
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
                                        <Button size="sm" type="danger" onClick={() => handleDelete(repair)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Categories Accordion */}
                {Array.isArray(categories) && categories.length > 0 ? (
                    <Accordion>
                        {categories.map((category) => (
                            <Accordion.Item key={category.id} title={category.name}>
                                {filteredRepairs
                                    .filter(repair => repair.category_id === category.id)
                                    .map(repair => (
                                        <div key={repair.id} className="p-2 border-b">
                                            <p>{repair.damage_description}</p>
                                            <Button size="sm" onClick={() => handleEdit(repair)}>Edit</Button>
                                            <Button size="sm" type="danger" onClick={() => handleDelete(repair)}>Delete</Button>
                                        </div>
                                    ))}
                                {/* Displaying additional information for the category */}
                                <div className="mt-2">
                                    <p>Additional Info:</p>
                                    <ul>
                                        <li>Pengeluaran Sparepart Toko: 0.00</li>
                                        <li>Pengeluaran Sparepart Luar: 0.00</li>
                                        <li>Penghasilan: 0.00</li>
                                        <li>Laba: 0.00</li>
                                    </ul>
                                </div>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <p>No categories available.</p>
                )}

                {/* Modal for Editing Repair */}
                {isModalOpen && (
                    <EditRepairModal
                        repair={selectedRepair}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
