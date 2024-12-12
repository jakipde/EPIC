import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import SelectInput from '@/Components/DaisyUI/SelectInput';
import TextInput from '@/Components/DaisyUI/TextInput';
import TextareaInput from '@/Components/DaisyUI/TextareaInput';

export default function DataInputModal({ modalState, categories }) {
    const { data, setData, post, put, reset, clearErrors } = useForm({
        category: '',
    });

    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFields = async (categoryId) => {
        console.log('Fetching fields for category:', categoryId); // Debug
        setLoading(true);
        try {
            const response = await fetch(`/categories/${categoryId}/fields`);
            const fieldData = await response.json();
            console.log('Fetched fields:', fieldData); // Debug
            if (Array.isArray(fieldData)) {
                setFields(fieldData);
            } else {
                throw new Error('Invalid fields data received.');
            }
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load fields. Please try again.');
            setFields([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setData('category', categoryId);
        if (categoryId) fetchFields(categoryId);
        else setFields([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const routePath = modalState.data
            ? route('data-entries.update', modalState.data.id)
            : route('data-entries.store');
        const action = modalState.data ? put : post;
        action(routePath, {
            data,
            onSuccess: () => modalState.toggle(),
        });
    };

    useEffect(() => {
        if (modalState.isOpen) {
            if (modalState.data) {
                setData(modalState.data);
                if (modalState.data.category) fetchFields(modalState.data.category);
            } else {
                reset();
                setFields([]);
            }
        }
    }, [modalState]);

    return (
        <dialog className={`modal ${modalState.isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="text-lg font-bold">Input Data</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <SelectInput
                        name="category"
                        id="category-select"
                        label="Category"
                        value={data.category}
                        onChange={handleCategoryChange}
                        options={categories.map(({ id, name }) => ({ value: id, label: name }))}
                    />
                    {loading && <p>Loading fields...</p>}
                    {error && <p className="text-error">{error}</p>}
                    {fields.length > 0 ? (
                        fields.map((field) => {
                            const fieldId = `field-${field.id}`;
                            if (field.field_type === 'text') {
                                return (
                                    <TextInput
                                        key={field.id}
                                        id={fieldId}
                                        name={field.field_name}
                                        label={field.label}
                                        value={data[field.field_name] || ''}
                                        onChange={(e) => setData(field.field_name, e.target.value)}
                                    />
                                );
                            }

                            if (field.field_type === 'textarea') {
                                return (
                                    <TextareaInput
                                        key={field.id}
                                        id={fieldId}
                                        name={field.field_name}
                                        label={field.label}
                                        value={data[field.field_name] || ''}
                                        onChange={(e) => setData(field.field_name, e.target.value)}
                                    />
                                );
                            }

                            if (field.field_type === 'select' && field.options) {
                                const options = field.options.split(',').map((option) => ({
                                    value: option,
                                    label: option,
                                }));
                                return (
                                    <SelectOptionArray
                                        key={field.id}
                                        id={fieldId}
                                        name={field.field_name}
                                        label={field.label}
                                        value={data[field.field_name] || ''}
                                        onChange={(e) => setData(field.field_name, e.target.value)}
                                        options={options}
                                    />
                                );
                            }

                            if (field.field_type === 'select' && field.options && typeof field.options === 'object') {
                                return (
                                    <SelectOptionObject
                                        key={field.id}
                                        id={fieldId}
                                        name={field.field_name}
                                        label={field.label}
                                        value={data[field.field_name] || ''}
                                        onChange={(e) => setData(field.field_name, e.target.value)}
                                        options={field.options}
                                    />
                                );
                            }

                            return null;
                        })
                    ) : (
                        <p>No fields available for this category.</p>
                    )}
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <button type="button" className="btn" onClick={() => modalState.toggle()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
