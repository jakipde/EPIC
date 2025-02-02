import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import StatusButton from '@/components/StatusButton';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MasterDetailModule } from 'ag-grid-enterprise';
import RepairDetailModal from "./RepairDetailModal";
import ModalParent from './ModalParent';
import Modal from '@/Components/DaisyUI/Modal';
import './StatusButtonTest.css'; // Import custom CSS

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
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [currentRepair, setCurrentRepair] = useState(null);

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

    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') {
                setCashiers(response.data);
            } else if (roleName === 'Technician') {
                setTechnicians(response.data);
            }
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
        const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase()) ||
            repair.damage_description.toLowerCase().includes(search.toLowerCase());
        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
            (!endDate || new Date(repair.entry_date) <= new Date(endDate));
        return matchesSearch && matchesDateRange;
    });

    const formatCurrency = (value) => {
        if (value === null || value === undefined || isNaN(value)) return 'Rp0';
        return `Rp${parseFloat(value).toLocaleString()}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    const handleStatusChange = (repair) => {
        setCurrentRepair(repair);
        setStatusModalOpen(true);
    };

    const confirmStatusChange = () => {
        const nextStatus = getNextStatus(currentRepair.status);
        setRepairs(repairs.map(repair =>
            repair.id === currentRepair.id ? { ...repair, status: nextStatus } : repair
        ));
        setStatusModalOpen(false);
    };

    const getNextStatus = (currentStatus) => {
        const statusOrder = ["Queue", "Process", "Done", "Taken", "Refund"];
        const currentIndex = statusOrder.indexOf(currentStatus);
        return statusOrder[(currentIndex + 1) % statusOrder.length];
    };

    const columnDefs = useMemo(() => [
        {
            headerName: "No",
            valueGetter: (params) => {
                const rowIndex = filteredRepairs.findIndex(r => r.id === params.data.id);
                return rowIndex + 1;
            },
            flex: 0.4,
            resizable: true,
            sortable: true,
            editable: false,
            headerClass: 'text-center', // Center header text
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <span>{params.value}</span>
                    <button
                        className={`expand-button ${params.node.expanded ? 'expanded' : ''}`}
                        style={{ marginLeft: '5px', background: 'none', border: 'none' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            params.node.setExpanded(!params.node.expanded);
                        }}
                    >
                        {params.node.expanded ? "▼" : "►"}
                    </button>
                </div>
            ),
        },
        {
            headerName: "Entry Date",
            field: "entry_date",
            flex: 1.1,
            resizable: true,
            sortable: true,
            editable: false,
            headerClass: 'text-center', // Center header text
            valueGetter: (params) => {
                const date = new Date(params.data.entry_date);
                return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            }
        },
        { headerName: "Customer", field: "customer", flex: 0.8, resizable: true, sortable: true, editable: false, headerClass: 'text-center' },
        { headerName: "Brand Model", field: "brand_model", flex: 1.3, resizable: true, sortable: true, editable: false, headerClass: 'text-center' },
        { headerName: "Damage Description", field: "damage_description", flex: 1.4, resizable: true, sortable: true, editable: false, headerClass: 'text-center' },
        { headerName: "Total", field: "total", flex: 0.7, resizable: true, sortable: true, editable: false, headerClass: 'text-center' },
        {
            headerName: "Status",
            field: "status",
            flex: 0.8,
            resizable: true,
            sortable: true,
            editable: false,
            headerClass: 'text-center',
            cellRenderer: (params) => {
                return (
                    <span
                        className={`status-button-custom ${params.value.toLowerCase()}`}
                        onClick={() => handleStatusChange(params.data)}
                    >
                        {params.value}
                    </span>
                );
            }
        },
    ], [filteredRepairs]);

    const rowData = useMemo(() => filteredRepairs.map(repair => ({
        id: repair.id,
        entry_date: repair.entry_date,
        customer: customers.find(customer => customer.id === repair.customer_id)?.name || 'N/A',
        brand_model: `${repair.phone_brand} ${repair.phone_model}`,
        damage_description: repair.damage_description,
        notes: repair.notes,
        total: formatCurrency(repair.total_price),
        status: repair.status || 'Queue',
    })), [filteredRepairs, customers]);

    const detailCellRendererParams = useMemo(() => ({
        detailGridOptions: {
            columnDefs: [
                { headerName: "Invoice Number", field: "invoice_number", headerClass: 'text-center' },
                { headerName: "Cashier Name", field: "cashier_name", headerClass: 'text-center' },
                { headerName: "Technician Name", field: "technician_name", headerClass: 'text-center' },
                { headerName: "IMEI SN 1", field: "imei_sn_1", headerClass: 'text-center' },
                { headerName: "IMEI SN 2", field: "imei_sn_2", headerClass: 'text-center' },
                { headerName: "Under Warranty", field: "under_warranty", headerClass: 'text-center' },
                { headerName: "Warranty Duration", field: "warranty_duration", headerClass: 'text-center' },
                { headerName: "Notes", field: "notes", headerClass: 'text-center' },
                { headerName: "Repair Type", field: "repair_type", headerClass: 'text-center' },
                { headerName: "Service Type", field: "service_type", headerClass: 'text-center' },
                { headerName: "Total Price", field: "total_price", headerClass: 'text-center' },
                { headerName: "Down Payment", field: "down_payment", headerClass: 'text-center' },
                { headerName: "Remaining Payment", field: "remaining_payment", headerClass: 'text-center' },
                { headerName: "Payment Method", field: "payment_method", headerClass: 'text-center' },
                { headerName: "Payment Status", field: "payment_status", headerClass: 'text-center' },
            ],
            defaultColDef: {
                flex: 1,
                resizable: true,
                sortable: true,
                editable: false,
            },
            domLayout: 'normal', // Allow horizontal scrolling
            getRowNodeId: (data) => data.invoice_number,
        },
        getDetailRowData: async (params) => {
            try {
                const response = await axios.get(`/api/repairs/${params.data.id}`);
                const repairData = response.data;

                const customer = customers.find(c => c.id === repairData.customer_id);
                const cashier = cashiers.find(c => c.id === repairData.cashier_id);
                const technician = technicians.find(t => t.id === repairData.technician_id);

                params.successCallback([
                    {
                        invoice_number: repairData.invoice_number,
                        cashier_name: cashier ? cashier.name : 'N/A',
                        technician_name: technician ? technician.name : 'N/A',
                        imei_sn_1: repairData.imei_sn_1,
                        imei_sn_2: repairData.imei_sn_2,
                        under_warranty: repairData.under_warranty ? 'Yes' : 'No',
                        warranty_duration: `${repairData.warranty_duration} ${repairData.warranty_unit}`,
                        notes: repairData.notes,
                        repair_type: repairData.repair_type,
                        service_type: repairData.service_type,
                        total_price: formatCurrency(repairData.total_price),
                        down_payment: formatCurrency(repairData.down_payment),
                        remaining_payment: formatCurrency(repairData.remaining_payment),
                        payment_method: repairData.payment_method,
                        payment_status: repairData.payment_status,
                    }
                ]);
            } catch (error) {
                console.error('Error fetching repair details:', error);
                params.failCallback();
            }
        }
    }), [customers, cashiers, technicians]);

    const handleRowClick = (params) => {
        // Commenting out the modal opening logic
        // setSelectedRepair(params.data);
        // setRepairDetailModalOpen(true);
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

                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        masterDetail={true}
                        detailCellRendererParams={detailCellRendererParams}
                        pagination={true}
                        paginationPageSize={5}
                        onRowClicked={handleRowClick}
                        suppressReactUi={true}
                        domLayout='autoHeight'
                        className="ag-theme-quartz"
                    />
                </div>

                {/* Status Change Modal */}
                <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Confirm Status Change</h2>
                        <p>Are you sure you want to change the status to {getNextStatus(currentRepair?.status)}?</p>
                        <div className="flex justify-end mt-4">
                            <Button size="sm" type="secondary" className="mr-2" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
                            <Button size="sm" type="primary" onClick={confirmStatusChange}>Confirm</Button>
                        </div>
                    </div>
                </Modal>

                {/* Modal Parent */}
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    isRepairDetailModalOpen={isRepairDetailModalOpen}
                    setRepairDetailModalOpen={setRepairDetailModalOpen}
                    selectedRepair={selectedRepair}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;
