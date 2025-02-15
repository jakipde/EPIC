import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MasterDetailModule, ContextMenuModule, LicenseManager } from 'ag-grid-enterprise';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import Stat from '@/Components/DaisyUI/Stat';
import axios from 'axios';
import SparePartsFormModal from './SparePartsFormModal';
import SellSparePartsModal from './SellSparePartsModal';
import { CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import './DataInsights.css'; // Import custom CSS

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule, ContextMenuModule]);

// Set the license key
LicenseManager.setLicenseKey("[YOUR_LICENSE_KEY_HERE]"); // Replace with your valid license key
const formatCurrency = (amount) => `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const DataInsights = ({ spareparts, categories = [] }) => {
    const [search, setSearch] = useState('');
    const [isSparePartsModalOpen, setSparePartsModalOpen] = useState(false);
    const [isSellSparePartsModalOpen, setSellSparePartsModalOpen] = useState(false);
    const [currentSparePart, setCurrentSparePart] = useState(null);

    const filteredSpareParts = spareparts.filter(sparepart => {
        const matchesSearch = sparepart.product_name.toLowerCase().includes(search.toLowerCase()) ||
            sparepart.supplier.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const columnDefs = useMemo(() => [
        { headerName: "Supplier", field: "supplier.name", flex: 1, headerClass: 'text-center' },
        { headerName: "Product Name", field: "product_name", flex: 1, headerClass: 'text-center' },
        { headerName: "Grade", field: "grade", flex: 1, headerClass: 'text-center' },
        { headerName: "Stock", field: "stock", flex: 1, headerClass: 'text-center' },
        { headerName: "Category", field: "category.name", flex: 1, headerClass: 'text-center' },
        { headerName: "Sub Category", field: "subCategory.name", flex: 1, headerClass: 'text-center' },
        { headerName: "Image", field: "image", flex: 1, headerClass: 'text-center', cellRenderer: (params) => (
            <img src={params.value} alt={params.data.product_name} style={{ width: '50px', height: '50px' }} />
        )},
    ], [filteredSpareParts]);

    const rowData = useMemo(() => filteredSpareParts.map(sparepart => ({
        id: sparepart.id,
        supplier: sparepart.supplier,
        product_name: sparepart.product_name,
        grade: sparepart.grade,
        stock: sparepart.stock,
        category: sparepart.category,
        subCategory: sparepart.subCategory,
        image: sparepart.image,
    })), [filteredSpareParts]);

    const detailCellRendererParams = useMemo(() => ({
        detailGridOptions: {
            columnDefs: [
                { headerName: "SKU Code", field: "sku", headerClass: 'text-center' },
                { headerName: "Name in Barcode", field: "barcode_name", headerClass: 'text-center' },
                { headerName: "Minimum Stock", field: "minimum_stock", headerClass: 'text-center' },
                { headerName: "Capital Price", field: "capital_price", headerClass: 'text-center' },
                { headerName: "Stock Price", field: "stock_price", headerClass: 'text-center' },
                { headerName: "Selling Price", field: "selling_price", headerClass: 'text-center' },
                { headerName: "Link e-commerce", field: "ecommerce_link", headerClass: 'text-center' },
                { headerName: "Description", field: "description", headerClass: 'text-center' },
            ],
            domLayout: 'normal', // Allow horizontal scrolling
            getRowNodeId: (data) => data.sku,
        },
        getDetailRowData: (params) => {
            params.successCallback([params.data]);
        }
    }), []);

    const handleAddSparePart = () => {
        setSparePartsModalOpen(true);
    };

    const handleSellSparePart = (sparePart) => {
        setCurrentSparePart(sparePart);
        setSellSparePartsModalOpen(true);
    };

    const getContextMenuItems = useCallback((params) => {
        const result = [
            {
                name: 'Sell Spare Part',
                action: () => handleSellSparePart(params.data),
            },
            'separator',
            'export',
        ];
        return result;
    }, []);

    return (
        <AuthenticatedLayout page="Data Insights">
            <Head title="Data Insights" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="flex mb-4">
                    <Stat title="Total Income" value={formatCurrency(5000000)} icon={<CurrencyDollarIcon className="h-6 w-6 text-green-500" />} />
                    <Stat title="Total Outcome" value={formatCurrency(2000000)} icon={<CurrencyDollarIcon className="h-6 w-6 text-red-500" />} />
                    <Stat title="Profit" value={formatCurrency(3000000)} icon={<ArrowUpIcon className="h-6 w-6 text-blue-500" />} />
                </div>
                <div className="flex mb-4">
                    <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search spare parts..." />
                    <Button size="sm" type="primary" className="ml-2" onClick={handleAddSparePart}>Input Spare Part</Button>
                    <Button size="sm" type="secondary" className="ml-2" onClick={() => handleSellSparePart(null)}>Sell Spare Part</Button>
                </div>
                <div className="ag-theme-alpine" style={{ height: 600, width: '100%', overflowX: 'auto' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        masterDetail={true}
                        detailCellRendererParams={detailCellRendererParams}
                        pagination={true}
                        paginationPageSize={10}
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
                <SparePartsFormModal isOpen={isSparePartsModalOpen} onClose={() => setSparePartsModalOpen(false)} />
                <SellSparePartsModal isOpen={isSellSparePartsModalOpen} onClose={() => setSellSparePartsModalOpen(false)} sparePart={currentSparePart} />
            </div>
        </AuthenticatedLayout>
    );
};

export default DataInsights;
