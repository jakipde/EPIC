import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isArray, isEmpty } from 'lodash'


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Card from '@/Components/DaisyUI/Card'
import Breadcrumb from '@/Components/DaisyUI/Breadcrumb'
import Button from '@/Components/DaisyUI/Button'
import Chart from 'react-apexcharts'

const toolsData = [
    { id: 1, name: 'Screwdriver Set', quantity: 15, price: '$25' },
    { id: 2, name: 'Pliers', quantity: 10, price: '$15' },
    { id: 3, name: 'Soldering Iron', quantity: 5, price: '$40' },
];

export default function ToolsPage() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Card>
                <div className="font-bold text-2xl">Tools Inventory</div>
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
                        {toolsData.map((tool) => (
                            <tr key={tool.id}>
                                <td className="border border-gray-300 p-2">{tool.id}</td>
                                <td className="border border-gray-300 p-2">{tool.name}</td>
                                <td className="border border-gray-300 p-2">{tool.quantity}</td>
                                <td className="border border-gray-300 p-2">{tool.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
