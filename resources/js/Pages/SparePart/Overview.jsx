import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/DaisyUI/Card';

export default function RepairsOverview(props) {
    const { repairs } = props;

    return (
        <AuthenticatedLayout page="Overview" action="Repair Overview">
            <Head title="Repair Overview" />

            <div>
                <Card>
                    <h2 className="text-lg font-bold mb-4">Repair Overview</h2>
                    <ul>
                        {repairs.map((repair) => (
                            <li key={repair.id} className="mb-2">
                                {repair.name}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
