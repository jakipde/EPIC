import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import Card from '@/Components/DaisyUI/Card'

export default function Form(props) {
    const {
        props: { errors },
    } = usePage()
    const { device } = props

    const [processing, setProcessing] = useState(false)

    const [name, setName] = useState('')

    const handleSubmit = () => {
        if (isEmpty(device) === false) {
            router.put(
                route('devices.update', device),
                {
                    name: name,
                },
                {
                    onStart: () => setProcessing(true),
                    onFinish: (e) => {
                        setProcessing(false)
                    },
                }
            )
            return
        }
        router.post(
            route('devices.store'),
            {
                name: name,
            },
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(device)) {
            setName(device.name)
        }
    }, [device])

    return (
        <AuthenticatedLayout page={'System'} action={'Device'}>
            <Head title="Device" />

            <div>
                <Card>
                    <div className="flex flex-col gap-2 justify-between">
                        <TextInput
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            error={errors.name}
                        />
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Simpan
                                </Button>
                                <Link href={route('devices.index')}>
                                    <Button type="secondary">
                                        Kembali
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
