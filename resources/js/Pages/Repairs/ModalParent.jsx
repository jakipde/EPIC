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

    // Completeness state
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
                setCompletenessModalOpen={setCompletenessModalOpen} // Pass function to open completeness modal
                completeness={completeness} // Pass completeness state
                setCompleteness={setCompleteness} // Pass function to update completeness state
                setPrintModalOpen={setPrintModalOpen} // Pass function to open print modal
            />

            <NewCustomerModal
                isOpen={isNewCustomerModalOpen}
                onClose={() => setNewCustomerModalOpen(false)}
                onAddCustomer={handleAddCustomer}
            />

            {/* Modals */}
            <CompletenessModal
                isOpen={isCompletenessModalOpen}
                onClose={() => setCompletenessModalOpen(false)} // Close completeness modal
                initialCompleteness={completeness} // Pass completeness state here
                onChange={setCompleteness} // Function to update completeness state
            />

            <PrintModal
                isOpen={isPrintModalOpen}
                onClose={() => setPrintModalOpen(false)} // Close print modal
            />
        </div>
    );
};

export default ModalParent;
