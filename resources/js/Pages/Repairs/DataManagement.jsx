

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MasterDetailModule, ContextMenuModule, LicenseManager } from 'ag-grid-enterprise';



import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 




import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import ModalParent from './ModalParent';
import Modal from '@/Components/DaisyUI/Modal';


import './StatusButtonTest.css'; // Import custom CSS

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule, ContextMenuModule]);

// Set the license key
LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d"); // Replace with your valid license key

import './StatusButtonTest.css';

ModuleRegistry.registerModules([AllCommunityModule]);


import './StatusButtonTest.css';

ModuleRegistry.registerModules([AllCommunityModule]);


const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false);


    const [processModalOpen, setProcessModalOpen] = useState(false); // New state for process modal
    const [currentRepair, setCurrentRepair] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [notification, setNotification] = useState('');
    const [spareParts, setSpareParts] = useState(''); // New state for spare parts

    const fetchRepairs = async () => {
        const response = await fetch('/api/repairs');
        const result = await response.json();
        setRepairs(result.data || []);
    };

    const fetchCustomers = async () => {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
    };

    const fetchUsersByRoleName = async (roleName) => {
        const response = await axios.get(`/api/users?role_name=${roleName}`);
        if (roleName === 'Cashier') setCashiers(response.data);
        if (roleName === 'Technician') setTechnicians(response.data);



    const [processModalOpen, setProcessModalOpen] = useState(false);
    const [currentRepair, setCurrentRepair] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [notification, setNotification] = useState('');
    const [spareParts, setSpareParts] = useState('');
    const [completenessModalOpen, setCompletenessModalOpen] = useState(false);
    const [printModalOpen, setPrintModalOpen] = useState(false);
    const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
    const [completeness, setCompleteness] = useState({
        simTray: false,
        simCard: false,
        softCase: false,
        microSD: false,
        box: false,
        charger: false,
    });

    // Fetch data from APIs
    const fetchRepairs = async () => {
        try {
            const response = await axios.get('/api/repairs');
            setRepairs(response.data || []);
        } catch (error) {
            console.error('Error fetching repairs:', error);
            setNotification('Failed to fetch repairs.');
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setNotification('Failed to fetch customers.');
        }
    };

    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') setCashiers(response.data || []);
            if (roleName === 'Technician') setTechnicians(response.data || []);
        } catch (error) {
            console.error(`Error fetching ${roleName}s:`, error);
            setNotification(`Failed to fetch ${roleName}s.`);
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
        const matchesStatus = statusFilter === 'All' || repair.repair_status === statusFilter;
        return matchesSearch && matchesDateRange && matchesStatus;
    });




    // Filter repairs based on search, date range, and status
    const filteredRepairs = useMemo(() => {
        return repairs.filter(repair => {
            const customerName = customers.find(customer => customer.id === repair.customer_id)?.name || '';
            const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase()) ||
                repair.damage_description.toLowerCase().includes(search.toLowerCase());
            const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
                (!endDate || new Date(repair.entry_date) <= new Date(endDate));
            const matchesStatus = statusFilter === 'All' || repair.repair_status === statusFilter;
            return matchesSearch && matchesDateRange && matchesStatus;
        });
    }, [repairs, customers, search, startDate, endDate, statusFilter]);

    // Format currency




    const formatCurrency = (value) => {
        if (value == null || isNaN(value)) return 'Rp0';
        return `Rp${parseFloat(value).toLocaleString()}`;
    };




    // Format date


    // Format date

    const formatDate = (dateString) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };




    // Handle status change


    // Handle status change

    const handleStatusChange = (repair) => {
        setCurrentRepair(repair);
        setProcessModalOpen(true);
    };

    const confirmStatusChange = async () => {
        const nextStatus = getNextStatus(currentRepair.repair_status);
        try {
            await axios.put(`/api/repairs/${currentRepair.id}/repair_status`, {
                repair_status: nextStatus,


                spare_parts: spareParts, // Include spare parts data
                updated_at: new Date().toISOString().split('T')[0], // Update the current date

                spare_parts: spareParts,
                updated_at: new Date().toISOString(),


                spare_parts: spareParts,
                updated_at: new Date().toISOString(),

                technician_id: currentRepair.technician_id,
                outside_spare_parts: currentRepair.outside_spare_parts,
                using_store_cash: currentRepair.using_store_cash
            });
            setRepairs(repairs.map(repair =>
                repair.id === currentRepair.id ? { ...repair, repair_status: nextStatus } : repair
            ));


            setProcessModalOpen(false); // Close process modal if open

            setProcessModalOpen(false);


            setProcessModalOpen(false);

            setNotification('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error);
            setNotification('Failed to update status.');
        }
    };

    const getNextStatus = (currentStatus) => {
        const statusOrder = ["Queue", "Process", "Done", "Taken", "Refund"];
        const currentIndex = statusOrder.indexOf(currentStatus);
        return statusOrder[(currentIndex + 1) % statusOrder.length];
    };



    const columnDefs = useMemo(() => [
        { headerName: "Entry Date", field: "entry_date", flex: 1, headerClass: 'text-center', valueGetter: (params) => formatDate(params.data.entry_date) },
        { headerName: "Customer", field: "customer", flex: 1, headerClass: 'text-center' },
        { headerName: "Brand Model", field: "brand_model", flex: 1, headerClass: 'text-center' },
        { headerName: "Damage Description", field: "damage_description", flex: 1.5, headerClass: 'text-center' },
        { headerName: "Total", field: "total", flex: 0.7, headerClass: 'text-center' },



    // Column definitions for AG Grid
    const columnDefs = useMemo(() => [
        { headerName: "Entry Date", field: "entry_date", flex: 1, valueGetter: (params) => formatDate(params.data.entry_date) },
        { headerName: "Customer", field: "customer", flex: 1 },
        { headerName: "Brand Model", field: "brand_model", flex: 1 },
        { headerName: "Damage Description", field: "damage_description", flex: 1.5 },
        { headerName: "Total", field: "total", flex: 0.7 },




        {
            headerName: "Status",
            field: "repair_status",
            flex: 0.8,


            headerClass: 'text-center',




            cellRenderer: (params) => (
                <span className={`status-button-custom ${params.value.toLowerCase()}`} onClick={() => handleStatusChange(params.data)}>
                    {params.value}
                </span>
            )
        },
    ], [filteredRepairs]);




    // Row data for AG Grid


    // Row data for AG Grid

    const rowData = useMemo(() => filteredRepairs.map(repair => ({
        id: repair.id,
        entry_date: repair.created_at,
        customer: customers.find(customer => customer.id === repair.customer_id)?.name || 'N/A',
        brand_model: `${repair.phone_brand} ${repair.phone_model}`,
        damage_description: repair.damage_description,
        total: formatCurrency(repair.total_price),
        repair_status: repair.repair_status || 'Queue',
    })), [filteredRepairs, customers]);



    // Update detailCellRendererParams
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
        domLayout: 'normal', // Allow horizontal scrolling
        getRowId: (params) => params.data.invoice_number, // Use getRowId instead of getRowNodeId
    },
    getDetailRowData: async (params) => {
        const response = await axios.get(`/api/repairs/${params.data.id}`);
        const repairData = response.data;

        const customer = customers.find(c => c.id === repairData.customer_id);
        const cashier = cashiers.find(c => c.id === repairData.cashier_id);
        const technician = technicians.find(t => t.id === repairData.technician_id);

        params.successCallback([{
            invoice_number: repairData.invoice_number,
            cashier_name: cashier ? cashier.name : 'N/A',
            technician_name: technician ? technician.name : 'N/A',
            imei_sn_1: repairData.imei_sn_1,
            imei_sn_2: repairData.imei_sn_2,
            under_warranty: repairData.under_warranty ? 'Yes' : 'No',
            warranty_duration: `${repairData.warranty_duration} ${repairData.warranty_unit}`,
            notes: repairData.notes || ' - ',
            repair_type: repairData.repair_type,
            service_type: repairData.service_type,
            total_price: formatCurrency(repairData.total_price),
            down_payment: formatCurrency(repairData.down_payment),
            remaining_payment: formatCurrency(repairData.remaining_payment),
            payment_method: repairData.payment_method,
            payment_status: repairData.payment_status,
            action: ''
        }]);
    }
}), [customers, cashiers, technicians]);

    const handleEdit = (rowData) => {
        setCurrentRepair(rowData);
        setServiceFormModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete repair with ID: ${id}?`);
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/repairs/${id}`);
                if (response.data.success) {
                    setNotification('Repair deleted successfully!'); // Set notification
                    fetchRepairs();
                }
            } catch (error) {
                console.error('Error deleting repair:', error);
                alert('Failed to delete repair.');
            }
        }
    };

    const handlePrint = (rowData) => {
        // Implement print functionality here
        console.log('Print clicked for:', rowData);
    };

    const handleFormSubmit = () => {
        fetchRepairs();
        setServiceFormModalOpen(false);
    };

    // Context menu items
    const getContextMenuItems = useCallback((params) => {
        const result = [
            {
                name: 'Copy',
                subMenu: [
                    {
                        name: 'Copy Content Only',
                        action: () => {
                            params.api.copySelectedRowsToClipboard(false);
                        }
                    },
                    {
                        name: 'Copy with Headers',
                        action: () => {
                            params.api.copySelectedRowsToClipboard(true);
                        }
                    },
                ]
            },
            {
                name: 'Print',
                subMenu: [
                    {
                        name: 'Inkjet',
                        action: () => handlePrint(params.data, 'Inkjet'),
                    },
                    {
                        name: 'Dot Matrix',
                        action: () => handlePrint(params.data, 'Dot Matrix'),
                    },
                    {
                        name: 'Thermal',
                        action: () => handlePrint(params.data, 'Thermal'),
                    },
                ],
            },
            {
                name: 'Expand/Close Row',
                action: () => {
                    params.node.setExpanded(!params.node.expanded); // Expand or collapse the row
                },
            },
            {
                name: 'Edit',
                action: () => handleEdit(params.data),
            },
            {
                name: 'Delete',
                action: () => {
                    handleDelete(params.data.id);
                    setNotification('Repair deleted successfully!'); // Set notification
                },
            },
            'separator',
            'export',
        ];
        return result;
    }, []);





    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>
                <div className="flex mb-4">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered mr-2" />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-bordered mr-2" />
                    <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search repairs..." />
                    <Button size="sm" type="primary" className="ml-2" onClick={() => setServiceFormModalOpen(true)}>Add Data</Button>
                </div>
                <div className="flex mb-4">
                    {['All', 'Queue', 'Process', 'Done', 'Taken', 'Refund'].map(status => (
                        <Button key={status} size="sm" type={statusFilter === status ? 'primary' : 'secondary'} className="mr-2" onClick={() => setStatusFilter(status)}>
                            {status}
                        </Button>
                    ))}
                </div>


                <div className="ag-theme-alpine" style={{ height: 600, width: '100%', overflowX: 'auto' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    masterDetail={true}
                    detailCellRendererParams={detailCellRendererParams}
                    pagination={true}
                    paginationPageSize={20} // Change this to 20, 50, or 100
                    paginationPageSizeSelector={[10, 20, 50, 100]} // Add 10 to the selector if you want to keep 10
                    domLayout='normal' // Allow horizontal scrolling
                    onRowClicked={(params) => params.node.setExpanded(!params.node.expanded)} // Expand on row click
                    animateRows={true} // Add row animation
                    defaultColDef={{
                        sortable: true, // Enable sorting
                        filter: true, // Enable filtering
                        resizable: true, // Enable column resizing
                    }}
                    getContextMenuItems={getContextMenuItems} // Add context menu items
                />
                </div>
                <Modal isOpen={processModalOpen} onClose={() => setProcessModalOpen(false)}>
    <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Update Status</h2>
        <p>Are you sure you want to update the status to {getNextStatus(currentRepair?.repair_status)}?</p>
        {currentRepair?.repair_status === 'Process' && (
            <>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Date</label>
                    <input
                        type="date"
                        value={new Date().toISOString().split('T')[0]}
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Technician</label>
                    <select
                        value={currentRepair?.technician_id || ''}
                        onChange={(e) => setCurrentRepair({ ...currentRepair, technician_id: e.target.value })}
                        className="input input-bordered w-full"
                    >
                        <option value="">Select Technician</option>
                        {technicians.map(tech => (
                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Spare Parts in Store</label>
                    <input
                        type="text"
                        value={spareParts}
                        onChange={(e) => setSpareParts(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter spare parts in store"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Outside Store Spare Parts</label>
                    <input
                        type="text"
                        value={currentRepair?.outside_spare_parts || ''}
                        onChange={(e) => setCurrentRepair({ ...currentRepair, outside_spare_parts: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Enter outside store spare parts"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Using Store Cash (Balance)</label>
                    <input
                        type="checkbox"
                        checked={currentRepair?.using_store_cash || false}
                        onChange={(e) => setCurrentRepair({ ...currentRepair, using_store_cash: e.target.checked })}
                        className="input input-checkbox"
                    />
                </div>
            </>
        )}
        <div className="flex justify-end mt-4">
            <Button size="sm" type="secondary" className="mr-2" onClick={() => setProcessModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="primary" onClick={confirmStatusChange}>Update Status</Button>
        </div>
    </div>
</Modal>
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    onFormSubmit={handleFormSubmit}
                    currentRepair={currentRepair} // Pass current repair data to ModalParent
                />
                {notification && <div className="notification">{notification}</div>} {/* Display notification */}



                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={20}
                        domLayout="normal"
                        animateRows={true}
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true,
                        }}
                        context={{ /* data serpis */ }}
                    />
                </div>
                <Modal isOpen={processModalOpen} onClose={() => setProcessModalOpen(false)}>
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Update Status</h2>
                        <p>Are you sure you want to update the status to {getNextStatus(currentRepair?.repair_status)}?</p>
                        <div className="flex justify-end mt-4">
                            <Button size="sm" type="secondary" className="mr-2" onClick={() => setProcessModalOpen(false)}>Cancel</Button>
                            <Button size="sm" type="primary" onClick={confirmStatusChange}>Update Status</Button>
                        </div>
                    </div>
                </Modal>
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    onFormSubmit={fetchRepairs}
                    currentRepair={currentRepair}
                    setCompletenessModalOpen={setCompletenessModalOpen}
                    setPrintModalOpen={setPrintModalOpen}
                    setNewCustomerModalOpen={setNewCustomerModalOpen}
                    completenessModalOpen={completenessModalOpen}
                    printModalOpen={printModalOpen}
                    newCustomerModalOpen={newCustomerModalOpen}
                    completeness={completeness}
                    setCompleteness={setCompleteness}
                    isRepairDetailModalOpen={false}
                    setRepairDetailModalOpen={() => {}}
                />
                {notification && <div className="notification">{notification}</div>}




            </div>
        </AuthenticatedLayout>
    );
};



export default DataManagement;

export default DataManagement;


export default DataManagement;

