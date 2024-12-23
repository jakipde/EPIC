import React, { useState, useEffect, useRef } from "react";
import CompletenessModal from "./CompletenessModal";

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
    const modalRef = useRef(null); // Ref for the main modal

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEntryDate(currentDate);
    }, []);

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
        setDeviceBrandOther('');

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box max-w-5xl" ref={modalRef}>
                <h3 className="font-bold text-lg mb-4">Add New Repair</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
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
                                    {/* Add more cashiers as needed */}
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
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">-- Select Customer --</option>
                                    <option value="1">Customer 1</option>
                                    <option value="2">Customer 2</option>
                                    {/* Add more customers as needed */}
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
                                    {/* Add more technicians as needed */}
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
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">Close</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
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
        </div>
    );
};

export default ServiceFormModal;
