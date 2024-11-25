import React, { useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/DaisyUI/TextInput';
import TextAreaInput from '@/Components/DaisyUI/TextAreaInput';

export default function EditRepairModal({ modalState, onClose }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: '',
        entry_date: '',
        customer_id: '',
        cashier: '',
        phone_brand: '',
        damage_description: '',
        technician_id: '',
        invoice_number: '',
    });

    const modalRef = useRef(null);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleClose = () => {
        reset(); // Reset form data
        onClose(); // Close the modal
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", data); // Debugging line
 put(route('api.repairs.update', data.id), {
            data: data,
            onSuccess: () => {
                handleClose(); // Close modal on success
            },
            onError: (errors) => {
                console.error('Submission error:', errors);
            },
        });
    };

    useEffect(() => {
        if (modalState.isOpen && modalState.data) {
            setData(modalState.data); // Populate form with existing data
        }
    }, [modalState]);

    return (
        <dialog className={`modal ${modalState.isOpen ? 'modal-open' : ''}`} ref={modalRef}>
            <form onSubmit={handleSubmit} className="modal-box">
                <h2 className="font-bold text-lg">Edit Repair</h2>
                <div className="form-control">
                    <TextInput
                        name="entry_date"
                        value={data.entry_date}
                        onChange={handleOnChange}
                        label="Entry Date"
                        error={errors.entry_date}
                    />
                    <TextInput
                        name="customer_id"
                        value={data.customer_id}
                        onChange={handleOnChange}
                        label="Customer ID"
                        error={errors.customer_id}
                    />
                    <TextInput
                        name="cashier"
                        value={data.cashier}
                        onChange={handleOnChange}
                        label="Cashier"
                        error={errors.cashier}
                    />
                    <TextInput
                        name="phone_brand"
                        value={data.phone_brand}
                        onChange={handleOnChange}
                        label="Phone Brand"
                        error={errors.phone_brand}
                    />
                    <TextAreaInput
                        name="damage_description"
                        value={data.damage_description}
                        onChange={handleOnChange}
                        label="Damage Description"
                        error={errors.damage_description}
                    />
                    <TextInput
                        name="technician_id"
                        value={data.technician_id}
                        onChange={handleOnChange}
                        label="Technician ID"
                        error={errors.technician_id}
                    />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit" className={`btn ${processing ? 'loading' : ''}`} disabled={processing}>
                        Save
                    </button>
                </div>
            </form>
        </dialog>
    );
}
