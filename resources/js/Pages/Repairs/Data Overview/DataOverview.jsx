import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';

export default function DataOverview(props) {
    const { repair } = props; // Assuming repair data is passed as a prop

    // State to hold the data overview
    const [dataOverview, setDataOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataOverview = async () => {
            try {
                const response = await axios.get(`/repairs/${repair.id}/data-overview`);
                setDataOverview(response.data);
            } catch (error) {
                console.error('Error fetching data overview:', error);
                setError('Failed to load data overview. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDataOverview();
    }, [repair.id]);

    return (
        <AuthenticatedLayout page={`Data Overview for Repair ID: ${repair.id}`} repair={repair}>
            <Head title={`Data Overview for Repair ID: ${repair.id}`} />

            <div className="p-6">
                <Link href={route('repairs.index')} className="flex items-center mb-4 text-blue-500">
                    <HiArrowLeft className="mr-2" />
                    Back to Repairs
                </Link>
                <h1 className="text-2xl font-bold mb-4">Data Overview for Repair ID: {repair.id}</h1>

                {loading && <p>Loading data overview...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && !dataOverview && <p>No data available.</p>}
                {dataOverview && (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">Overview Details</h2>
                        <p><strong>Description:</strong> {dataOverview.description}</p>
                        <p><strong>Status:</strong> {dataOverview.status}</p>
                        <p><strong>Created At:</strong> {new Date(dataOverview.created_at).toLocaleDateString()}</p>
                        {/* Add more details as needed */}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
