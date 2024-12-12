import React, { useEffect, useState } from 'react';
import { router, Head } from '@inertiajs/react';
import { useModalState } from '@/hooks';
import { HiPencil, HiTrash } from 'react-icons/hi2';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/DaisyUI/Pagination';
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import Dropdown from '@/Components/DaisyUI/Dropdown';
import Card from '@/Components/DaisyUI/Card';
import DataInputModal from '@/Components/DaisyUI/DataInputModal';

export default function DataInput({ data: { links, data }, categories }) {
    const [search, setSearch] = useState('');
    const confirmModal = useModalState();
    const formModal = useModalState();

    const toggleFormModal = (dataEntry = null) => {
        formModal.setData(dataEntry);
        formModal.toggle();
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
        const fetchCategories = async () => {
            try {
                const response = await fetch('/categories');
                const categoryData = await response.json();
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <AuthenticatedLayout page="Data Entry" action="Data Input">
            <Head title="Data Input" />
            <Card>
                <div className="flex justify-between mb-4">
                    <Button size="sm" onClick={() => toggleFormModal()} type="primary">
                        Add Entry
                    </Button>
                    <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="overflow-x-auto">
                    <table className="table mb-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry) => (
                                <tr key={entry.id}>
                                    <td>{entry.name}</td>
                                    <td>{entry.category?.name || 'N/A'}</td>
                                    <td className="text-end">
                                        <Dropdown>
                                            <Dropdown.Item onClick={() => toggleFormModal(entry)}>
                                                <HiPencil /> Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteClick(entry)}>
                                                <HiTrash /> Delete
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={links} params={params} />
            </Card>

            {/* Display the fetched categories as a list */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Fetched Categories:</h3>
                <ul>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category.id}>
                                <strong>{category.name}</strong> (ID: {category.id})
                            </li>
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </ul>
            </div>

            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
            <DataInputModal modalState={formModal} categories={categories} />
        </AuthenticatedLayout>
    );
}
