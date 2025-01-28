import React, { useState } from "react";
import ServiceFormModal from "./ServiceFormModal";
import NewCustomerModal from "./NewCustomerModal";
import CompletenessModal from "./CompletenessModal";
import PrintModal from "./PrintModal";
import RepairDetailModal from "./RepairDetailModal"; // Import the RepairDetailModal

const ModalParent = ({
    isServiceFormModalOpen,
    setServiceFormModalOpen,
    isRepairDetailModalOpen,
    setRepairDetailModalOpen,
    selectedRepair
}) => {
    const [isNewCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
    const [isCompletenessModalOpen, setCompletenessModalOpen] = useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = useState(false);
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    // Completeness state
    const [completeness, setCompleteness] = useState({
        simTray: false,
        simCard: false,
        softCase: false,
        microSD: false,
        box: false,
        charger: false,
    });

    const completenessMapping = {
        simTray: "SIM Tray",
        simCard: "SIM Card",
        softCase: "Soft Case",
        microSD: "MicroSD",
        box: "Box",
        charger: "Charger (Adaptor or Cable)",
    };

    const formatCompleteness = (completeness) => {
        return Object.keys(completeness)
            .filter(key => completeness[key])
            .map(key => completenessMapping[key])
            .join(', ');
    };

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
                setCustomerPhone={setCustomerPhone}
                setCompletenessModalOpen={setCompletenessModalOpen}
                completeness={completeness}
                setCompleteness={setCompleteness}
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
                initialCompleteness={completeness}
                onChange={setCompleteness}
            />

            <PrintModal
                isOpen={isPrintModalOpen}
                onClose={() => setPrintModalOpen(false)}
            />

            {/* Repair Detail Modal */}
            <RepairDetailModal
                isOpen={isRepairDetailModalOpen}
                onClose={() => setRepairDetailModalOpen(false)}
                repair={selectedRepair} // Pass the selected repair details
            />
        </div>
    );
};

export default ModalParent;
