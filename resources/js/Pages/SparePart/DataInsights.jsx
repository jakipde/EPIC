import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import SearchInput from '../../Components/DaisyUI/SearchInput';
import Button from '../../Components/DaisyUI/Button';
import DataTable from '../../Components/DaisyUI/DataTable';
import Stat from '../../Components/DaisyUI/Stat';
import { CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import SparePartsFormModal from './SparePartsFormModal';

const DataInsights = ({ spareparts, categories = [] }) => { const [searchWarranty, setSearchWarranty] = useState(''); const [itemsPerPageWarranty, setItemsPerPageWarranty] = useState(10); const [currentPageWarranty, setCurrentPageWarranty] = useState(1); const [warrantyReports, setWarrantyReports] = useState([ { customer: 'Customer A', status: 'Active' }, { customer: 'Customer B', status: 'Expired' }, { customer: 'Customer C', status: 'Active' }, { customer: 'Customer D', status: 'Pending' }, ]); const [income, setIncome] = useState(5000000); const [outcome, setOutcome] = useState(2000000); const profit = income - outcome; const [isSparePartsModalOpen, setSparePartsModalOpen] = useState(false);
const formatCurrency = (amount) => `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const warrantyHeaders = ['No', 'Customer', 'Warranty Status'];

const filteredWarrantyReports = warrantyReports.filter(report =>
    report.customer.toLowerCase().includes(searchWarranty.toLowerCase()) ||
    report.status.toLowerCase().includes(searchWarranty.toLowerCase())
);

const paginatedWarrantyReports = filteredWarrantyReports.slice(
    (currentPageWarranty - 1) * itemsPerPageWarranty,
    currentPageWarranty * itemsPerPageWarranty
);

const handleAddSparePart = (newSparePart) => {
    // Logic to add the new spare part to the state or send to the server
    console.log('New Spare Part Added:', newSparePart);
    setSparePartsModalOpen(false); // Close the modal after adding
};

return (
    <AuthenticatedLayout page="Data Insights">
        <Head title="Data Insights" />
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Data Insights</h1>

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

            <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Warranty Reports</h3>
                <div className="flex mb-4">
                    <SearchInput
                        onChange={(e) => setSearchWarranty(e.target.value)}
                        value={searchWarranty}
                        placeholder="Search warranty reports ..."
                    />
                    <select
                        onChange={(e) => setItemsPerPageWarranty(Number(e.target.value))}
                        className="select select-bordered ml-2"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <Button size="sm" type="primary" onClick={() => setSparePartsModalOpen(true)}>
                    Add Spare Part
                </Button>
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

            {/* Spare Parts Form Modal */}
            <SparePartsFormModal
                isOpen={isSparePartsModalOpen}
                onClose={() => setSparePartsModalOpen(false)}
                onAddSparePart={handleAddSparePart}
            />

            {/* Most Used Parts Section */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Most Used Parts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['Connector', 'LCD', 'Battery', 'Backdoor', 'IC EMMC', 'Buzzer'].map((part, index) => (
                        <div key={index}>
                            <p className="text-sm font-medium mb-1">{part}</p>
                            <progress className="progress progress-success w-56" value={Math.random() * 100} max="100"></progress>
                            <p className="text-xs mt-1">Used: {Math.floor(Math.random() * 100)} times</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
);
};

export default DataInsights;
