import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isArray, isEmpty } from 'lodash'


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Card from '@/Components/DaisyUI/Card'
import Breadcrumb from '@/Components/DaisyUI/Breadcrumb'
import Button from '@/Components/DaisyUI/Button'
import Chart from 'react-apexcharts'

const sparePartsData = [
    { id: 1, name: 'Battery', quantity: 10, price: '$30' },
    { id: 2, name: 'Screen', quantity: 5, price: '$100' },
    { id: 3, name: 'Motherboard', quantity: 2, price: '$200' },
];

export default function SparePartsPage() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Card>
                <div className="font-bold text-2xl">Spare Parts Inventory</div>
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sparePartsData.map((part) => (
                            <tr key={part.id}>
                                <td className="border border-gray-300 p-2">{part.id}</td>
                                <td className="border border-gray-300 p-2">{part.name}</td>
                                <td className="border border-gray-300 p-2">{part.quantity}</td>
                                <td className="border border-gray-300 p-2">{part.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
