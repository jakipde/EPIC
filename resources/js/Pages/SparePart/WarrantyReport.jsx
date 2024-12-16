import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import SearchInput from '../../Components/DaisyUI/SearchInput';
import Button from '../../Components/DaisyUI/Button';
import DataTable from '../../Components/DaisyUI/DataTable';
import Stat from '../../Components/DaisyUI/Stat';
import { CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const WarrantyReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [warrantyReports, setWarrantyReports] = useState([
        { customer: 'Customer A', status: 'Active' },
        { customer: 'Customer B', status: 'Expired' },
        { customer: 'Customer C', status: 'Active' },
        { customer: 'Customer D', status: 'Pending' },
    ]);

    const [searchWarranty, setSearchWarranty] = useState('');
    const [itemsPerPageWarranty, setItemsPerPageWarranty] = useState(10);
    const [currentPageWarranty, setCurrentPageWarranty] = useState(1);

    const [sparePartsData, setSparePartsData] = useState([
        { date: '2024-12-01', invoice: 'INV-001', customer: 'Customer A', hargaModal: 2500, hargaJual: 4000, profit: 1500, payment: 'Cash', admin: 'Admin A' },
        { date: '2024-12-02', invoice: 'INV-002', customer: 'Customer B', hargaModal: 3000, hargaJual: 5000, profit: 2000, payment: 'Credit', admin: 'Admin B' },
        { date: '2024-12-03', invoice: 'INV-003', customer: 'Customer C', hargaModal: 1500, hargaJual: 2500, profit: 1000, payment: 'Cash', admin: 'Admin C' },
        { date: '2024-12-04', invoice: 'INV-004', customer: 'Customer D', hargaModal: 2000, hargaJual: 3500, profit: 1500, payment: 'Debit', admin: 'Admin D' },
    ]);

    const [searchSpareParts, setSearchSpareParts] = useState('');
    const [itemsPerPageSpareParts, setItemsPerPageSpareParts] = useState(10);
    const [currentPageSpareParts, setCurrentPageSpareParts] = useState(1);

    const [income, setIncome] = useState(5000000);
    const [outcome, setOutcome] = useState(2000000);
    const [profit, setProfit] = useState(income - outcome);

    const formatCurrency = (amount) => `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

    const warrantyHeaders = ['No', 'Customer', 'Warranty Status'];
    const sparePartsHeaders = ['No', 'Date', 'Invoice', 'Customer', 'Harga Modal', 'Harga Jual', 'Profit', 'Payment', 'Admin'];

    const filteredWarrantyReports = warrantyReports.filter(report => {
        return report.customer.toLowerCase().includes(searchWarranty.toLowerCase()) ||
            report.status.toLowerCase().includes(searchWarranty.toLowerCase());
    });

    const filteredSparePartsData = sparePartsData.filter(part => {
        const partDate = new Date(part.date);
        const isWithinDateRange =
            (!startDate || partDate >= new Date(startDate)) &&
            (!endDate || partDate <= new Date(endDate));

        return (
            part.customer.toLowerCase().includes(searchSpareParts.toLowerCase()) &&
            isWithinDateRange
        );
    });

    const paginatedWarrantyReports = filteredWarrantyReports.slice(
        (currentPageWarranty - 1) * itemsPerPageWarranty,
        currentPageWarranty * itemsPerPageWarranty
    );

    const paginatedSparePartsData = filteredSparePartsData.slice(
        (currentPageSpareParts - 1) * itemsPerPageSpareParts,
        currentPageSpareParts * itemsPerPageSpareParts
    );

    return (
        <AuthenticatedLayout page="Warranty Report">
            <Head title="Warranty Report" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Warranty Report Page</h1>

                {/* Warranty Area */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-2">Warranty Area</h3>
                    <div className="flex items-center mb-4">
                        <label className="mr-2">Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input input-bordered mr-4"
                        />
                        <label className="mr-2">End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex mb-4">
                        <SearchInput
                            onChange={(e) => setSearchWarranty(e.target.value)}
                            value={searchWarranty}
                            placeholder="Search warranty reports ..."
                        />
                        <select onChange={(e) => setItemsPerPageWarranty(Number(e.target.value))} className="select select-bordered ml-2">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <DataTable
                        headers={warrantyHeaders}
                        data={paginatedWarrantyReports.map((report, index) => ({
                            No: (currentPageWarranty - 1) * itemsPerPageWarranty + index + 1,
                            ...report,
                        }))}
                    />
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(filteredWarrantyReports.length / itemsPerPageWarranty) }, (_, index) => (
                            <Button
                                key={index + 1}
                                size="sm"
                                onClick={() => setCurrentPageWarranty(index + 1)}
                                className={`mx-1 ${currentPageWarranty === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-2">Data Report Area</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <Stat
                            title="Income"
                            value={formatCurrency(income)}
                            icon={<CurrencyDollarIcon className="h-8 w-8 text-blue-500" />}
                        />
                        <Stat
                            title="Outcome"
                            value={formatCurrency(outcome)}
                            icon={<ArrowDownIcon className="h-8 w-8 text-red-500" />}
                        />
                        <Stat
                            title="Profit"
                            value={formatCurrency(profit)}
                            icon={<ArrowUpIcon className="h-8 w-8 text-green-500" />}
                        />
                    </div>
                                        <div className="flex items-center mb-4">
                        <label className="mr-2">Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input input-bordered mr-4"
                        />
                        <label className="mr-2">End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Button
                            size="sm"
                            type="primary"
                            onClick={() => window.print()}
                            className="ml-4 mr-4">
                            Print
                        </Button>
                        <SearchInput
                            onChange={(e) => setSearchSpareParts(e.target.value)}
                            value={searchSpareParts}
                            placeholder="Search spare parts ..."
                            className="mr-4"
                        />
                        <select
                            onChange={(e) => setItemsPerPageSpareParts(Number(e.target.value))}
                            className="select select-bordered ml-2"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <DataTable
                        headers={sparePartsHeaders}
                        data={paginatedSparePartsData.map((part, index) => ({
                            No: (currentPageSpareParts - 1) * itemsPerPageSpareParts + index + 1,
                            ...part,
                        }))}
                    />
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(filteredSparePartsData.length / itemsPerPageSpareParts) }, (_, index) => (
                            <Button
                                key={index + 1}
                                size="sm"
                                onClick={() => setCurrentPageSpareParts(index + 1)}
                                className={`mx-1 ${currentPageSpareParts === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
