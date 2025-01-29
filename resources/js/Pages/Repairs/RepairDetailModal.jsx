import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Commet from '@/Components/Loading/Commet'; // Adjust the import path as necessary

const RepairDetailModal = ({ isOpen, onClose, repair, customers, cashiers, technicians }) => {
    const [repairDetails, setRepairDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'Rp0';
        const number = parseFloat(value);
        if (isNaN(number)) return 'Rp0';
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    useEffect(() => {
        if (isOpen && repair && repair.id) {
            const fetchRepairDetails = async () => {
                setLoading(true);
                setError(null);
                setRepairDetails(null);

                try {
                    const response = await axios.get(`/api/repairs/${repair.id}`);
                    const repairData = response.data;

                    const customer = Array.isArray(customers) ? customers.find(c => c.id === repairData.customer_id) : null;
                    const cashier = Array.isArray(cashiers) ? cashiers.find(c => c.id === repairData.cashier_id) : null;
                    const technician = Array.isArray(technicians) ? technicians.find(t => t.id === repairData.technician_id) : null;

                    setRepairDetails({
                        ...repairData,
                        customerName: customer ? customer.name : 'N/A',
                        cashierName: cashier ? cashier.name : 'N/A',
                        technicianName: technician ? technician.name : 'N/A',
                        total_price: formatCurrency(repairData.total_price),
                        down_payment: formatCurrency(repairData.down_payment),
                        remaining_payment: formatCurrency(repairData.remaining_payment),
                    });
                } catch (error) {
                    const errorMessage = error.response ? error.response.data : error.message;
                    setError(`Error loading repair details: ${errorMessage}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchRepairDetails();
        }
    }, [isOpen, repair, customers, cashiers, technicians]);

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <Commet color="#00ff00" size="large" textColor="#000000" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className="modal-box max-w-5xl w-full p-4">
                    <h3 className="font-bold text-lg">Error</h3>
                    <p>{error}</p>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">Close</button>
                    </div>
                </div>
            </div>
        );
    }

    const remainingPaymentValue = parseFloat(repairDetails.remaining_payment.replace(/[^0-9.-]+/g, ""));

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box max-w-5xl w-full p-4">
                <h3 className="font-bold text-lg">Repair Details</h3>
                <div className="mt-4">
                    <p><strong>Entry Date:</strong> <span>{repairDetails.entry_date}</span></p>
                    <p><strong>Invoice Number:</strong> <span>{repairDetails.invoice_number}</span></p>
                    <p><strong>Customer Name:</strong> <span className="text-green-600 font-bold">{repairDetails.customerName}</span></p>
                    <p><strong>Cashier Name:</strong> <span className="text-green-600 font-bold">{repairDetails.cashierName}</span></p>
                    <p><strong>Technician Name:</strong> <span className="text-green-600 font-bold">{repairDetails.technicianName}</span></p>
                    <p><strong>Phone Brand:</strong> <span className="text-blue-600">{repairDetails.phone_brand}</span></p>
                    <p><strong>Phone Model:</strong> <span className="text-blue-600">{repairDetails.phone_model}</span></p>
                    <p><strong>IMEI SN 1:</strong> <span>{repairDetails.imei_sn_1}</span></p>
                    <p><strong>IMEI SN 2:</strong> <span>{repairDetails.imei_sn_2}</span></p>
                    <p><strong>Damage Description:</strong> <span className="text-red-500">{repairDetails.damage_description}</span></p>
                    <p><strong>Under Warranty:</strong> <span className="text-purple-500">{repairDetails.under_warranty ? 'Yes' : 'No'}</span></p>
                    <p><strong>Warranty Duration:</strong> <span className="text-purple-500">{repairDetails.warranty_duration} {repairDetails.warranty_unit}</span></p>
                    <p><strong>Notes:</strong> <span>{repairDetails.notes}</span></p>
                    <p><strong>Repair Type:</strong> <span>{repairDetails.repair_type}</span></p>
                    <p><strong>Service Type:</strong> <span>{repairDetails.service_type}</span></p>
                    <p><strong>Total Price:</strong> <span className="text-purple-700 font-bold">{repairDetails.total_price}</span></p>
                    <p><strong>Down Payment:</strong> <span className="text-purple-500">{repairDetails.down_payment}</span></p>
                    <p><strong>Remaining Payment:</strong> <span className={remainingPaymentValue > 0 ? "text-red-600" : "text-purple-500"}>{repairDetails.remaining_payment}</span></p>
                    <p><strong>Payment Method:</strong> <span>{repairDetails.payment_method}</span></p>
                    <p><strong>Payment Status:</strong> <span className={repairDetails.payment_status === 'In Debt' ? 'text-red-600' : 'text-green-600'}>{repairDetails.payment_status}</span></p>
                </div>
                <div className="modal-action">
                    <button type="button" onClick={onClose} className="btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default RepairDetailModal;
