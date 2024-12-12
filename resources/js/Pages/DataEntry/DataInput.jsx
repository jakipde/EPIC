import React, { useEffect, useState } from 'react';
import { router, Head } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useModalState } from '@/hooks';

import HasPermission from '@/Components/Common/HasPermission';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/DaisyUI/Pagination';
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import Dropdown from '@/Components/DaisyUI/Dropdown';
import Card from '@/Components/DaisyUI/Card';
import DataInputModal from '../../Components/DaisyUI/DataInputModal';

export default function DataInput(props) {
    const {
        data: { links, data },
        categories,
    } = props;

    const [search, setSearch] = useState('');
    const preValue = usePrevious(search);

    const confirmModal = useModalState();
    const formModal = useModalState();

    const toggleFormModal = (dataEntry = null) => {
        formModal.toggle(); // Open the modal
    };

    const handleDeleteClick = (dataEntry) => {
        confirmModal.setData(dataEntry);
        confirmModal.toggle();
    };

    const onDelete = () => {
        if (confirmModal.data) {
            router.delete(route('data-entries.destroy', confirmModal.data.id), {
                onSuccess: () => confirmModal.toggle(),
            });
        }
    };

    const params = { q: search };

    useEffect(() => {
        if (preValue !== search && search !== '') {
            router.get(route(route().current()), { q: search }, {
                replace: true,
                preserveState: true,
            });
        }
    }, [search, preValue]);

    return (
        <AuthenticatedLayout page={'Data Entry'} action={'Data Input'}>
            <Head title="Data Input" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-data-entry">
                            <Button size="sm" onClick={() => toggleFormModal()} type="primary">
                                Add Entry
                            </Button>
                        </HasPermission>
                        <div className="flex items-center">
                            <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((entry) => {
                                console.log("Entry being rendered:", entry); // Log each entry
                                return (
                                    <tr key={entry.id}>
                                        <td>{entry.name}</td>
                                        <td>{entry.category?.name || 'N/A'}</td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <Dropdown.Item onClick={() => toggleFormModal(entry)}>
                                                    <div className="flex space-x-1 items-center">
                                                        <HiPencil />
                                                        <div>Edit</div>
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </td>
                                    </tr> ); })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination links={links} params={params} />
                    </div>
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
            <DataInputModal modalState={formModal} categories={categories} />
        </AuthenticatedLayout>
    );
}
