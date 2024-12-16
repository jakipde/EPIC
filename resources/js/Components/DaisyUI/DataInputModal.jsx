import React, { useEffect, useRef, useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import SelectInput from '@/Components/DaisyUI/SelectInput';
import TextInput from '@/Components/DaisyUI/TextInput';
import TextAreaInput from '@/Components/DaisyUI/TextareaInput';

export default function DataInputModal(props) {
    const { modalState, categories } = props;

    // Define the function to generate a random invoice number
    const generateInvoiceNumber = () => {
        const prefix = 'INV-';
        const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
        return `${prefix}${randomNumber}`;
    };

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        category: '',
        invoice_number: generateInvoiceNumber(), // Set the initial invoice number
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
        setData({ ...data, invoice_number: generateInvoiceNumber() }); // Reset invoice number
    };

    const handleClose = () => {
        handleReset();
        modalState.toggle();
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
            case '1':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('customers.update', modalState.data.id) : route('customers.store');
                break;
            case '2':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('technicians.update', modalState.data.id) : route('technicians.store');
                break;
            case '3':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('repairs.update', modalState.data.id) : route('repairs.store');
                break;
            case '4':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('devices.update', modalState.data.id) : route('devices.store');
                break;
            case '5':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('accessories.update', modalState.data.id) : route('accessories.store');
                break;
            case '6':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('spareparts.update', modalState.data.id) : route('spareparts.store');
                break;
            case '7':
                action = modalState.data ? put : post;
                routePath = modalState.data ? route('tools.update', modalState.data.id) : route('tools.store');
                break;
            default:
                console.error('Unknown category:', data.category);
                setWarningCategory('Unknown category selected.');
                return;
        }

        const underWarrantyValue = data.under_warranty === 'Yes'; // This will be true or false

        const submitData = {
            ...data,
            invoice_number: data.invoice_number, // Ensure this is included
            under_warranty: underWarrantyValue, // Set the converted value
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
                // Handle errors if needed
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
                    invoice_number: generateInvoiceNumber(), // Generate a new invoice number
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
                        onChange={handleOnChange}
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
                                {field.field_name === 'customer_id' ? (
                                    <SelectInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    >
                                        <option value="">-- Select Customer --</option>
                                        {Array.isArray(customers) && customers.length > 0 ? (
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
                                ) : field.field_name === 'cashier' ? (
                                    <SelectInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    >
                                        <option value="">-- Select Technician --</option>
                                        {Array.isArray(technicians) && technicians.length > 0 ? (
                                            technicians.map(technician => (
                                                <option key={technician.id} value={technician.id}>
                                                    {technician.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No technicians available</option>
                                        )}
                                    </SelectInput>
                                ) : field.field_name === 'technician_id' ? (
                                    <SelectInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    >
                                        <option value="">-- Select Technician --</option>
                                        {Array.isArray(technicians) && technicians.length > 0 ? (
                                            technicians.map(technician => (
                                                <option key={technician.id} value={technician.id}>
                                                    {technician.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No technicians available</option>
                                        )}
                                    </SelectInput>
                                ) : field.field_name === 'print_type' ? (
                                    <SelectInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    >
                                        <option value="">-- Select Print Type --</option>
                                        <option value="JET">JET</option>
                                        <option value="Blank">Blank</option>
                                        <option value="Laser">Laser</option>
                                        <option value="Inkjet">Inkjet</option>
                                    </SelectInput>
                                ) : field.field_name === 'under_warranty' ? (
                                    <SelectInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    >
                                        <option value="">-- Select Warranty Status --</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </SelectInput>
                                ) : field.field_type === 'textarea' ? (
                                    <TextAreaInput
                                        id={field.field_name}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    />
                                ) : (
                                    <TextInput
                                        id={field.field_name}
                                        type={field.field_type}
                                        name={field.field_name}
                                        value={data[field.field_name]}
                                        onChange={handleOnChange}
                                        label={field.label}
                                        error={errors[field.field_name]}
                                    />
                                )}
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
