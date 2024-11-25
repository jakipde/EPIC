import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isArray, isEmpty } from 'lodash'


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Card from '@/Components/DaisyUI/Card'
import Breadcrumb from '@/Components/DaisyUI/Breadcrumb'
import Button from '@/Components/DaisyUI/Button'
import Chart from 'react-apexcharts'

const devicesData = [
    { id: 1, name: 'Laptop', quantity: 15, price: '$800' },
    { id: 2, name: 'Smartphone', quantity: 30, price: '$600' },
    { id: 3, name: 'Tablet', quantity: 20, price: '$400' },
];

export default function DevicesPage() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Card>
                <div className="font-bold text-2xl">Devices Inventory</div>
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
                        {devicesData.map((device) => (
                            <tr key={device.id}>
                                <td className="border border-gray-300 p-2">{device.id}</td>
                                <td className="border border-gray-300 p-2">{device.name}</td>
                                <td className="border border-gray-300 p-2">{device.quantity}</td>
                                <td className="border border-gray-300 p-2">{device.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
