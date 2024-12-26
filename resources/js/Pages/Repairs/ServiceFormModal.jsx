import React, { useState, useEffect, useRef } from "react";
import CompletenessModal from "./CompletenessModal";
import PrintModal from "./PrintModal"; // Import the PrintModal
import { HiXMark } from 'react-icons/hi2';

const ServiceFormModal = ({ isOpen, onClose, onAddRepair }) => {
    const [entryDate, setEntryDate] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [cashierId, setCashierId] = useState('');
    const [phoneBrand, setPhoneBrand] = useState('');
    const [phoneModel, setPhoneModel] = useState('');
    const [imeiSn1, setImeiSn1] = useState('');
    const [imeiSn2, setImeiSn2] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [underWarranty, setUnderWarranty] = useState(false);
    const [warrantyDuration, setWarrantyDuration] = useState(0);
    const [notes, setNotes] = useState('');
    const [repairType, setRepairType] = useState('');
    const [serviceType, setServiceType] = useState(''); // New state for Service Type
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

    const [isCompletenessModalOpen, setCompletenessModalOpen] = useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = useState(false); // State for Print Modal
    const modalRef = useRef(null); // Ref for the main modal

    // New state variables for additional fields
    const [subTotal, setSubTotal] = useState(0);
    const [voucher, setVoucher] = useState('');
    const [downPayment, setDownPayment] = useState(0);
    const [total, setTotal] = useState(0);
    const [paymentType, setPaymentType] = useState('');

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEntryDate(currentDate);
    }, []);

    const formatCurrency = (value) => {
        return `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    const generateInvoiceNumber = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = now.getFullYear();

        // Get hours, minutes, and seconds
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Convert time to ASCII values
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
            phone_brand: isOtherBrand ? deviceBrandOther : phoneBrand,
            phone_model: phoneModel,
            imei_sn_1: imeiSn1,
            imei_sn_2: imeiSn2,
            damage_description: damageDescription,
            technician_id: technicianId,
            under_warranty: underWarranty,
            warranty_duration: warrantyDuration,
            notes: notes,
            repair_type: repairType,
            service_type: serviceType,
            sub_total: subTotal,
            voucher: voucher ,
            down_payment: downPayment,
            total: total,
            payment_type: paymentType,
            completeness: completeness,
        };

        onAddRepair(newRepair);

        // Reset form fields
        setEntryDate('');
        setCustomerId('');
        setCashierId('');
        setPhoneBrand('');
        setPhoneModel('');
        setImeiSn1('');
        setImeiSn2('');
        setDamageDescription('');
        setTechnicianId('');
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

        onClose();
    };

    const calculateTotal = () => {
        const calculatedTotal = Math.max(0, subTotal - downPayment);
        setTotal(calculatedTotal);
    };

    const handlePrint = (type) => {
        console.log(`Printing with ${type} printer...`);
        // Here you can add the logic to handle the actual printing
    };

    const handleNewCustomer = () => {
        console.log("New Customer button clicked");
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
                                    onChange={(e) => setCashierId(e.target.value)}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Cashier --</option>
                                    <option value="1">Cashier 1</option>
                                    <option value="2">Cashier 2</option>
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
                                    <span className="label-text">IMEI 1 / SN</span>
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
                                    <span className="label-text">IMEI 2 / SN (Optional)</span>
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
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Customer --</option>
                                    <option value="1">Customer 1</option>
                                    <option value="2">Customer 2</option>
                                </select>
                            </div>
                            <div className="form-control mb-3">
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
                                    <option value="1">Technician 1</option>
                                    <option value="2">Technician 2</option>
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
                                type="text"
                                value={formatCurrency(subTotal)}
                                onChange={(e) => {
                                    const value = Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0);
                                    setSubTotal(value);
                                }}
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
                                type="text"
                                value={formatCurrency(downPayment)}
                                onChange={(e) => {
                                    const value = Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0);
                                    setDownPayment(value);
                                }}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Total</span>
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(total)}
                                readOnly
                                className="input input-bordered"
                                required
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
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Completeness Modal Button */}
                    <div className="form-control mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCompletenessModalOpen(true)}
                        >
                            Devices Completeness Details
                        </button>
                    </div>

                    {/* Print Modal Button */}
                    <div className="form-control mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setPrintModalOpen(true)}
                        >
                            Print
                        </button>
                    </div>

                    <div className="modal-action flex justify-between">
                        <div className="flex space-x-2">
                            <button type="button" onClick={onClose} className="btn">Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
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
        </div>
    );
};

export default ServiceFormModal;
