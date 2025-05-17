import React, { useState } from "react";



import PropTypes from "prop-types";


import PropTypes from "prop-types";

import ServiceFormModal from "./ServiceFormModal";
import NewCustomerModal from "./NewCustomerModal";
import CompletenessModal from "./CompletenessModal";
import PrintModal from "./PrintModal";


import RepairDetailModal from "./RepairDetailModal"; // Import the RepairDetailModal

import RepairDetailModal from "./RepairDetailModal";


import RepairDetailModal from "./RepairDetailModal";


const ModalParent = ({
    isServiceFormModalOpen,
    setServiceFormModalOpen,
    isRepairDetailModalOpen,
    setRepairDetailModalOpen,


    selectedRepair,
    onFormSubmit,
    currentRepair, // Add currentRepair prop
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



    currentRepair,
    onFormSubmit,
    setCompletenessModalOpen,
    setPrintModalOpen,
    completenessModalOpen,
    printModalOpen,
    completeness,
    setCompleteness,
    newCustomerModalOpen,
    setNewCustomerModalOpen,
}) => {
    const [customers, setCustomers] = useState([]); // State to manage customers

    const handleAddCustomer = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]); // Add new customer to the list
    };





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

            .filter((key) => completeness[key])
            .map((key) => completenessMapping[key])
            .join(", ");


            .filter((key) => completeness[key])
            .map((key) => completenessMapping[key])
            .join(", ");

    };

    return (
        <div>


            <ServiceFormModal
                isOpen={isServiceFormModalOpen}
                onClose={() => setServiceFormModalOpen(false)}
                onAddRepair={handleAddRepair}
                currentRepair={currentRepair} // Pass current repair data to ServiceFormModal
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
            />



            {isServiceFormModalOpen && (
                <ServiceFormModal
                    isOpen={isServiceFormModalOpen}
                    onClose={() => setServiceFormModalOpen(false)}
                    onAddRepair={onFormSubmit}
                    currentRepair={currentRepair}
                    setCompletenessModalOpen={setCompletenessModalOpen}
                    setPrintModalOpen={setPrintModalOpen}
                    setCustomers={setCustomers} // Pass the state updater function
                    customers={customers}
                    setNewCustomerModalOpen={setNewCustomerModalOpen}
                />
            )}
            {newCustomerModalOpen && (
                <NewCustomerModal
                    isOpen={newCustomerModalOpen}
                    onClose={() => setNewCustomerModalOpen(false)}
                    onAddCustomer={handleAddCustomer} // Pass the handler to add a new customer
                />
            )}
            {completenessModalOpen && (
                <CompletenessModal
                    isOpen={completenessModalOpen}
                    onClose={() => setCompletenessModalOpen(false)}
                    initialCompleteness={completeness}
                    onChange={setCompleteness}
                />
            )}
            {printModalOpen && (
                <PrintModal
                    isOpen={printModalOpen}
                    onClose={() => setPrintModalOpen(false)}
                />
            )}
            {isRepairDetailModalOpen && (
                <RepairDetailModal
                    isOpen={isRepairDetailModalOpen}
                    onClose={() => setRepairDetailModalOpen(false)}
                />
            )}




        </div>
    );
};



export default ModalParent;



// PropTypes for type checking
ModalParent.propTypes = {
    isServiceFormModalOpen: PropTypes.bool.isRequired,
    setServiceFormModalOpen: PropTypes.func.isRequired,
    isRepairDetailModalOpen: PropTypes.bool.isRequired,
    setRepairDetailModalOpen: PropTypes.func.isRequired,
    currentRepair: PropTypes.object,
    onFormSubmit: PropTypes.func.isRequired,
    setCompletenessModalOpen: PropTypes.func.isRequired,
    setPrintModalOpen: PropTypes.func.isRequired,
    setNewCustomerModalOpen: PropTypes.func.isRequired,
    completenessModalOpen: PropTypes.bool.isRequired,
    printModalOpen: PropTypes.bool.isRequired,
    newCustomerModalOpen: PropTypes.bool.isRequired,
    completeness: PropTypes.object.isRequired,
    setCompleteness: PropTypes.func.isRequired,
};


export default ModalParent;


export default ModalParent;

