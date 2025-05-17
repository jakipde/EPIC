

import React, { useState, useEffect } from 'react'; // Add useState and useEffect here

import React, { useState, useEffect } from 'react';


import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Select from 'react-select';

const ServiceFormModal = ({
    isOpen,
    onClose,
    onAddRepair,
    setNewCustomerModalOpen,
    setPrintModalOpen,


    customers = [], // Default to an empty array
    setCustomers,
    selectedCustomerId,
    setCompletenessModalOpen,



    setCompletenessModalOpen,
    customers = [],
    setCustomers,
    selectedCustomerId,




    completeness,
    createdAt,
    currentRepair,
}) => {
    const [entryDate, setEntryDate] = useState(createdAt || '');
    const [customerId, setCustomerId] = useState(selectedCustomerId || '');
    const [customerPhone, setCustomerPhone] = useState('');
    const [cashierId, setCashierId] = useState(null);
    const [technicianId, setTechnicianId] = useState(null);


    const [error, setError] = useState(null);




    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceImage, setDeviceImage] = useState('');
    const [deviceDescription, setDeviceDescription] = useState('');
    const [phoneBrand, setPhoneBrand] = useState('');
    const [phoneDevice, setPhoneDevice] = useState('');
    const [imeiSn1, setImeiSn1] = useState('');
    const [imeiSn2, setImeiSn2] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [underWarranty, setUnderWarranty] = useState(false);
    const [warrantyDuration, setWarrantyDuration] = useState('');
    const [warrantyUnit, setWarrantyUnit] = useState('days');
    const [notes, setNotes] = useState('');
    const [repairType, setRepairType] = useState('');
    const [serviceType, setServiceType] = useState('');



    // State for dropdown data




    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [brands, setBrands] = useState([]);
    const [devices, setDevices] = useState([]);



    // Pricing states
    const [subTotal, setSubTotal] = useState('0');
    const [downPayment, setDownPayment] = useState('');
    const [total, setTotal] = useState(0);
    const [voucher, setVoucher] = useState('');

    const [subTotal, setSubTotal] = useState('0');
    const [downPayment, setDownPayment] = useState('');
    const [total, setTotal] = useState(0);


    const [subTotal, setSubTotal] = useState('0');
    const [downPayment, setDownPayment] = useState('');
    const [total, setTotal] = useState(0);

    const [remaining, setRemaining] = useState(0);
    const [isPaidOff, setIsPaidOff] = useState(false);
    const [paymentType, setPaymentType] = useState('');

    const paymentMethods = {
        Cash: { tax: 0 },


        'Bank Transfer': { tax: 0, fixedFee: 4000 }, // No tax
        'E-Wallets': { tax: 0.02 }, // 2% tax
        'Credit Card': { tax: 0.029, fixedFee: 2000 }, // 2.9% + IDR 2,000
        'Cardless Credit': { tax: 0.02 }, // 2% tax



        'Bank Transfer': { tax: 0, fixedFee: 4000 },
        'E-Wallets': { tax: 0.02 },
        'Credit Card': { tax: 0.029, fixedFee: 2000 },
        'Cardless Credit': { tax: 0.02 },




    };

    useEffect(() => {
        if (isOpen && currentRepair) {
            setEntryDate(currentRepair.entry_date);
            setCustomerId(currentRepair.customer_id);
            setCustomerPhone(currentRepair.customer_phone);
            setCashierId(currentRepair.cashier_id);
            setTechnicianId(currentRepair.technician_id);
            setSelectedBrand(currentRepair.phone_brand);
            setSelectedDevice(currentRepair.phone_model);
            setImeiSn1(currentRepair.imei_sn_1);
            setImeiSn2(currentRepair.imei_sn_2);
            setDamageDescription(currentRepair.damage_description);
            setUnderWarranty(currentRepair.under_warranty);
            setWarrantyDuration(currentRepair.warranty_duration);
            setWarrantyUnit(currentRepair.warranty_unit);
            setNotes(currentRepair.notes);
            setRepairType(currentRepair.repair_type);
            setServiceType(currentRepair.service_type);
            setSubTotal(currentRepair.sub_total);
            setDownPayment(currentRepair.down_payment);
            setTotal(currentRepair.total_price);
            setPaymentType(currentRepair.payment_method);
        }
    }, [isOpen, currentRepair]);

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.get('/secret.json'); // Adjust path if necessary
                const result = response.data;

                // Extract brands and devices

                const response = await axios.get('/secret.json');
                const result = response.data;



                const response = await axios.get('/secret.json');
                const result = response.data;


                const brandsData = result.root.brands.map(brand => ({
                    value: brand.id,
                    label: brand.name,
                }));

                const devicesData = result.root.devices.map(device => ({
                    value: device.id,
                    label: device.name,
                    img: device.img,
                    description: device.description,
                    brandId: device.brand_id,
                }));

                setBrands(brandsData);
                setDevices(devicesData);
            } catch (error) {
                console.error('Error fetching or parsing JSON:', error);
            }
        };

        fetchData();
    }, []);

    const handleBrandChange = (selectedOption) => {
        setSelectedBrand(selectedOption);
        setSelectedDevice(null);
        setDeviceImage('');
        setDeviceDescription('');
    };

    const handleDeviceChange = (selectedOption) => {
        setSelectedDevice(selectedOption);
        if (selectedOption) {
            setDeviceImage(selectedOption.img);
            setDeviceDescription(selectedOption.description);
        } else {
            setDeviceImage('');
            setDeviceDescription('');
        }
    };

    const handleImeiSn1Change = (e) => {


        const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits

        const value = e.target.value.replace(/[^0-9]/g, '');


        const value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length <= 15) {
            setImeiSn1(value);
        }
    };

    const handleImeiSn2Change = (e) => {


        const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits

        const value = e.target.value.replace(/[^0-9]/g, '');


        const value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length <= 15) {
            setImeiSn2(value);
        }
    };

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEntryDate(currentDate);
    }, []);

    useEffect(() => {
        const parsedSubTotal = parseInt(subTotal.replace(/[^0-9]/g, ""), 10) || 0;
        const parsedDownPayment = parseInt(downPayment.replace(/[^0-9]/g, ""), 10) || 0;

        let calculatedTotal = parsedSubTotal;

        if (paymentType && paymentMethods[paymentType]) {
            const { tax, fixedFee } = paymentMethods[paymentType];


            calculatedTotal += calculatedTotal * tax; // Apply percentage tax

            if (fixedFee) {
                calculatedTotal += fixedFee; // Add fixed fee if applicable



            calculatedTotal += calculatedTotal * tax;

            if (fixedFee) {
                calculatedTotal += fixedFee;




            }
        }

        setTotal(calculatedTotal);
        setRemaining(Math.max(0, calculatedTotal - parsedDownPayment));
    }, [subTotal, downPayment, paymentType]);

    const handleSubTotalChange = (e) => {


        const value = String(e.target.value).replace(/[^0-9]/g, ''); // Ensure value is a string

        const value = String(e.target.value).replace(/[^0-9]/g, '');


        const value = String(e.target.value).replace(/[^0-9]/g, '');

        setSubTotal(value || '0');
    };

    const handleDownPaymentChange = (e) => {
        const inputValue = e.target.value;


        const value = String(inputValue).replace(/[^0-9]/g, ''); // Ensure value is a string

        const value = String(inputValue).replace(/[^0-9]/g, '');


        const value = String(inputValue).replace(/[^0-9]/g, '');

        const parsedValue = parseInt(value, 10) || 0;
        const parsedSubTotal = parseInt(subTotal.replace(/[^0-9]/g, ""), 10) || 0;

        if (parsedValue <= parsedSubTotal) {
            setDownPayment(formatCurrency(value));
        } else {
            setDownPayment(formatCurrency(subTotal));
        }
    };

    const formatCurrency = (value) => {
        if (!value) return 'Rp0';


        const number = parseInt(String(value).replace(/[^0-9]/g, ''), 10); // Ensure value is a string

        const number = parseInt(String(value).replace(/[^0-9]/g, ''), 10);


        const number = parseInt(String(value).replace(/[^0-9]/g, ''), 10);

        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    useEffect(() => {
        if (isPaidOff) {
            setDownPayment(formatCurrency(total.toString()));
        }
    }, [total, isPaidOff]);

    const handlePaidOffClick = () => {
        setDownPayment(total.toString());
    };

    useEffect(() => {
        const parsedRemaining = Math.max(0, total - parseInt(downPayment.replace(/[^0-9]/g, ""), 10) || 0);
        if (parsedRemaining === 0) {
            setRemaining('Paid');
        } else {
            setRemaining(parsedRemaining);
        }
    }, [total, downPayment]);

    useEffect(() => {
        if (isOpen) {
            fetchCustomers();
            fetchUsersByRoleName('Cashier');
            fetchUsersByRoleName('Technician');
            setCustomerId(selectedCustomerId || '');
        }
    }, [isOpen, selectedCustomerId]);

    useEffect(() => {
        const selectedCustomer = customers.find(customer => customer.id === customerId);
        if (selectedCustomer) {
            setCustomerPhone(selectedCustomer.phone);
        } else {
            setCustomerPhone('');
        }
    }, [customerId, customers]);

    const fetchCustomers = async () => {
        try {


            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);



            const response = await axios.get('/api/customers'); // Ensure this matches your defined route
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setErrorMessage('Failed to fetch customers.');
        }
    };

    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') {
                setCashiers(response.data);
            } else if (roleName === 'Technician') {
                setTechnicians(response.data);
            }
        } catch (error) {
            console.error(`Error fetching users:`, error);




        }
    };

    const generateInvoiceNumber = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        return `INV-${day}${month}${year}${hours}${minutes}${seconds}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const invoiceNumber = generateInvoiceNumber();

        const newRepair = {
            entry_date: entryDate,
            customer_id: customerId,
            cashier_id: cashierId,
            technician_id: technicianId,
            phone_brand: phoneBrand,
            phone_model: phoneDevice,
            imei_sn_1: imeiSn1,
            imei_sn_2: imeiSn2,
            damage_description: damageDescription,
            under_warranty: underWarranty,
            warranty_duration: warrantyDuration,
            warranty_unit: warrantyUnit,
            notes: notes,
            repair_type: repairType,
            service_type: serviceType,
            total_price: total,


            down_payment: parseFloat(downPayment.replace(/[^0-9.]/g, "")) || 0, // Ensure downPayment is a string
            completeness: Object.keys(completeness).filter(key => completeness[key]),
            invoice_number: invoiceNumber,
            sub_total: parseFloat(subTotal.replace(/[^0-9.]/g, "")) || 0, // Ensure subTotal is a string
            payment_method: paymentType,
        };

        const updatedRepair = {
            entry_date: entryDate,
            customer_id: customerId,
            cashier_id: cashierId,
            technician_id: technicianId,
            phone_brand: phoneBrand,
            phone_model: phoneDevice,
            imei_sn_1: imeiSn1,
            imei_sn_2: imeiSn2,
            damage_description: damageDescription,
            under_warranty: underWarranty,
            warranty_duration: warrantyDuration,
            warranty_unit: warrantyUnit,
            notes: notes,
            repair_type: repairType,
            service_type: serviceType,
            total_price: total,
            down_payment: downPayment,
            payment_method: paymentType,
        };

        console.log('Submitting repair:', newRepair);




            down_payment: parseFloat(downPayment.replace(/[^0-9.]/g, "")) || 0,
            completeness: Object.keys(completeness).filter(key => completeness[key]),
            invoice_number: invoiceNumber,
            sub_total: parseFloat(subTotal.replace(/[^0-9.]/g, "")) || 0,
            payment_method: paymentType,
        };





        try {
            const response = await axios.post('/api/repairs', newRepair);
            if (response.data.success) {
                onAddRepair(response.data.repair);
                resetForm();
                onClose();
            }
        } catch (error) {
            console.error('Error submitting repair:', error.response ? error.response.data : error.message);
        }
    };

    const resetForm = () => {
        setEntryDate('');
        setCustomerId(selectedCustomerId || '');
        setCustomerPhone('');
        setPhoneBrand('');
        setPhoneDevice('');
        setImeiSn1('');
        setImeiSn2('');
        setDamageDescription('');
        setUnderWarranty(false);


        setWarrantyDuration(''); // Reset to an empty string

        setWarrantyDuration('');


        setWarrantyDuration('');

        setNotes('');
        setRepairType('');
        setServiceType('');
        setSubTotal('0');


        setVoucher('');




        setDownPayment('0');
        setTotal(0);
        setPaymentType('');
    };

    const handleCustomerChange = (e) => {
        const selectedId = e.target.value;
        setCustomerId(selectedId);
        const selectedCustomer = customers.find(customer => customer.id === selectedId);
        setCustomerPhone(selectedCustomer ? selectedCustomer.phone : '');
    };



    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            console.log(`Users response data:`, response.data);
            if (roleName === 'Cashier') {
                setCashiers(response.data); // Set the cashiers state
            } else if (roleName === 'Technician') {
                setTechnicians(response.data); // Set the technicians state
            }
        } catch (error) {
            console.error(`Error fetching users:`, error.response ? error.response.data : error.message);
            setError(error.message);
        }
    };





    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box max-w-5xl w-full p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{generateInvoiceNumber()}</h3>
                    <button
                        className="btn btn-primary"
                        onClick={() => setNewCustomerModalOpen(true)}
                    >
                        New Customer
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Entry Date</span>
                                </label>
                                <input
                                    type="date"
                                    value={entryDate}
                                    onChange={(e) => setEntryDate(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Phone Brand</span>
                                </label>
                                <Select
                                    options={brands}
                                    onChange={(selectedOption) => {
                                        handleBrandChange(selectedOption);
                                        setPhoneBrand(selectedOption ? selectedOption.label : '');
                                    }}
                                    placeholder="Select Brand"
                                    isClearable
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Phone Model</span>
                                </label>
                                <Select
                                    options={devices.filter(device => device.brandId === selectedBrand?.value)}
                                    onChange={(selectedOption) => {
                                        handleDeviceChange(selectedOption);
                                        setPhoneDevice(selectedOption ? selectedOption.label : '');
                                    }}
                                    placeholder="Select Model"
                                    isClearable
                                    isDisabled={!selectedBrand}
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">IMEI / SN 1 (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={imeiSn1}


                                    onChange={handleImeiSn1Change} // Updated handler

                                    onChange={handleImeiSn1Change}


                                    onChange={handleImeiSn1Change}

                                    placeholder="ex: 851591001xxx"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">IMEI / SN 2 (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={imeiSn2}


                                    onChange={handleImeiSn2Change} // Updated handler

                                    onChange={handleImeiSn2Change}


                                    onChange={handleImeiSn2Change}

                                    placeholder="ex: 8515912328xxx"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Damage Description</span>
                                </label>
                                <textarea
                                    value={damageDescription}
                                    onChange={(e) => setDamageDescription(e.target.value)}
                                    className="textarea textarea-bordered"
                                    placeholder="ex: Screen cracked"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Customer</span>
                                </label>


                                <select onChange={handleCustomerChange} value={customerId} className="select select-bordered" disabled>
                                    <option value="">Select a customer - {customerPhone}</option>
                                    {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>
                                        {`${customer.name} - ${customer.phone}`} {/* Updated format */}
                                    </option>
                                    ))}
                                </select>



                                    <select
                                        value={customerId || ''} // Use an empty string instead of null
                                        onChange={handleCustomerChange}
                                        className="select select-bordered"
                                    >
                                        <option value="">Select a customer</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {`${customer.name} - ${customer.phone}`}
                                            </option>
                                        ))}
                                    </select>




                            </div>
                            <div className="flex mb-3">
                                <div className="form-control w-1/2 mr-2">
                                    <label className="label">
                                        <span className="label-text">Cashier</span>
                                    </label>
                                    <select
                                        value={cashierId}
                                        onChange={(e) => setCashierId(e.target.value)}
                                        className="select select-bordered"
                                        required
                                    >
                                        <option value="">-- Select Cashier --</option>


                                        {cashiers.map(cashier => (

                                        {cashiers.map((cashier) => (


                                        {cashiers.map((cashier) => (

                                            <option key={cashier.id} value={cashier.id}>
                                                {cashier.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control w-1/2 ml-2">
                                    <label className="label">
                                        <span className="label-text">Technician</span>
                                    </label>
                                    <select
                                        value={technicianId}
                                        onChange={(e) => setTechnicianId(e.target.value)}
                                        className="select select-bordered"
                                        required
                                    >
                                        <option value="">-- Select Technician --</option>


                                        {technicians.map(technician => (

                                        {technicians.map((technician) => (


                                        {technicians.map((technician) => (

                                            <option key={technician.id} value={technician.id}>
                                                {technician.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-control mb-3 mt-8">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={underWarranty}
                                        onChange={() => setUnderWarranty(!underWarranty)}
                                        className="checkbox mr-2"
                                    />
                                    <label className="label mr-4">
                                        <span className="label-text">Under Warranty</span>
                                    </label>
                                    {underWarranty && (
                                        <>
                                            <input
                                                type="number"


                                                value={warrantyDuration} // Will be empty when not set
                                                onChange={(e) => {
                                                    const value = e.target.value === '' ? '' : Math.max(0, Math.min(99, parseInt(e.target.value, 10)));
                                                    setWarrantyDuration(value); // Allow empty or set to a number
                                                }}
                                                className="input input-bordered mr-2"
                                                max="99" // Optional: Limits input to 99 in the UI



                                                value={warrantyDuration || ''} // Allow empty or set to a number
                                                onChange={(e) => {
                                                    const value = e.target.value === '' ? '' : Math.max(0, Math.min(99, parseInt(e.target.value, 10)));
                                                    setWarrantyDuration(value);
                                                }}
                                                className="input input-bordered mr-2"
                                                max="99"




                                            />
                                            <select
                                                value={warrantyUnit}
                                                onChange={(e) => setWarrantyUnit(e.target.value)}
                                                className="select select-bordered"
                                            >
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                            </select>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Notes</span>
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="textarea textarea-bordered"
                                    placeholder="Enter any additional notes"
                                ></textarea>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Repair Type</span>
                                </label>
                                <select
                                    value={repairType}
                                    onChange={(e) => setRepairType(e.target.value)}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Repair Type --</option>
                                    <option value="screen">Screen Replacement</option>
                                    <option value="battery">Battery Replacement</option>


                                    <option value="camera">Camera Repairs </option>

                                    <option value="camera">Camera Repairs</option>


                                    <option value="camera">Camera Repairs</option>

                                    <option value="charging_port">Charging Port Repairs</option>
                                    <option value="speaker_microphone">Speaker/Microphone Repairs</option>
                                    <option value="button">Button Replacements</option>
                                    <option value="water_damage">Water Damage Restoration</option>
                                    <option value="signal">Signal Repairs</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Service Type</span>
                                </label>
                                <select
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Service Type --</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Diagnostic">Diagnostic</option>
                                </select>
                            </div>
                        </div>
                    </div>

                <div className="flex justify-center mb-2 mt-2 space-x-4">
                    <div className="form-control">
                        <button
                            type="button"
                            className="btn btn-secondary w-80"


                            onClick={() => {
                                setCompletenessModalOpen(true);
                            }}

                            onClick={() => setCompletenessModalOpen(true)}


                            onClick={() => setCompletenessModalOpen(true)}

                        >
                            Completeness
                        </button>
                    </div>
                </div>

                    {/* Spacing for separation */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* Payment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Sub Total</span>
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(parseFloat(subTotal.replace(/[^0-9]/g, "")) || 0, false)}
                                onChange={handleSubTotalChange}
                                className="input input-bordered"
                                placeholder="Enter subtotal"
                                required
                            />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text">Down Payment</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={downPayment}
                                    onChange={handleDownPaymentChange}
                                    placeholder="Enter Down Payment"
                                    className="input input-bordered flex-grow"
                                    required
                                />
                                <label className="flex items-center ml-2">
                                    <input
                                        type="checkbox"
                                        checked={isPaidOff}
                                        onChange={() => setIsPaidOff(!isPaidOff)}
                                        className="checkbox"
                                    />
                                    <span className="ml-1">Paid Off</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Total</span>
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(total)}
                                readOnly
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Remaining Payment</span>
                            </label>
                            <input
                                type="text"
                                value={remaining === 'Paid' ? 'Paid' : formatCurrency(remaining)}
                                readOnly
                                className={`input input-bordered ${remaining === 'Paid' ? 'text-green-600' : ''}`} // Greenish color for "Paid"
                            />
                        </div>
                    </div>
                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text text-green-600">Payment Type</span>
                        </label>
                        <select
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="">-- Select Payment Type --</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="E-Wallets">E-Wallets</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cardless Credit">Cardless Credit</option>
                        </select>
                    </div>
                <div className="flex justify-center mb-3 mt-6 space-x-4">
                    <div className="form-control">
                        <button
                            type="button"
                            className="btn btn-secondary w-80"


                            onClick={() => {
                                setPrintModalOpen(true);
                            }}

                            onClick={() => setPrintModalOpen(true)}


                            onClick={() => setPrintModalOpen(true)}

                        >
                            Print
                        </button>
                    </div>
                </div>

                    <div className="modal-action flex justify-end">
                        <button type="button" onClick={onClose} className="btn">Close</button>
                        <button type="submit" className="btn btn-primary ml-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceFormModal;
