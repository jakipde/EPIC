import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import RepairDetailModal from "./RepairDetailModal";
import ModalParent from './ModalParent';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false);
    const [isRepairDetailModalOpen, setRepairDetailModalOpen] = useState(false);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const fetchRepairs = async () => {
        try {
            const response = await fetch('/api/repairs');
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setRepairs(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error('Error fetching repairs:', error);
            setRepairs([]);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') setCashiers(response.data);
            else if (roleName === 'Technician') setTechnicians(response.data);
        } catch (error) {
            console.error(`Error fetching users:`, error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchRepairs();
        fetchCustomers();
        fetchUsersByRoleName('Cashier');
        fetchUsersByRoleName('Technician');
    }, []);

    const filteredRepairs = repairs.filter(repair => {
        const customerName = customers.find(customer => customer.id === repair.customer_id)?.name || '';
        const damageDesc = repair.damage_description || '';

        const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase()) ||
            damageDesc.toLowerCase().includes(search.toLowerCase());

        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
            (!endDate || new Date(repair.entry_date) <= new Date(endDate));

        return matchesSearch && matchesDateRange;
    });

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'Rp0';
        const number = parseFloat(value);
        if (isNaN(number)) return 'Rp0';
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    const handleRowClick = (event) => {
        const repair = event.data;
        console.log('Selected repair:', repair);
        setSelectedRepair(repair);
        setRepairDetailModalOpen(true);
    };

    // Column definitions for AG Grid
    const columnDefs = useMemo(() => [
        { headerName: "No", valueGetter: "node.rowIndex + 1", width: 70, resizable: true },
        { headerName: "Entry Date", field: "entry_date", resizable: true },
        { headerName: "Invoice", field: "invoice_number", resizable: true },
        { headerName: "Customer", field: "customer", cellClass: 'text-green-600 font-bold', resizable: true },
        { headerName: "Brand Model", field: "brand_model", resizable: true },
        { headerName: "Damage Description", field: "damage_description", cellClass: 'text-red-500', resizable: true },
        { headerName: "Notes", field: "notes", resizable: true },
        { headerName: "Total", field: "total", cellClass: 'text-purple-700 font-bold', resizable: true },
        { headerName: "Payment", field: "payment", resizable: true },
        { headerName: "Status", field: "status", resizable: true },
        {
            headerName: "Actions",
            cellRenderer: (params) => {
                return `<button class="btn btn-primary" onclick="handleEdit(${params.data.id})">Edit</button>`;
            },
            resizable: true,
            width: 100
        }
    ], []);

    const rowData = useMemo(() => filteredRepairs.map(repair => ({
        id: repair.id,
        entry_date: repair.entry_date,
        invoice_number: repair.invoice_number,
        customer: customers.find(customer => customer.id === repair.customer_id)?.name || 'N/A',
        brand_model: `${repair.phone_brand} ${repair.phone_model}`,
        damage_description: repair.damage_description,
        notes: repair.notes,
        total: formatCurrency(repair.total_price),
        payment: repair.payment_method || 'N/A',
        status: repair.status || 'Pending',
    })), [filteredRepairs, customers]);

    const onGridSizeChanged = useCallback((params) => {
        const gridWidth = document.querySelector('.ag-body-viewport').clientWidth;
        const columnsToShow = [];
        const columnsToHide = [];
        let totalColsWidth = 0;
        const allColumns = params.api.getAllColumns();

        if (allColumns && allColumns.length > 0) {
            for (let i = 0; i < allColumns.length; i++) {
                const column = allColumns[i];
                totalColsWidth += column.getMinWidth();
                if (totalColsWidth > gridWidth) {
                    columnsToHide.push(column.getColId());
                } else {
                    columnsToShow.push(column.getColId());
                }
            }
        }

        // Show/hide columns based on current grid width
        params.api.setColumnsVisible(columnsToShow, true);
        params.api.setColumnsVisible(columnsToHide, false);

        // Wait until columns stopped moving and fill out any available space
        window.setTimeout(() => {
            params.api.sizeColumnsToFit();
        }, 10);
    }, []);

    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>

                <div className="flex mb-4">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input input-bordered mr-2"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input input-bordered mr-2"
                    />
                    <SearchInput
                        onChange={(e) => setSearch(e.target.value)}
                        value={search} placeholder="Search repairs..."
                    />
                    <Button size="sm" type="primary" className="ml-2" onClick={() => setServiceFormModalOpen(true)}>Add Data</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onRowClicked={handleRowClick}
                        onGridSizeChanged={onGridSizeChanged}
                        pagination={true}
                        paginationPageSize={5}
                    />
                </div>

                {/* Modal Parent */}
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    isRepairDetailModalOpen={isRepairDetailModalOpen}
                    setRepairDetailModalOpen={setRepairDetailModalOpen}
                    selectedRepair={selectedRepair}
                />

                {/* Repair Detail Modal */}
                <RepairDetailModal
                    isOpen={isRepairDetailModalOpen}
                    onClose={() => setRepairDetailModalOpen(false)}
                    repair={selectedRepair}
                    customers={customers}
                    cashiers={cashiers}
                    technicians={technicians}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;
