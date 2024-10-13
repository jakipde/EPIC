import React from 'react'
import { Head, useForm } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Card from '@/Components/DaisyUI/Card'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'

export default function Page(props) {
    const { sparePart } = props

    const { data, setData, post, processing, errors } = useForm({
        name: sparePart?.name,
    })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleSubmit = () => {
        post(route('spare-parts.update'))
    }

    return (
        <AuthenticatedLayout page={'System'} action={'SparePart'}>
            <Head title="SparePart" />

            <div>
                <Card>
                    <div className="text-xl font-bold mb-4 text-base-content">
                        SparePart
                    </div>
                    <TextInput
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        label="Name"
                        error={errors.name}
                    />
                    <div className="mt-4">
                        <Button
                            onClick={handleSubmit}
                            processing={processing}
                            type="primary"
                        >
                            Simpan
                        </Button>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
