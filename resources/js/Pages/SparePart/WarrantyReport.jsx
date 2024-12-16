import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

const WarrantyReport = () => {
    return (
        <AuthenticatedLayout page={'Warranty Report'}>
            <Head title="Warranty Report" />
            <div>
                <h1>Warranty Report Page</h1>
                <p>This is the warranty report page.</p>
            </div>
        </AuthenticatedLayout>
    );
};

export default WarrantyReport;
