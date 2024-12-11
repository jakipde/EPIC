import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import SearchInput from '../../Components/DaisyUI/SearchInput';
import Button from '../../Components/DaisyUI/Button';
import axios from 'axios';
import EditSparePartModal from './EditSparePartModal'; // Import the modal component
import DataInputModal from '../../Components/DaisyUI/DataInputModal'; // Import the DataInputModal

const Dashboard = ({ spareparts, categories = [] }) => {
    const [search, setSearch] = useState('');
    const [selectedSparePart, setSelectedSparePart] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDataInputModalOpen, setDataInputModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(6); // Default to category ID 6
    const [income, setIncome] = useState(5000000); // Example income in IDR
    const [outcome, setOutcome] = useState(2000000); // Example outcome in IDR
    const [profit, setProfit] = useState(income - outcome);
    const [mostUsedSpareParts, setMostUsedSpareParts] = useState([
        { id: 1, name: 'LCD', usageCount: 15 },
        { id: 2, name: 'Battery', usageCount: 10 },
        { id: 3, name: 'Connector', usageCount: 8 },
    ]);
    const [todayData, setTodayData] = useState([
        { id: 1, sparePartName: 'LCD', quantitySold: 5, totalRevenue: 1000000 },
        { id: 2, sparePartName: 'Battery', quantitySold: 3, totalRevenue: 675000 },
        { id: 3, sparePartName: 'Connector', quantitySold: 2, totalRevenue: 300000 },
    ]);

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
        setSelectedSparePart(part);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedSparePart(null);
    };

    const handleDelete = async (part) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete spare part with ID: ${part.id}?`);
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/spare-parts/${part.id}`);
                if (response.data.success) {
                    alert('Spare part deleted successfully');
                }
            } catch (error) {
                console.error('Error deleting spare part:', error);
                alert('Failed to delete spare part.');
            }
        }
    };

    const openDataInputModal = () => {
        setSelectedCategoryId(6); // Set the selected category ID to 6 for spare parts
        setDataInputModalOpen(true);
    };

    const handleDataInputSubmit = (data, closeModal) => {
        // Handle the data input submission logic here
        console.log('Submitted data:', data);
        closeModal(); // Close the modal after submission
    };

    const formatCurrency = (amount) => {
        return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    return (
        <AuthenticatedLayout page={'Phone Spare Parts'} action={'Dashboard'}>
            <Head title="Phone Spare Parts Dashboard" />

            <div className="mb-4">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="Search phone spare parts ..."
                        />
                    </div>
                    <Button size="sm" type="primary" onClick={openDataInputModal}>
                        Add Spare Part
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Income</h3>
                        <p className="text-2xl">{formatCurrency(income)}</p>
                    </div>
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Outcome</h3>
                        <p className="text-2xl">{formatCurrency(outcome)}</p>
                    </div>
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Profit</h3>
                        <p className="text-2xl">{formatCurrency(profit)}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-bold">Most Used Spare Parts</h3>
                    <ul className="list-disc pl-5">
                        {mostUsedSpareParts.map(part => (
                            <li key={part.id}>{part.name} - {part.usageCount} times</li>
                        ))}
                    </ul>
                </div>

                <div className="overflow-x-auto">
                    <h3 className="text-lg font-bold mb-2">Today's Data</h3>
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Spare Part</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
                                <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayData.map(data => (
                                <tr key={data.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{data.sparePartName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.quantitySold}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(data.totalRevenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Brand</th>
                                <th className="border border-gray-300 px-4 py-2">Type</th>
                                <th className="border border-gray-300 px-4 py-2">Model</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSpareParts.map((part) => (
                                <tr key={part.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{part.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{part.brand}</td>
                                    <td className="border border-gray-300 px-4 py-2">{part.type}</td>
                                    <td className="border border-gray-300 px-4 py-2">{part.model}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(part.price)}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Button size="sm" color="info" onClick={() => handleEdit(part)}>Edit</Button>
                                        <Button size="sm" color="danger" onClick={() => handleDelete(part)}>Delete</Button>
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

            {/* Modal for Data Input */}
            {isDataInputModalOpen && (
                <DataInputModal
                    modalState={{ isOpen: isDataInputModalOpen, toggle: () => setDataInputModalOpen(!isDataInputModalOpen) }}
                    categories={[{ id: 6, name: 'Spare Parts' }]} // Only include the spare parts category
                    selectedCategoryId={selectedCategoryId} // Pass the selected category ID
                    onSubmit={handleDataInputSubmit} // Pass the submit handler
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
