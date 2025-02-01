import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MasterDetailModule } from 'ag-grid-enterprise';
import RepairDetailModal from "./RepairDetailModal"; // Import the RepairDetailModal
import ModalParent from './ModalParent';

// Register all AG Grid modules including MasterDetailModule
ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule]);

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false);
    const [isRepairDetailModalOpen, setRepairDetailModalOpen] = useState(false);
    const [selectedRepair, setSelectedRepair] = useState(null);

    const fetchRepairs = async () => {
        try {
            const response = await fetch('/api/repairs');
            const result = await response.json();
            setRepairs(result.data || []);
        } catch (error) {
            console.error('Error fetching repairs:', error);
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

    const fetchCashiers = async () => {
        try {
            const response = await axios.get('/api/cashiers');
            setCashiers(response.data);
        } catch (error) {
            console.error('Error fetching cashiers:', error);
        }
    };

    const fetchTechnicians = async () => {
        try {
            const response = await axios.get('/api/technicians');
            setTechnicians(response.data);
        } catch (error) {
            console.error('Error fetching technicians:', error);
        }
    };

    useEffect(() => {
        fetchRepairs();
        fetchCustomers();
        fetchCashiers();
        fetchTechnicians();
    }, []);

    const filteredRepairs = repairs.filter(repair => {
        const customerName = customers.find(customer => customer.id === repair.customer_id)?.name || '';
        const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase()) ||
            repair.damage_description.toLowerCase().includes(search.toLowerCase());
        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
            (!endDate || new Date(repair.entry_date) <= new Date(endDate));
        return matchesSearch && matchesDateRange;
    });

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'Rp0';
        return `Rp${parseFloat(value).toLocaleString()}`;
    };

    const columnDefs = useMemo(() => [
        {
            headerName: "No",
            valueGetter: "node.rowIndex + 1",
            width: 70,
            resizable: true,
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => params.node.setExpanded(!params.node.expanded)}>
                    <span>{params.node.rowIndex + 1}</span>
                    <button className={`expand-button ${params.node.expanded ? 'expanded' : ''}`} style={{ marginLeft: '5px', background: 'none', border: 'none' }}>
                        {params.node.expanded ? "▼" : "►"}
                    </button>
                </div>
            ),
        },
        { headerName: "Entry Date", field: "entry_date", flex: 1, resizable: true },
        { headerName: "Invoice", field: "invoice_number", flex: 1, resizable: true },
        { headerName: "Customer", field: "customer", flex: 1, resizable: true },
        { headerName: "Brand Model", field: "brand_model", flex: 1, resizable: true },
        { headerName: "Damage Description", field: "damage_description", flex: 2, resizable: true },
        { headerName: "Notes", field: "notes", flex: 1, resizable: true },
        { headerName: "Total", field: "total", flex: 1, resizable: true },
        { headerName: "Payment", field: "payment", flex: 1, resizable: true },
        { headerName: "Status", field: "status", flex: 1, resizable: true },
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

    const detailCellRendererParams = useMemo(() => ({
        detailGridOptions: {
            columnDefs: [
                { headerName: "Entry Date", field: "entry_date" },
                { headerName: "Invoice Number", field: "invoice_number" },
                { headerName: "Customer Name", field: "customer_name" },
                { headerName: "Cashier Name", field: "cashier_name" },
                { headerName: "Technician Name", field: "technician_name" },
                { headerName: "Phone Brand", field: "phone_brand" },
                { headerName: "Phone Model", field: "phone_model" },
                { headerName: "IMEI SN 1", field: "imei_sn_1" },
                { headerName: "IMEI SN 2", field: "imei_sn_2" },
                { headerName: "Damage Description", field: "damage_description" },
                { headerName: "Under Warranty", field: "under_warranty" },
                { headerName: "Warranty Duration", field: "warranty_duration" },
                { headerName: "Notes", field: "notes" },
                { headerName: "Repair Type", field: "repair_type" },
                { headerName: "Service Type", field: "service_type" },
                { headerName: "Total Price", field: "total_price" },
                { headerName: "Down Payment", field: "down_payment" },
                { headerName: "Remaining Payment", field: "remaining_payment" },
                { headerName: "Payment Method", field: "payment_method" },
                { headerName: "Payment Status", field: "payment_status" },
            ],
            getRowNodeId: (data) => data.invoice_number,
        },
        getDetailRowData: params => {
            const repairDetails = params.data;
            const customer = customers.find(c => c.id === repairDetails.customer_id);
            const cashier = cashiers.find(c => c.id === repairDetails.cashier_id);
            const technician = technicians.find(t => t.id === repairDetails.technician_id);

            params.successCallback([
                {
                    entry_date: repairDetails.entry_date,
                    invoice_number: repairDetails.invoice_number,
                    customer_name: customer ? customer.name : 'N/A',
                    cashier_name: cashier ? cashier.name : 'N/A',
                    technician_name: technician ? technician.name : 'N/A',
                    phone_brand: repairDetails.phone_brand,
                    phone_model: repairDetails.phone_model,
                    imei_sn_1: repairDetails.imei_sn_1,
                    imei_sn_2: repairDetails.imei_sn_2,
                    damage_description: repairDetails.damage_description,
                    under_warranty: repairDetails.under_warranty ? 'Yes' : 'No',
                    warranty_duration: `${repairDetails.warranty_duration} ${repairDetails.warranty_unit}`,
                    notes: repairDetails.notes,
                    repair_type: repairDetails.repair_type,
                    service_type: repairDetails.service_type,
                    total_price: formatCurrency(repairDetails.total_price),
                    down_payment: formatCurrency(repairDetails.down_payment),
                    remaining_payment: formatCurrency(repairDetails.remaining_payment),
                    payment_method: repairDetails.payment_method,
                    payment_status: repairDetails.payment_status,
                }
            ]);
        }
    }), [customers, cashiers, technicians]);

    const handleRowClick = (params) => {
        setSelectedRepair(params.data);
        setRepairDetailModalOpen(true);
    };

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
                        value={search}
                        placeholder="Search repairs..."
                    />
                    <Button size="sm" type="primary" className="ml-2" onClick={() => setServiceFormModalOpen(true)}>Add Data</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        masterDetail={true}
                        detailCellRendererParams={detailCellRendererParams}
                        pagination={true}
                        paginationPageSize={5}
                        onRowClicked={handleRowClick}
                    />
                </div>

                {/* Modal Parent */}
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    isRepairDetailModalOpen={isRepairDetailModalOpen}
                    setRepairDetailModalOpen={setRepairDetailModalOpen}
                    selectedRepair={selectedRepair} // Pass the selected repair details
                />

                {/* Repair Detail Modal
                <RepairDetailModal
                    isOpen={isRepairDetailModalOpen}
                    onClose={() => setRepairDetailModalOpen(false)}
                    repair={selectedRepair} // Pass the selected repair details
                    customers={customers} // Pass the customers array
                    cashiers={cashiers} // Pass the cashiers array
                    technicians={technicians} // Pass the technicians array
                /> */}
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;
