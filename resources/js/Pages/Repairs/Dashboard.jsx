import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/DaisyUI/Button';
import axios from 'axios';
import Accordion from '@/Components/DaisyUI/Accordion';
import Stat from '@/Components/DaisyUI/Stat';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import DataTable from '@/Components/DaisyUI/DataTable';
import Chart from 'react-apexcharts';
import Card from '@/Components/DaisyUI/Card';

const generateRandomRepairs = (num) => {
    const repairs = [];
    for (let i = 0; i < num; i++) {
        repairs.push({
            entry_date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            customer_id: `CUST${Math.floor(Math.random() * 1000)}`,
            cashier: `Cashier ${Math.floor(Math.random() * 10)}`,
            phone_brand: `Brand ${Math.floor(Math.random() * 5)}`,
            damage_description: `Damage ${Math.floor(Math.random() * 10)}`,
            technician_id: `Tech ${Math.floor(Math.random() * 5)}`,
            invoice_number: `INV${Math.floor(Math.random() * 10000)}`,
        });
    }
    return repairs;
};

const Dashboard = ({ categories }) => {
    const [search, setSearch] = useState('');
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set items per page

    // Generate random repairs data
    const repairs = generateRandomRepairs(20);

    const filteredRepairs = repairs.filter(repair => {
        const customerId = repair.customer_id ? String(repair.customer_id).toLowerCase() : '';
        const phoneBrand = repair.phone_brand ? String(repair.phone_brand).toLowerCase() : '';
        const damageDescription = repair.damage_description ? String(repair.damage_description).toLowerCase() : '';

        return (
            customerId.includes(search.toLowerCase()) ||
            phoneBrand.includes(search.toLowerCase()) ||
            damageDescription.includes(search.toLowerCase())
        );
    });

    const handleDelete = async (repair) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete repair with ID: ${repair.id}?`);
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/repairs/${repair.id}`);
                if (response.data.success) {
                    alert('Repair deleted successfully');
                }
            } catch (error) {
                console.error('Error deleting repair:', error);
                alert('Failed to delete repair.');
            }
        }
    };

    const revenue = Math.floor(Math.random() * 1000000) + 1000000;
    const storeSparepartExpenses = Math.floor(Math.random() * (revenue / 2));
    const externalSparepartExpenses = Math.floor(Math.random() * (revenue / 2));
    const profit = revenue - (storeSparepartExpenses + externalSparepartExpenses);

    return (
        <AuthenticatedLayout page={'Repairs'} action={'Dashboard'}>
            <Head title="Repairs Dashboard" />

            <div className="p-6">

                {/* Service Category Stats */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <Stat title="Store Sparepart Expenses" value={`Rp${storeSparepartExpenses.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-8 w-8 text-blue-500" />} />
                    <Stat title="External Sparepart Expenses" value={`Rp${externalSparepartExpenses.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-8 w-8 text-blue-500" />} />
                    <Stat title="Revenue" value={`Rp${revenue.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-8 w -8 text-blue-500" />} />
                    <Stat title="Profit" value={`Rp${profit.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-8 w-8 text-blue-500" />} />
                </div>

                {/* Current Year Service Graph */}
                <Card className="mb-8">
                    <div className="font-bold text-2xl mb-4">Current Year Service Analytics</div>
                    <Chart
                        options={{
                            chart: {
                                id: 'service-bar',
                                toolbar: {
                                    show: false,
                                },
                            },
                            grid: {
                                show: false,
                            },
                            xaxis: {
                                categories: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
                                lines: {
                                    show: false,
                                },
                            },
                            yaxis: {
                                lines: {
                                    show: false,
                                },
                            },
                        }}
                        series={[
                            {
                                name: 'Services',
                                data: Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 100)),
                            },
                        ]}
                        type="bar"
                        width="100%"
                        height="200px"
                    />
                </Card>

                {/* Space between graph and table */}
                <div className="mb-8"></div>

                {/* Technician Profit Table */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">Technician Profit Table</h3>
                    <div className="overflow-x-auto">
                        <DataTable
                            headers={['Entry Date', 'Customer ID', 'Cashier', 'Phone Brand', 'Damage Description', 'Technician ID', 'Invoice Number']}
                            data={filteredRepairs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((repair) => ({
                                entry_date: repair.entry_date,
                                customer_id: repair.customer_id,
                                cashier: repair.cashier,
                                phone_brand: repair.phone_brand,
                                damage_description: repair.damage_description,
                                technician_id: repair.technician_id,
                                invoice_number: repair.invoice_number,
                            }))}
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(filteredRepairs.length / itemsPerPage) }, (_, index) => (
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

                {/* Sparepart Usage Progress */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-2">Sparepart Usage Progress</h3>
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

                {/* Categories Accordion */}
                {Array.isArray(categories) && categories.length > 0 ? (
                    <Accordion>
                        {categories.map((category) => (
                            <Accordion.Item key={category.id} title={category.name}>
                                {filteredRepairs
                                    .filter(repair => repair.category_id === category.id)
                                    .map(repair => (
                                        <div key={repair.id} className="p-2 border-b">
                                            <p>{repair.damage_description}</p>
                                            <Button size="sm" onClick={() => handleEdit(repair)}>Edit</Button>
                                            <Button size="sm" type="danger" onClick={() => handleDelete(repair)}>Delete</Button>
                                        </div>
                                    ))}
                                <div className="mt-2"> <p>Additional Info:</p>
                                    <ul>
                                        <li>Pengeluaran Sparepart Toko: Rp0.00</li>
                                        <li>Pengeluaran Sparepart Luar: Rp0.00</li>
                                        <li>Penghasilan: Rp0.00</li>
                                        <li>Laba: Rp0.00</li>
                                    </ul>
                                </div>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <p>No categories available.</p>
                )}

                {/* Modal for Editing Repair */}
                {isModalOpen && (
                    <EditRepairModal
                        repair={selectedRepair}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
