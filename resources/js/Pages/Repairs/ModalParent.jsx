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
        console.log("New customer added:", newCustomer);
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
