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

    return (
        <AuthenticatedLayout page="Usage Reports">
            <Head title="Usage Reports" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Usage Reports</h1>
                <div className="flex mb-4">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered mr-2" />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-bordered mr-2" />
                    <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search..." />
                    <select onChange={(e) => setItemsPerPage(Number(e.target.value))} className="select select-bordered ml-2">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <DataTable
                    headers={['Date', 'Invoice', 'Customer', 'Expenses', 'Income', 'Profit']}
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
            </div>
        </AuthenticatedLayout>
    );
};

export default UsageReports;
