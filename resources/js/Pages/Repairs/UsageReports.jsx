import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';

const UsageReports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Sample data for today's calculations
    const todayCalculations = {
        expenses: 3000,
        income: 5000,
        profit: 2000,
    };

    // Sample data for sparepart usage
    const sparepartData = [
        { date: '2024-12-01', part: 'Part A', status: 'Used' },
        { date: '2024-12-02', part: 'Part B', status: 'Not Used' },
        { date: '2024-12-03', part: 'Part C', status: 'External Sparepart' },
        // Add more sample data as needed
    ];

    // Sample data for warranty information
    const warrantyData = [
        { no: 1, invoice: 'INV-001', startDate: '2024-01-01', customer: 'Customer A', expirationDate: '2025-01-01', status: 'Active' },
        { no: 2, invoice: 'INV-002', startDate: '2024-02-01', customer: 'Customer B', expirationDate: '2025-02-01', status: 'Expired' },
        // Add more sample data as needed
    ];

    // Filter sparepart data
    const filteredSparepartData = sparepartData.filter(item => {
        return item.part.toLowerCase().includes(search.toLowerCase());
    });

    // Filter warranty data
    const filteredWarrantyData = warrantyData.filter(item => {
        return item.customer.toLowerCase().includes(search.toLowerCase());
    });

    // Filter usage report data
    const sampleData = [
        { date: '2024-12-01', invoice: 'INV-001', customer: 'Customer A', expenses: 2500, income: 4000, profit: 1500 },
        { date: '2024-12-02', invoice: 'INV-002', customer: 'Customer B', expenses: 3000, income: 5000, profit: 2000 },
        // Add more sample data as needed
    ];

    const filteredData = sampleData.filter(item => {
        const itemDate = new Date(item.date);
        const isWithinDateRange = (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));
        return isWithinDateRange && (item.customer.toLowerCase().includes(search.toLowerCase()));
    });

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrint = () => {
        // Implement print functionality for reports
        console.log('Print functionality not implemented yet.');
    };

    return (
        <AuthenticatedLayout page="Usage Reports">
            <Head title="Usage Reports" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Usage Reports</h1>

                {/* Today's Calculations */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Today's Calculations</h2>
                    <p>Expenses: Rp{todayCalculations.expenses.toLocaleString()}</p>
                    <p>Income: Rp{todayCalculations.income.toLocaleString()}</p>
                    <p>Profit: Rp{todayCalculations.profit.toLocaleString()}</p>
                </div>

                {/* Spare Parts Usage Table */}
                <h2 className="text-xl font-semibold mb-2">Spare Parts Usage</h2>
                <div className="flex mb-4">
                    <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search spare parts..." />
                </div>
                <DataTable
                    headers={['No', 'Date', 'Spare Part', 'Status']}
                    data={filteredSparepartData .map((item, index) => ({
                        No: index + 1,
                        ...item,
                    }))}
                />

                {/* Warranty Information Table */}
                <h2 className="text-xl font-semibold mt-6 mb-2">Warranty Information</h2>
                <DataTable
                    headers={['No', 'Invoice', 'Start Date', 'Customer', 'Expiration Date', 'Status']}
                    data={filteredWarrantyData.map((item) => ({
                        ...item,
                    }))}
                />

                {/* Usage Report Table */}
                <h2 className="text-xl font-semibold mt-6 mb-2">Usage Report</h2>
                <div className="flex mb-4">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered mr-2" />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-bordered mr-2" />
                    <select onChange={(e) => setItemsPerPage(Number(e.target.value))} className="select select-bordered ml-2">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <DataTable
                    headers={['No', 'Date', 'Invoice', 'Customer', 'Expenses', 'Income', 'Profit']}
                    data={paginatedData.map((item, index) => ({
                        No: (currentPage - 1) * itemsPerPage + index + 1,
                        ...item,
                    }))}
                />
                <div className="flex justify-center mt-4">
                    {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                        <Button
                            key={index + 1}
                            size="sm"
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>

                {/* Print Button */}
                <div className="flex justify-end mt-4">
                    <Button size="sm" onClick={handlePrint}>Print Reports</Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UsageReports;
