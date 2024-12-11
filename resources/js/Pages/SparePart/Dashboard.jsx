import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import SearchInput from '../../Components/DaisyUI/SearchInput';
import Button from '../../Components/DaisyUI/Button';
import axios from 'axios';
import EditSparePartModal from './EditSparePartModal'; // Import the modal component

const Dashboard = ({ spareparts }) => {
    const [search, setSearch] = useState('');
    const [selectedSparePart, setSelectedSparePart] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [income, setIncome] = useState(5000); // Temporary value
    const [outcome, setOutcome] = useState(2000); // Temporary value
    const [profit, setProfit] = useState(income - outcome); // Calculate profit
    const [mostUsedSpareParts, setMostUsedSpareParts] = useState([
        { id: 1, name: 'Brake Pad', usageCount: 15 },
        { id: 2, name: 'Oil Filter', usageCount: 10 },
        { id: 3, name: 'Air Filter', usageCount: 8 },
    ]); // Temporary values
    const [todayData, setTodayData] = useState([
        { id: 1, sparePartName: 'Brake Pad', quantitySold: 5, totalRevenue: 100 },
        { id: 2, sparePartName: 'Oil Filter', quantitySold: 3, totalRevenue: 45 },
        { id: 3, sparePartName: 'Air Filter', quantitySold: 2, totalRevenue: 30 },
    ]); // Temporary values

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

    return (
        <AuthenticatedLayout page={'Spare Parts'} action={'Dashboard'}>
            <Head title="Spare Parts Dashboard" />

            <div className="mb-4">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="Search spare parts..."
                        />
                    </div>
                    <Button color="primary" onClick={() => {/* Add your input button action here */}}>Add Spare Part</Button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Income</h3>
                        <p className="text-2xl">${income}</p>
                    </div>
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Outcome</h3>
                        <p className="text-2xl">${outcome}</p>
                    </div>
                    <div className="card p-4 bg-white shadow-md text-center">
                        <h3 className="text-lg font-bold">Profit</h3>
                        <p className="text-2xl">${profit}</p>
                    </div>
                </div>

                {/* Most Used Spare Parts */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold">Most Used Spare Parts</h3>
                    <ul className="list-disc pl-5">
                        {mostUsedSpareParts.map(part => (
                            <li key={part.id}>{part.name} - {part.usageCount} times</li>
                        ))}
                    </ul>
                </div>

                {/* Today's Data Table */}
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
                                    <td className="border border-gray-300 px-4 py-2">${data.totalRevenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Spare Parts Table */}
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
                                    <td className="border border-gray-300 px-4 py-2">${part.price}</td>
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
        </AuthenticatedLayout>
    );
};

export default Dashboard;
