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
        setSelectedCustomerId(newCustomer.id); // Automatically select the new customer
        setNewCustomerModalOpen(false); // Close new customer modal
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
                setCompletenessModalOpen={setCompletenessModalOpen}
                setPrintModalOpen={setPrintModalOpen}
                customers={customers} // Pass customers
                setCustomers={setCustomers} // Pass setter function
                selectedCustomerId={selectedCustomerId} // Pass selected customer ID
                setSelectedCustomerId={setSelectedCustomerId} // Pass setter function for selected customer ID
            />

            <NewCustomerModal
                isOpen={isNewCustomerModalOpen}
                onClose={() => setNewCustomerModalOpen(false)}
                onAddCustomer={handleAddCustomer}
            />

            <CompletenessModal
                isOpen={isCompletenessModalOpen}
                onClose={() => setCompletenessModalOpen(false)}
                onChange={setCompleteness}
                initialCompleteness={completeness}
            />

            <PrintModal
                isOpen={isPrintModalOpen}
                onClose={() => setPrintModalOpen(false)}
                onPrint={handlePrint}
            />
        </div>
    );
};

export default ModalParent;
