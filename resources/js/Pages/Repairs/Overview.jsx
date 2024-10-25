import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/DaisyUI/Card';

export default function Overview({ repairs }) {
    return (
        <AuthenticatedLayout page={'System'} action={'Repairs Overview'}>
            <Head title="Repairs Overview" />
            <div>
                <Card>
                    <div className="font-bold text-2xl mb-4">Repairs Overview</div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Invoice Number</th>
                                <th className="border border-gray-300 px-4 py-2">Customer</th>
                                <th className="border border-gray-300 px-4 py-2">Phone Brand</th>
                                <th className="border border-gray-300 px-4 py-2">Entry Date</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairs.data.map((repair) => (
                                <tr key={repair.id}>
                                    <td className="border border-gray-300 px-4 py-2">{repair.invoice_number}</td>
                                    <td className="border border-gray-300 px-4 py-2">{repair.customer.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{repair.phone_brand}</td>
                                    <td className="border border-gray-300 px-4 py-2">{repair.entry_date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{repair.exit_date ? 'Completed' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
