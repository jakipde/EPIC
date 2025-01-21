import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import CompletenessModal from './CompletenessModal';

const ServiceFormModal = ({
    isOpen,
    onClose,
    onAddRepair,
    setNewCustomerModalOpen,
    setPrintModalOpen,
    customers,
    setCustomers,
    selectedCustomerId,
}) => {
    // State declarations
    const [entryDate, setEntryDate] = useState('');
    const [customerId, setCustomerId] = useState(selectedCustomerId || '');
    const [customerPhone, setCustomerPhone] = useState('');
    const [cashierName, setCashierName] = useState(''); // Store cashier name
    const [technicianName, setTechnicianName] = useState(''); // Store technician name
    const [cashierId, setCashierId] = useState(null);
    const [technicianId, setTechnicianId] = useState(null);
    const [error, setError] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceImage, setDeviceImage] = useState('');
    const [deviceDescription, setDeviceDescription] = useState('');
    const [imeiSn1, setImeiSn1] = useState('');
    const [imeiSn2, setImeiSn2] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [underWarranty, setUnderWarranty] = useState(false);
    const [warrantyDuration, setWarrantyDuration] = useState('');
    const [warrantyUnit, setWarrantyUnit] = useState('days'); // Default to 'days'
    const [notes, setNotes] = useState('');
    const [repairType, setRepairType] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [completeness, setCompleteness] = useState({
        simTray: false,
        simCard: false,
        softCase: false,
        memoryCard: false,
        box: false,
        charger: false,
    });
    const [isCompletenessModalOpen, setCompletenessModalOpen] = useState(false);

    // State for dropdown data
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [brands, setBrands] = useState([]);
    const [devices, setDevices] = useState([]);

    // Pricing states
    const [subTotal, setSubTotal] = useState(''); // Initialize as an empty string
    const [downPayment, setDownPayment] = useState(''); // Initialize as an empty string
    const [total, setTotal] = useState(0);
    const [voucher, setVoucher] = useState('');
    const [paymentType, setPaymentType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/secret.json'); // Adjust path if necessary
                const result = response.data;

                // Extract brands and devices
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
        if (value.length <= 15) {
            setImeiSn1(value);
        }
    };

    const handleImeiSn2Change = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
        if (value.length <= 15) {
            setImeiSn2(value);
        }
    };

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEntryDate(currentDate);
    }, []);

    useEffect(() => {
        // Ensure subTotal is a string before using replace
        const parsedSubTotal = parseFloat(subTotal.replace(/[^0-9.]/g, "")) || 0; // Parse as float
        const parsedDownPayment = parseFloat(downPayment.replace(/[^0-9.]/g, "")) || 0; // Parse as float
        const calculatedTotal = Math.max(0, parsedSubTotal - parsedDownPayment);
        setTotal(calculatedTotal);
    }, [subTotal, downPayment]);

    const handleSubTotalChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal point
        setSubTotal(value); // Set as a string
    };

    const handleDownPaymentChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal point
        setDownPayment(value); // Set as a string
    };

    const formatCurrency = (value, includeDecimals = false) => {
        return 'Rp' + new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            minimumFractionDigits: includeDecimals ? 2 : 0,
            maximumFractionDigits: includeDecimals ? 2 : 0,
        }).format(value);
    };

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

        const asciiTime = [
            hours.toString().split('').map(char => char.charCodeAt(0)).join(''),
            minutes.toString().split('').map(char => char.charCodeAt(0)).join(''),
            seconds.toString().split('').map(char => char.charCodeAt(0)).join('')
        ].join('');

        return `INV-${day}${month}${year}${asciiTime}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!entryDate || !customerId || !cashierName || !technicianName || !selectedBrand || !selectedDevice || !damageDescription || !repairType || !serviceType) {
            setError("Please fill in all required fields.");
            return;
        }

        const invoiceNumber = generateInvoiceNumber();
        const newRepair = {
            entry_date: entryDate,
            customer_id: customerId,
            cashier_id: cashierId, // Add cashier ID
            technician_id: technicianId, // Add technician ID
            phone_brand: selectedBrand ? selectedBrand.label : '',
            phone_model: selectedDevice ? selectedDevice.label : '',
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
            down_payment: parseFloat(downPayment) || 0,
            completeness: Object.keys(completeness).filter(key => completeness[key]), // Convert completeness to an array of keys where the value is true
            invoice_number: invoiceNumber,
            sub_total: parseFloat(subTotal.replace(/[^0-9.]/g, "")) || 0, // Include subTotal in the newRepair object
        };

        console.log('Submitting repair data:', newRepair);

        try {
            const response = await axios.post('/api/repairs', newRepair);
            if (response.data.success) {
                onAddRepair(response.data.repair);
                resetForm();
                onClose();
            } else {
                setError("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting repair:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
            setError("An error occurred while submitting the form.");
        }
    };

    const resetForm = () => {
        setEntryDate('');
        setCustomerId(selectedCustomerId || '');
        setCustomerPhone('');
        setCashierName(''); // Reset cashier name
        setTechnicianName(''); // Reset technician name
        setSelectedBrand(null);
        setSelectedDevice(null);
        setImeiSn1('');
        setImeiSn2('');
        setDamageDescription('');
        setUnderWarranty(false);
        setWarrantyDuration(0);
        setNotes('');
        setRepairType('');
        setServiceType('');
        setSubTotal(''); // Reset subTotal to an empty string
        setVoucher('');
        setDownPayment(''); // Reset downPayment to an empty string
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
            if (roleName === 'Cashier') {
                setCashiers(response.data);
            } else if (roleName === 'Technician') {
                setTechnicians(response.data);
            }
        } catch (error) {
            console.error(`Error fetching users:`, error.response ? error.response.data : error.message);
            setError(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            {error && <div className="alert alert-danger">{error}</div>}
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
                                <select onChange={handleCustomerChange} value={customerId} className="select select-bordered">
                                    <option value="">Select a customer - {customerPhone}</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {`${customer.name} - ${customer.phone}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between mb-3">
                                <div className="form-control w-full mr-2">
                                    <label className="label">
                                        <span className="label-text">Cashier</span>
                                    </label>
                                    <Select
                                        options={cashiers.map(cashier => ({
                                            value: cashier.id,
                                            label: cashier.name
                                        }))}
                                        onChange={(option) => {
                                            setCashierId(option.value);
                                            setCashierName(option.label); // Store cashier name
                                        }}
                                        placeholder="Select Cashier"
                                    />
                                </div>

                                <div className="form-control w-full ml-2">
                                    <label className="label">
                                        <span className="label-text">Technician</span>
                                    </label>
                                    <Select
                                        options={technicians.map(technician => ({
                                            value: technician.id,
                                            label: technician.name
                                        }))}
                                        onChange={(option) => {
                                            setTechnicianId(option.value);
                                            setTechnicianName(option.label); // Store technician name
                                        }}
                                        placeholder="Select Technician"
                                    />
                                </div>
                            </div>
                            <div className="form-control mb-3 mt-8">
                                <div className ="flex items-center">
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
                                                value={warrantyDuration}
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
                            >
                                Completeness
                            </button>
                        </div>
                    </div>

                    <CompletenessModal
                        isOpen={isCompletenessModalOpen}
                        onClose={() => setCompletenessModalOpen(false)}
                        initialCompleteness={completeness}
                        onChange={setCompleteness}
                    />

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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Voucher</span>
                            </label>
                            <select
                                value={voucher}
                                onChange={(e) => setVoucher(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="">-- Select Voucher --</option>
                                <option value="Voucher 1">Voucher 1</option>
                                <option value="Voucher 2">Voucher 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Down Payment</span>
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(parseFloat(downPayment.replace(/[^0-9]/g, "")) || 0, false)}
                                onChange={handleDownPaymentChange}
                                className="input input-bordered"
                                placeholder="Enter down payment"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Total</span>
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(total, false)} // No decimals for total as well
                                readOnly
                                className="input input-bordered"
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
                            <option value="Credit Card">Credit Card</option>
                            <option value="QR code">QR code</option>
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
