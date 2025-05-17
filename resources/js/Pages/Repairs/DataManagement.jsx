import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import ModalParent from './ModalParent';
import Modal from '@/Components/DaisyUI/Modal';
import './StatusButtonTest.css';

// AG Grid setup
ModuleRegistry.registerModules([AllCommunityModule]);

const DataManagement = () => {
    // State management
    const [state, setState] = useState({
        search: '',
        startDate: '',
        endDate: '',
        repairs: [],
        customers: [],
        cashiers: [],
        technicians: [],
        currentRepair: null,
        statusFilter: 'All',
        notification: '',
        spareParts: '',
        isServiceFormModalOpen: false,
        processModalOpen: false,
        completenessModalOpen: false,
        printModalOpen: false,
        newCustomerModalOpen: false,
        completeness: {
            simTray: false,
            simCard: false,
            softCase: false,
            microSD: false,
            box: false,
            charger: false
        }
    });

    // Helper functions
    const formatCurrency = (value) => value ? `Rp${parseFloat(value).toLocaleString()}` : 'Rp0';
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, {
        year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });

    // Data fetching
    const fetchData = async () => {
        try {
            const [repairsRes, customersRes, cashiersRes, techsRes] = await Promise.all([
                axios.get('/api/repairs'),
                axios.get('/api/customers'),
                axios.get('/api/users?role_name=Cashier'),
                axios.get('/api/users?role_name=Technician')
            ]);

            setState(prev => ({
                ...prev,
                repairs: repairsRes.data || [],
                customers: customersRes.data || [],
                cashiers: cashiersRes.data || [],
                technicians: techsRes.data || []
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            setState(prev => ({ ...prev, notification: 'Failed to fetch data' }));
        }
    };

    useEffect(() => { fetchData(); }, []);

    // Filtered repairs
    const filteredRepairs = useMemo(() => {
        return state.repairs.filter(repair => {
            const customer = state.customers.find(c => c.id === repair.customer_id);
            const matchesSearch = customer?.name.toLowerCase().includes(state.search.toLowerCase()) ||
                              repair.damage_description.toLowerCase().includes(state.search.toLowerCase());
            const matchesDate = (!state.startDate || new Date(repair.entry_date) >= new Date(state.startDate)) &&
                              (!state.endDate || new Date(repair.entry_date) <= new Date(state.endDate));
            const matchesStatus = state.statusFilter === 'All' || repair.repair_status === state.statusFilter;
            return matchesSearch && matchesDate && matchesStatus;
        });
    }, [state.repairs, state.customers, state.search, state.startDate, state.endDate, state.statusFilter]);

    // Status management
    const getNextStatus = (currentStatus) => {
        const statusOrder = ["Queue", "Process", "Done", "Taken", "Refund"];
        return statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    };

    const handleStatusChange = async () => {
        const nextStatus = getNextStatus(state.currentRepair?.repair_status);
        try {
            await axios.put(`/api/repairs/${state.currentRepair.id}/repair_status`, {
                repair_status: nextStatus,
                spare_parts: state.spareParts,
                updated_at: new Date().toISOString(),
                technician_id: state.currentRepair.technician_id
            });
            
            setState(prev => ({
                ...prev,
                repairs: prev.repairs.map(r => 
                    r.id === state.currentRepair.id ? { ...r, repair_status: nextStatus } : r
                ),
                processModalOpen: false,
                notification: 'Status updated successfully!'
            }));
        } catch (error) {
            console.error('Error updating status:', error);
            setState(prev => ({ ...prev, notification: 'Failed to update status' }));
        }
    };

    // AG Grid configuration
    const columnDefs = useMemo(() => [
        { 
            headerName: "Entry Date", 
            field: "entry_date", 
            flex: 1, 
            valueGetter: params => formatDate(params.data.entry_date) 
        },
        { headerName: "Customer", field: "customer", flex: 1 },
        { 
            headerName: "Brand Model", 
            field: "brand_model", 
            flex: 1,
            valueGetter: params => `${params.data.phone_brand} ${params.data.phone_model}`
        },
        { headerName: "Damage Description", field: "damage_description", flex: 1.5 },
        { 
            headerName: "Total", 
            field: "total", 
            flex: 0.7,
            valueGetter: params => formatCurrency(params.data.total_price)
        },
        {
            headerName: "Status",
            field: "repair_status",
            flex: 0.8,
            cellRenderer: params => (
                <span 
                    className={`status-button-custom ${params.value.toLowerCase()}`} 
                    onClick={() => setState(prev => ({
                        ...prev,
                        currentRepair: params.data,
                        processModalOpen: true
                    }))}
                >
                    {params.value}
                </span>
            )
        }
    ], []);

    const rowData = useMemo(() => filteredRepairs, [filteredRepairs]);

    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>
                
                {/* Search and filter controls */}
                <div className="flex mb-4">
                    <input 
                        type="date" 
                        value={state.startDate} 
                        onChange={e => setState(prev => ({ ...prev, startDate: e.target.value }))} 
                        className="input input-bordered mr-2" 
                    />
                    <input 
                        type="date" 
                        value={state.endDate} 
                        onChange={e => setState(prev => ({ ...prev, endDate: e.target.value }))} 
                        className="input input-bordered mr-2" 
                    />
                    <SearchInput 
                        onChange={e => setState(prev => ({ ...prev, search: e.target.value }))} 
                        value={state.search} 
                        placeholder="Search repairs..." 
                    />
                    <Button 
                        size="sm" 
                        type="primary" 
                        className="ml-2" 
                        onClick={() => setState(prev => ({ ...prev, isServiceFormModalOpen: true }))}
                    >
                        Add Data
                    </Button>
                </div>

                {/* Status filter buttons */}
                <div className="flex mb-4">
                    {['All', 'Queue', 'Process', 'Done', 'Taken', 'Refund'].map(status => (
                        <Button 
                            key={status}
                            size="sm" 
                            type={state.statusFilter === status ? 'primary' : 'secondary'} 
                            className="mr-2" 
                            onClick={() => setState(prev => ({ ...prev, statusFilter: status }))}
                        >
                            {status}
                        </Button>
                    ))}
                </div>

                {/* AG Grid */}
                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={20}
                        domLayout="autoHeight"
                        animateRows={true}
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true
                        }}
                    />
                </div>

                {/* Modals */}
                <Modal isOpen={state.processModalOpen} onClose={() => setState(prev => ({ ...prev, processModalOpen: false }))}>
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Update Status</h2>
                        <p>Update status to {getNextStatus(state.currentRepair?.repair_status)}?</p>
                        <div className="flex justify-end mt-4">
                            <Button size="sm" type="secondary" className="mr-2" 
                                onClick={() => setState(prev => ({ ...prev, processModalOpen: false }))}>
                                Cancel
                            </Button>
                            <Button size="sm" type="primary" onClick={handleStatusChange}>
                                Update Status
                            </Button>
                        </div>
                    </div>
                </Modal>

                <ModalParent
                    {...state}
                    setServiceFormModalOpen={open => setState(prev => ({ ...prev, isServiceFormModalOpen: open }))}
                    setCompletenessModalOpen={open => setState(prev => ({ ...prev, completenessModalOpen: open }))}
                    setPrintModalOpen={open => setState(prev => ({ ...prev, printModalOpen: open }))}
                    setNewCustomerModalOpen={open => setState(prev => ({ ...prev, newCustomerModalOpen: open }))}
                    setCompleteness={comp => setState(prev => ({ ...prev, completeness: comp }))}
                    onFormSubmit={() => {
                        fetchData();
                        setState(prev => ({ ...prev, isServiceFormModalOpen: false }));
                    }}
                />

                {state.notification && (
                    <div className="notification">{state.notification}</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;