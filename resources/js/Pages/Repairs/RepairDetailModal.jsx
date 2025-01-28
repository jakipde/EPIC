import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Commet from '@/Components/Loading/Commet'; // Adjust the import path as necessary

const RepairDetailModal = ({ isOpen, onClose, repair, customers, cashiers, technicians }) => {
    const [repairDetails, setRepairDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Utility function to format currency
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'Rp0';
        const number = parseFloat(value);
        if (isNaN(number)) return 'Rp0';
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    useEffect(() => {
        if (isOpen && repair && repair.id) {
            const fetchRepairDetails = async () => {
                console.log('Fetching details for repair ID:', repair.id);
                setLoading(true);
                setError(null);
                setRepairDetails(null);

                try {
                    const response = await axios.get(`/api/repairs/${repair.id}`);
                    const repairData = response.data;

                    // Fetch additional data based on IDs in repairData
                    const customer = customers.find(c => c.id === repairData.customer_id);
                    const cashier = cashiers.find(c => c.id === repairData.cashier_id);
                    const technician = technicians.find(t => t.id === repairData.technician_id);

                    // Combine all data into repairDetails
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
                    console.error('Error fetching repair details:', error.response ? error.response.data : error.message);
                    setError('Error loading repair details.');
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 150);
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
                    <p><strong>Entry Date:</strong> <span className="text-purple-500">{repairDetails.entry_date}</span></p>
                    <p><strong>Invoice Number:</strong> <span className="text-purple-500">{repairDetails.invoice_number}</span></p>
                    <p><strong>Customer Name:</strong> <span className="text-purple-500">{repairDetails.customerName}</span></p>
                    <p><strong>Cashier Name:</strong> <span className="text-purple-500">{repairDetails.cashierName}</span></p>
                    <p><strong>Technician Name:</strong> <span className="text-purple-500">{repairDetails.technicianName}</span></p>
                    <p><strong>Phone Brand:</strong> <span className="text-purple-500">{repairDetails.phone_brand}</span></p>
                    <p><strong>Phone Model:</strong> <span className="text-purple-500">{repairDetails.phone_model}</span></p>
                    <p><strong>IMEI SN 1:</strong> <span className="text-purple-500">{repairDetails.imei_sn_1}</span></p>
                    <p><strong>IMEI SN 2:</strong> <span className="text-purple-500">{repairDetails.imei_sn_2}</span></p>
                    <p><strong>Damage Description:</strong> <span className="text-purple-500">{repairDetails.damage_description}</span></p>
                    <p><strong>Under Warranty:</strong> <span className="text-purple-500">{repairDetails.under_warranty ? 'Yes' : 'No'}</span></p>
                    <p><strong>Warranty Duration:</strong> <span className="text-purple-500">{repairDetails.warranty_duration} {repairDetails.warranty_unit}</span></p>
                    <p><strong>Notes:</strong> <span className="text-purple-500">{repairDetails.notes}</span></p>
                    <p><strong>Repair Type:</strong> <span className="text-purple-500">{repairDetails.repair_type}</span></p>
                    <p><strong>Service Type:</strong> <span className="text-purple-500">{repairDetails.service_type}</span></p>
                    <p><strong>Total Price:</strong> <span className="text-purple-500">{repairDetails.total_price}</span></p>
                    <p><strong>Down Payment:</strong> <span className="text-purple-500">{repairDetails.down_payment}</span></p>
                    <p><strong>Remaining Payment:</strong><span className={remainingPaymentValue > 0 ? "text-red-600" : "text-purple-500"}>{repairDetails.remaining_payment}</span></p>
                    <p><strong>Payment Method:</strong> <span className="text-purple-500">{repairDetails.payment_method}</span></p>
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
