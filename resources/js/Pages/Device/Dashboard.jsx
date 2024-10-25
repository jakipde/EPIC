import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isArray, isEmpty } from 'lodash'


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Card from '@/Components/DaisyUI/Card'
import Breadcrumb from '@/Components/DaisyUI/Breadcrumb'
import Button from '@/Components/DaisyUI/Button'
import Chart from 'react-apexcharts'


export default function Page(action = '',) {

        {!isEmpty(action) && (
        <>
            {isArray(action) ? (
                action.map((a, i) => (
                    <Breadcrumb.Item key={i}>
                        {a}
                    </Breadcrumb.Item>
                ))
            ) : (
                <Breadcrumb.Item>{action}</Breadcrumb.Item>
            )}
        </>
    )}
    return (
        <AuthenticatedLayout page={'System'} action={'Repairs'}>
            <Head title="Repairs" />

            <div>
            <Card>
                        <div className="font-bold text-2xl">
                            Sales Performance
                        </div>
                        <Chart
                            options={{
                                chart: {
                                    type: 'area',
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    curve: 'smooth',
                                },
                                grid: {
                                    show: false,
                                },
                                xaxis: {
                                    type: 'datetime',
                                    categories: [
                                        '2024-09-19T00:00:00.000Z',
                                        '2024-09-19T01:30:00.000Z',
                                        '2024-09-19T02:30:00.000Z',
                                        '2024-09-19T03:30:00.000Z',
                                        '2024-09-19T04:30:00.000Z',
                                        '2024-09-19T05:30:00.000Z',
                                        '2024-09-19T06:30:00.000Z',
                                    ],
                                },
                                tooltip: {
                                    x: {
                                        format: 'dd/MM/yy HH:mm',
                                    },
                                },
                            }}
                            series={[
                                {
                                    name: 'Team A',
                                    data: [31, 40, 28, 51, 42, 109, 100],
                                },
                                {
                                    name: 'Team B',
                                    data: [11, 32, 45, 32, 34, 52, 41],
                                },
                            ]}
                            type="area"
                            width="100%"
                            height="235px"
                        />
                    </Card>
            </div>
        </AuthenticatedLayout>
    )
}
