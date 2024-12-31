import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; // Make sure to install axios
import CompletenessModal from "./CompletenessModal";
import NewCustomerModal from "./NewCustomerModal";
import PrintModal from "./PrintModal"; // Import the PrintModal

const ServiceFormModal = ({ isOpen, onClose, onAddRepair }) => {
    // State declarations
    const [entryDate, setEntryDate] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [cashierId, setCashierId] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [phoneBrand, setPhoneBrand] = useState('');
    const [phoneModel, setPhoneModel] = useState('');
    const [imeiSn1, setImeiSn1] = useState('');
    const [imeiSn2, setImeiSn2] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [underWarranty, setUnderWarranty] = useState(false);
    const [warrantyDuration, setWarrantyDuration] = useState(0);
    const [notes, setNotes] = useState('');
    const [repairType, setRepairType] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [deviceBrandOther, setDeviceBrandOther] = useState('');
    const [isOtherBrand, setIsOtherBrand] = useState(false);
    const [completeness, setCompleteness] = useState({
        simTray: false,
        simCard: false,
        softCase: false,
        memoryCard: false,
        box: false,
        charger: false,
    });

    const [isNewCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
    const [isCompletenessModalOpen, setCompletenessModalOpen] = useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = useState(false);
    const modalRef = useRef(null);

    // State for dropdown data
    const [customers, setCustomers] = useState([]);
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    // Pricing states
    const [subTotal, setSubTotal] = useState(0);
    const [voucher, setVoucher] = useState('');
    const [downPayment, setDownPayment] = useState(0);
    const [total, setTotal] = useState(0);
    const [paymentType, setPaymentType] = useState('');

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEntryDate(currentDate);
    }, []);

    useEffect(() => {
        const calculatedTotal = Math.max(0, subTotal - downPayment);
        setTotal(calculatedTotal);
    }, [subTotal, downPayment]);

    useEffect(() => {
        if (isOpen) {
            // Fetch customers, cashiers, and technicians when the modal opens
            fetchCustomers();
            fetchCashiers();
            fetchTechnicians();
        }
    }, [isOpen]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers'); // Adjust the endpoint as needed
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchCashiers = async () => {
        try {
            const response = await axios.get('/api/cashiers'); // Adjust the endpoint as needed
            setCashiers(response.data);
        } catch (error) {
            console.error('Error fetching cashiers:', error);
        }
    };

    const fetchTechnicians = async () => {
        try {
            const response = await axios.get('/api/technicians'); // Adjust the endpoint as needed
            setTechnicians(response.data);
        } catch (error) {
            console.error('Error fetching technicians:', error);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRepair = {
            entry_date: entryDate,
            customer_id: customerId,
            cashier_id: cashierId,
            technician_id: technicianId,
            phone_brand: isOtherBrand ? deviceBrandOther : phoneBrand,
            phone_model: phoneModel,
            imei_sn_1: imeiSn1,
            imei_sn_2: imeiSn2,
            damage_description: damageDescription,
            under_warranty: underWarranty,
            warranty_duration: warrantyDuration,
            notes: notes,
            repair_type: repairType,
            service_type: serviceType,
            voucher: voucher,
            completeness: completeness,
            total_price: total,
            payment_type: paymentType,
            invoice_number: generateInvoiceNumber(),
        };

        onAddRepair(newRepair);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setEntryDate('');
        setCustomerId('');
        setCashierId('');
        setTechnicianId('');
        setPhoneBrand('');
        setPhoneModel('');
        setImeiSn1('');
        setImeiSn2('');
        setDamageDescription('');
        setUnderWarranty(false);
        setWarrantyDuration(0);
        setNotes('');
        setRepairType('');
        setServiceType('');
        setDeviceBrandOther('');
        setSubTotal(0);
        setVoucher('');
        setDownPayment(0);
        setTotal(0);
        setPaymentType('');
    };

    const handleNewCustomer = () => {
        setNewCustomerModalOpen(true);
    };

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, { id: Date.now().toString(), ...newCustomer }]);
    };

    const handleCustomerChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleCashierChange = (e) => {
        setCashierId(e.target.value);
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box max-w-5xl w-full p-4" ref={modalRef}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{generateInvoiceNumber()}</h3>
                    <button
                        className="btn btn-primary"
                        onClick={handleNewCustomer}
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
                                    <span className="label-text">Cashier</span>
                                </label>
                                <select
                                    value={cashierId}
                                    onChange={handleCashierChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Cashier --</option>
                                    {cashiers.map(cashier => (
                                        <option key={cashier.id} value={cashier.id}>
                                            {cashier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Phone Brand</span>
                                </label>
                                <select
                                    value={phoneBrand}
                                    onChange={(e) => {
                                        setPhoneBrand(e.target.value);
                                        setIsOtherBrand(e.target.value === 'other');
                                    }}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Brand --</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                    <option value="other">Other</option>
                                </select>
                                {isOtherBrand && (
                                    <input
                                        type="text"
                                        value={deviceBrandOther}
                                        onChange={(e) => setDeviceBrandOther(e.target.value)}
                                        placeholder="Specify other brand"
                                        className="input input-bordered mt-2"
                                        required
                                    />
                                )}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Phone Model</span>
                                </label>
                                <input
                                    type="text"
                                    value={phoneModel}
                                    onChange={(e) => setPhoneModel(e.target.value)}
                                    placeholder="ex: Note 5 Pro"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">IMEI / SN 1</span>
                                </label>
                                <input
                                    type="text"
                                    value={imeiSn1}
                                    onChange={(e) => setImeiSn1(e.target.value)}
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
                                    onChange={(e) => setImeiSn2(e.target.value)}
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
                                <select
                                    value={customerId}
                                    onChange={handleCustomerChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Customer --</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Technician</span>
                                </label>
                                <select
                                    value={technicianId}
                                    onChange={handleTechnicianChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Technician --</option>
                                    {technicians.map(technician => (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Under Warranty</span>
                                </label>
                                <input
                                    type="checkbox"
                                    checked={underWarranty}
                                    onChange={() => setUnderWarranty(!underWarranty)}
                                    className="checkbox"
                                />
                            </div>
                            {underWarranty && (
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Warranty Duration (days)</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={warrantyDuration}
                                        onChange={(e) => {
                                            const value = Math.max(0, e.target.value);
                                            setWarrantyDuration(value);
                                        }}
                                        className="input input-bordered"
 required
                                    />
                                </div>
                            )}
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

                    {/* Spacing for separation */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* Payment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Sub Total</span>
                            </label>
                            <input
                                type="number"
                                value={subTotal}
                                onChange={(e) => setSubTotal(Math.max(0, e.target.value))}
                                className="input input-bordered"
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
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Math.max(0, e.target.value))}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Total</span>
                            </label>
                            <input
                                type="number"
                                value={total}
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
                            <option value="Debit Card">Debit Card</option>
                            <option value="Mobile Payment">Mobile Payment</option>
                        </select>
                    </div>

                    {/* Completeness and Print Modal Buttons */}
                    <div className="flex justify-between mb-3">
                        <div className="form-control w-full mr-2">
                            <button
                                type="button"
                                className="btn btn-secondary w-full"
                                onClick={() => setCompletenessModalOpen(true)}
                            >
                                Devices Completeness Details
                            </button>
                        </div>
                        <div className="form-control w-full ml-2">
                            <button
                                type="button"
                                className="btn btn-secondary w-full"
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

            {/* Completeness Modal */}
            {isCompletenessModalOpen && (
                <CompletenessModal
                    isOpen={isCompletenessModalOpen}
                    onClose={() => setCompletenessModalOpen(false)}
                    onChange={setCompleteness}
                    initialCompleteness={completeness}
                />
            )}

            {/* Print Modal */}
            {isPrintModalOpen && (
                <PrintModal
                    isOpen={isPrintModalOpen}
                    onClose={() => setPrintModalOpen(false)}
                    onPrint={handlePrint}
                />
            )}

            {/* New Customer Modal */}
            <NewCustomerModal
                isOpen={isNewCustomerModalOpen}
                onClose={() => setNewCustomerModalOpen(false)}
                onAddCustomer={handleAddCustomer}
            />
        </div>
    );
};

export default ServiceFormModal;
