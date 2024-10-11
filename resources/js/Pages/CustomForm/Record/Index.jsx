import React, { useEffect, useState } from 'react'
import { router, Head, Link } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useModalState } from '@/hooks'

import HasPermission from '@/Components/Common/HasPermission'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import Button from '@/Components/DaisyUI/Button'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Card from '@/Components/DaisyUI/Card'

const RecordTd = ({ fields, h }) => {
    const f = JSON.parse(fields).find((f) => h.id === f.id)
    if (f) {
        return <td>{f.value}</td>
    }
    return <td></td>
}

export default function Index(props) {
    const {
        field,
        data: { links, data },
    } = props

    const headers = JSON.parse(field.fields)
    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()

    const handleDeleteClick = (item) => {
        confirmModal.setData(item)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(
                route('custom-form.form-records.destroy', {
                    form: field,
                    formRecord: confirmModal.data.id,
                })
            )
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current(), {
                    form: field,
                }),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout page={'Module'} action={field.name}>
            <Head title={`Record - ${field.name}`} />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <div className="flex flex-row gap-2">
                            <HasPermission p="create-custom-form-record">
                                <Link
                                    href={route(
                                        'custom-form.form-records.create',
                                        field
                                    )}
                                >
                                    <Button size="sm" type="primary">
                                        Tambah
                                    </Button>
                                </Link>
                            </HasPermission>
                            <a
                                href={route('custom-form.public', field)}
                                target="_blank"
                            >
                                <Button size="sm" type="secondary">
                                    Public Form
                                </Button>
                            </a>
                            <a
                                href={route(
                                    'custom-form.form-records.export',
                                    field
                                )}
                                target="_blank"
                            >
                                <Button size="sm" type="info">
                                    Export
                                </Button>
                            </a>
                            <a
                                href={route(
                                    'custom-form.form-records.print',
                                    field
                                )}
                                target="_blank"
                            >
                                <Button size="sm">Print</Button>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    {headers.map((f) => (
                                        <th key={f.id}>{f.name}</th>
                                    ))}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={`${index}.${item.id}`}>
                                        {headers.map((h, i) => (
                                            <RecordTd
                                                key={`sub.${h.id}.${item.id}.${i}`}
                                                fields={item.fields}
                                                h={h}
                                            />
                                        ))}
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-custom-form-record">
                                                    <Dropdown.Item>
                                                        <Link
                                                            href={route(
                                                                'custom-form.form-records.edit',
                                                                {
                                                                    form: field,
                                                                    formRecord:
                                                                        item,
                                                                }
                                                            )}
                                                            className="flex space-x-1 items-center"
                                                        >
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </Link>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-custom-form-record">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiTrash />
                                                            <div>Hapus</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination links={links} params={params} />
                    </div>
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
        </AuthenticatedLayout>
    )
}
