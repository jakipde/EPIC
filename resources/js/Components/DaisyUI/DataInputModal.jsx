import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { isEmpty } from 'lodash';
import SelectInput from '@/Components/DaisyUI/SelectInput';
import TextInput from '@/Components/DaisyUI/TextInput';
import TextAreaInput from '@/Components/DaisyUI/TextAreaInput';

const CATEGORY_IDS = {
    CUSTOMERS: '1',
    TECHNICIANS: '2',
    REPAIRS: '3',
    DEVICES: '4',
    ACCESSORIES: '5',
    SPAREPARTS: '6',
    TOOLS: '7',
};

const FieldRenderer = ({ field, data, handleOnChange, errors, customers, technicians }) => {
    switch (field.field_name) {
        case 'customer_id':
            return (
                <SelectInput
                    id={field.field_name}
                    name={field.field_name}
                    value={data[field.field_name]}
                    onChange={handleOnChange}
                    label={field.label}
                    error={errors[field.field_name]}
                >
                    <option value="">-- Select Customer --</option>
                    {customers.length > 0 ? (
                        customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No customers available</option>
                    )}
                    <option value="add_new">Add New Customer</option>
                </SelectInput>
            );
        case 'cashier':
        case 'technician_id':
            return (
                <SelectInput
                    id={field.field_name}
                    name={field.field_name}
                    value={data[field.field_name]}
                    onChange={handleOnChange}
                    label={field.label}
                    error={errors[field.field_name]}
                >
                    <option value="">-- Select Technician --</option>
                    {technicians.length > 0 ? (
                        technicians.map(technician => (
                            <option key={technician.id} value={technician.id}>
                                {technician.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No technicians available</option>
                    )}
                </SelectInput>
            );
        case 'print_type':
        case 'under_warranty':
            return (
                <SelectInput
                    id={field.field_name}
                    name={field.field_name}
                    value={data[field.field_name]}
                    onChange={handleOnChange}
                    label={field.label}
                    error={errors[field.field_name]}
                >
                    <option value="">-- Select --</option>
                    {field.field_name === 'print_type' ? (
                        <>
                            <option value="JET">JET</option>
                            <option value="Blank">Blank</option>
                            <option value="Laser">Laser</option>
                            <option value="Inkjet">Inkjet</option>
                        </>
                    ) : (
                        <>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </>
                    )}
                </SelectInput>
            );
        case 'textarea':
            return (
                <TextAreaInput
                    id={field.field_name}
 name={field.field_name}
                    value={data[field.field_name]}
                    onChange={handleOnChange}
                    label={field.label}
                    error={errors[field.field_name]}
                />
            );
        default:
            return (
                <TextInput
                    id={field.field_name}
                    type={field.field_type}
                    name={field.field_name}
                    value={data[field.field_name]}
                    onChange={handleOnChange}
                    label={field.label}
                    error={errors[field.field_name]}
                />
            );
    }
};

export default function DataInputModal(props) {
    const { modalState, categories } = props;

    const generateInvoiceNumber = () => {
        const prefix = 'INV-';
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `${prefix}${randomNumber}`;
    };

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        category: '',
        invoice_number: generateInvoiceNumber(),
    });

    const [fields, setFields] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [warningCategory, setWarningCategory] = useState('');
    const [warningForm, setWarningForm] = useState('');
    const modalRef = useRef(null);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleReset = () => {
        reset();
        clearErrors();
        setFields([]);
        setCustomers([]);
        setTechnicians([]);
        setFetchError(null);
        setIsLoading(false);
        setWarningCategory('');
        setWarningForm('');
        setData({ ...data, invoice_number: generateInvoiceNumber() });
    };

    const handleClose = () => {
        handleReset();
        modalState.toggle();
    };

    const fetchFields = async (categoryId) => {
        console.log('Fetching fields for category:', categoryId);
        setIsLoading(true);
        try {
            const response = await fetch(`api/categories/${categoryId}/fields`);
            const fieldData = await response.json();
            if (Array.isArray(fieldData)) {
                setFields(fieldData);
            } else {
                throw new Error('Invalid fields data received.');
            }
            setFetchError(null);
        } catch (err) {
            console.error(err);
            setFetchError('Failed to load fields. Please try again.');
            setFields([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        console.log('Category selected:', categoryId);
        setData('category', categoryId);
        if (categoryId) fetchFields(categoryId);
        else setFields([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.category) {
            setWarningCategory('Please select a category.');
            return;
        } else {
            setWarningCategory('');
        }

        if (fields.some(field => !data[field.field_name])) {
            setWarningForm('Please fill out all required fields.');
            return;
        } else {
            setWarningForm('');
        }

        let action, routePath;
        switch (data.category) {
            case CATEGORY_IDS.CUSTOMERS:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('customers.update', modalState.data.id) : route('customers.store');
                break;
            case CATEGORY_IDS.TECHNICIANS:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('technicians.update', modalState.data.id) : route('technicians.store');
                break;
            case CATEGORY_IDS.REPAIRS:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('repairs.update', modalState.data.id) : route('repairs.store');
                break;
            case CATEGORY_IDS.DEVICES:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('devices.update', modalState.data.id) : route('devices.store');
                break;
            case CATEGORY_IDS.ACCESSORIES:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('accessories.update', modalState.data.id) : route('accessories.store');
                break;
            case CATEGORY_IDS.SPAREPARTS:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('spareparts.update', modalState.data.id) : route('spareparts.store');
                break;
            case CATEGORY_IDS.TOOLS:
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('tools.update', modalState.data.id) : route('tools.store');
                break;
            default:
                console.error('Unknown category:', data.category);
                setWarningCategory('Unknown category selected.');
                return;
        }

        const underWarrantyValue = data.under_warranty === 'Yes';

        const submitData = {
            ...data,
            invoice_number: data.invoice_number,
            under_warranty: underWarrantyValue,
            ...fields.reduce((acc, field) => ({ ...acc, [field.field_name]: data[field.field_name] }), {})
        };

        action(routePath, {
            data: submitData,
            onSuccess: (response) => {
                if (response.props.errors) {
                    Object.keys(response.props.errors).forEach((key) => {
                        setWarningForm(response.props.errors[key]);
                    });
                } else {
                    handleClose();
                }
            },
            onError: (errors) => {
                console.error('Submission error:', errors);
            },
        });
    };

    useEffect(() => {
        if (modalState.isOpen) {
            if (!isEmpty(modalState.data)) {
                setData({
                    category: modalState.data.category?.id || '',
                    invoice_number: modalState.data.invoice_number || '',
                    ...modalState.data,
                });
            } else {
                setData({
                    category: '',
                    invoice_number: generateInvoiceNumber(),
                });
                handleReset();
            }
        }
    }, [modalState]);

    useEffect(() => {
        if (modalState.isOpen) {
            fetch('/customers')
                .then(response => response.json())
                .then(data => setCustomers(data))
                .catch(error => console.error('Error fetching customers:', error));

            fetch('/technicians')
                .then(response => response.json())
                .then(data => setTechnicians(data))
                .catch(error => console.error('Error fetching technicians:', error));
        }
    }, [modalState]);

    useEffect(() => {
        if (data.category) {
            setIsLoading(true);
            fetch(`/data-entries/categories/${data.category}/fields`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setFields(data);
                    } else {
                        setFetchError('No fields available for the selected category.');
                        setFields([]);
                    }
                    setFetchError(null);
                })
                .catch(error => {
                    console.error('Error fetching fields:', error);
                    setFields([]);
                    setFetchError('Failed to fetch fields. Please try again.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setFields([]);
        }
    }, [data.category]);

    return (
        <dialog className={`modal ${modalState.isOpen ? 'modal-open' : ''}`}>
            <div ref={modalRef} className="modal-box max-w-lg mx-auto">
                <h3 className="text-lg font-bold">Input Data</h3>
                <form onSubmit={handleSubmit} className="space-y-2.5">
                    <SelectInput
                        name="category"
                        value={data.category}
                        onChange={handleCategoryChange}
                        label="Select Category"
                        error={errors.category}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </SelectInput>

                    {data.category && ['3'].includes(data.category) && (
                        <div>
                            <label className="label">Invoice Number:</label>
                            <p>{data.invoice_number}</p>
                        </div>
                    )}

                    {fetchError && <p className="text-error">{fetchError}</p>}
                    {isLoading && <p>Loading Forms...</p>}
                    {warningCategory && <p className="text-error">{warningCategory}</p>}
                    {warningForm && <p className="text-error">{warningForm}</p>}

                    {fields.length > 0 ? (
                        fields.map(field => (
                            <div key={field.field_name}>
                                <FieldRenderer
                                    field={field}
                                    data={data}
                                    handleOnChange={handleOnChange}
                                    errors={errors}
                                    customers={customers}
                                    technicians={technicians}
                                />
                                {errors[field.field_name] && <p className="text-error">{errors[field.field_name]}</p>}
                            </div>
                        ))
                    ) : (
                        <p>No fields available for the selected category.</p>
                    )}

                    <div className="modal-action">
                        <button type="submit" className={`btn ${processing ? 'loading' : ''}`}>
                            Simpan
                        </button>
                        <button type="button" onClick={handleClose} className="btn btn-secondary">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
