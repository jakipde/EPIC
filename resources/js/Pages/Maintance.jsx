import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { HiFire } from 'react-icons/hi2'

export default function Maintance(props) {
    return (
        <AuthenticatedLayout page={'System'} action={'Development Mode'}>
            <Head title="Masih Dalam Pengembangan" />

            <div>
                <div className="overflow-hidden py-40 shadow-sm sm:rounded-lg bg-base-300 text-base-content flex justify-center items-center flex-col">
                    <HiFire className="text-center w-40 h-40" />
                    <div className="p-6 text-3xl">Fitur Dalam Pengembangan</div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
