import React, { useState } from "react";
import ServiceFormModal from "./ServiceFormModal";
import NewCustomerModal from "./NewCustomerModal";
import CompletenessModal from "./CompletenessModal";
import PrintModal from "./PrintModal";

const ModalParent = ({ isServiceFormModalOpen, setServiceFormModalOpen }) => {
    const [isNewCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
    const [isCompletenessModalOpen, setCompletenessModalOpen] = useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = useState(false);
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [customerPhone, setCustomerPhone] = useState(''); // State for customer phone
    const [completeness, setCompleteness] = useState({
        simTray: false,
        simCard: false,
        softCase: false,
        memoryCard: false,
        box: false,
        charger: false,
    });

    const handleAddRepair = (repair) => {
        setRepairs((prevRepairs) => [...prevRepairs, repair]);
    };

    const handleAddCustomer = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
        setSelectedCustomerId(newCustomer.id);
        setNewCustomerModalOpen(false);
    };

    const handlePrint = (printType) => {
        console.log(`Printing with type: ${printType}`);
    };

    return (
        <div>
            <ServiceFormModal
                isOpen={isServiceFormModalOpen}
                onClose={() => setServiceFormModalOpen(false)}
                onAddRepair={handleAddRepair}
                setNewCustomerModalOpen={setNewCustomerModalOpen}
                customers={customers}
                setCustomers={setCustomers}
                selectedCustomerId={selectedCustomerId}
                setSelectedCustomerId={setSelectedCustomerId}
                setCustomerPhone={setCustomerPhone} // Pass the function to set customer phone
            />

            <NewCustomerModal
                isOpen={isNewCustomerModalOpen}
                onClose={() => setNewCustomerModalOpen(false)}
                onAddCustomer={handleAddCustomer}
            />

            {/* Other modals here */}

            {/* Display the customer phone number if selected */}
            {selectedCustomerId && (
                <div>
                    <strong>Customer Phone: </strong>{customerPhone}
                </div>
            )}
        </div>
    );
};

export default ModalParent;
