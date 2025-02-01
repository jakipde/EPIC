import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MasterDetailModule } from 'ag-grid-enterprise';

// Register all AG Grid modules including MasterDetailModule
ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule]);

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);

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

    useEffect(() => {
        fetchRepairs();
        fetchCustomers();
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
        { headerName: "No", valueGetter: "node.rowIndex + 1", width: 70, resizable: true },
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
                { headerName: "Column", field: "column" },
                { headerName: "Value", field: "value" },
            ],
        },
        getDetailRowData: params => {
            const repairDetails = params.data; // Use the main row data for details
            params.successCallback([
                { column: "Entry Date", value: repairDetails.entry_date },
                { column: "Invoice Number", value: repairDetails.invoice_number },
                { column: "Customer Name", value: customers.find(customer => customer.id === repairDetails.customer_id)?.name || 'N/A' },
                { column: "Cashier Name", value: repairDetails.cashierName },
                { column: "Technician Name", value: repairDetails.technicianName },
                { column: "Phone Brand", value: repairDetails.phone_brand },
                { column: "Phone Model", value: repairDetails.phone_model },
                { column: "IMEI SN 1", value: repairDetails.imei_sn_1 },
                { column: "IMEI SN 2", value: repairDetails.imei_sn_2 },
                { column: "Damage Description", value: repairDetails.damage_description },
                { column: "Under Warranty", value: repairDetails.under_warranty ? 'Yes' : 'No' },
                { column: "Warranty Duration", value: `${repairDetails.warranty_duration} ${repairDetails.warranty_unit}` },
                { column: "Notes", value: repairDetails.notes },
                { column: "Repair Type", value: repairDetails.repair_type },
                { column: "Service Type", value: repairDetails.service_type },
                { column: "Total Price", value: repairDetails.total_price },
                { column: "Down Payment", value: repairDetails.down_payment },
                { column: "Remaining Payment", value: repairDetails.remaining_payment },
                { column: "Payment Method", value: repairDetails.payment_method },
                { column: "Payment Status", value: repairDetails.payment_status },
                { column: "Technician Notes", value: repairDetails.technician_notes },
                { column: "Repair Timeline", value: repairDetails.timeline },
                { column: "Parts Used", value: repairDetails.parts_used },
            ]);
        }
    }), [customers]);

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
                    <Button size="sm" type="primary" className="ml-2">Add Data</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        masterDetail={true}
                        detailCellRendererParams={detailCellRendererParams}
                        pagination={true}
                        paginationPageSize={5}
                        onRowClicked={(params) => params.node.setExpanded(!params.node.expanded)} // Toggle row expansion
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

// RepairDetailRenderer component
const RepairDetailRenderer = ({ data }) => {
    const [repairDetails, setRepairDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepairDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/repairs/${data.id}`);
                setRepairDetails(response.data);
            } catch (error) {
                setError('Error fetching repair details.');
            } finally {
                setLoading(false);
            }
        };

        fetchRepairDetails();
    }, [data.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="repair-detail-table">
            <table>
                <thead>
                    <tr>
                        <th>Column</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Entry Date</td>
                        <td>{repairDetails.entry_date}</td>
                    </tr>
                    <tr>
                        <td>Invoice Number</td>
                        <td>{repairDetails.invoice_number}</td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>{customers.find(customer => customer.id === repairDetails.customer_id)?.name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Cashier Name</td>
                        <td>{repairDetails.cashierName}</td>
                    </tr>
                    <tr>
                        <td>Technician Name</td>
                        <td>{repairDetails.technicianName}</td>
                    </tr>
                    <tr>
                        <td>Phone Brand</td>
                        <td>{repairDetails.phone_brand}</td>
                    </tr>
                    <tr>
                        <td>Phone Model</td>
                        <td>{repairDetails.phone_model}</td>
                    </tr>
                    <tr>
                        <td>IMEI SN 1</td>
                        <td>{repairDetails.imei_sn_1}</td>
                    </tr>
                    <tr>
                        <td>IMEI SN 2</td>
                        <td>{repairDetails.imei_sn_2}</td>
                    </tr>
                    <tr>
                        <td>Damage Description</td>
                        <td>{repairDetails.damage_description}</td>
                    </tr>
                    <tr>
                        <td>Under Warranty</td>
                        <td>{repairDetails.under_warranty ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>Warranty Duration</td>
                        <td>{`${repairDetails.warranty_duration} ${repairDetails.warranty_unit}`}</td>
                    </tr>
                    <tr>
                        <td>Notes</td>
                        <td>{repairDetails.notes}</td>
                    </tr>
                    <tr>
                        <td>Repair Type</td>
                        <td>{repairDetails.repair_type}</td>
                    </tr>
                    <tr>
                        <td>Service Type</td>
                        <td>{repairDetails.service_type}</td>
                    </tr>
                    <tr>
                        <td>Total Price</td>
                        <td>{repairDetails.total_price}</td>
                    </tr>
                    <tr>
                        <td>Down Payment</td>
                        <td>{repairDetails.down_payment}</td>
                    </tr>
                    <tr>
                        <td>Remaining Payment</td>
                        <td>{repairDetails.remaining_payment}</td>
                    </tr>
                    <tr>
                        <td>Payment Method</td>
                        <td>{repairDetails.payment_method}</td>
                    </tr>
                    <tr>
                        <td>Payment Status</td>
                        <td>{repairDetails.payment_status}</td>
                    </tr>
                    <tr>
                        <td>Technician Notes</td>
                        <td>{repairDetails.technician_notes}</td>
                    </tr>
                    <tr>
                        <td>Repair Timeline</td>
                        <td>{repairDetails.timeline}</td>
                    </tr>
                    <tr>
                        <td>Parts Used</td>
                        <td>{repairDetails.parts_used}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DataManagement;
