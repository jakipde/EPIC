import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceFormModal from './ServiceFormModal';
import NewCustomerModal from './NewCustomerModal';
import CompletenessModal from './CompletenessModal';
import PrintModal from './PrintModal';
import RepairDetailModal from './RepairDetailModal';

const ModalParent = ({
    isServiceFormModalOpen,
    setServiceFormModalOpen,
    isRepairDetailModalOpen,
    setRepairDetailModalOpen,
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
    const [customers, setCustomers] = useState([]);

    const handleAddCustomer = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
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
            .filter((key) => completeness[key])
            .map((key) => completenessMapping[key])
            .join(", ");
    };

    return (
        <div>
            {/* Service Form Modal */}
            <ServiceFormModal
                isOpen={isServiceFormModalOpen}
                onClose={() => setServiceFormModalOpen(false)}
                onAddRepair={onFormSubmit}
                currentRepair={currentRepair}
                setCompletenessModalOpen={setCompletenessModalOpen}
                setPrintModalOpen={setPrintModalOpen}
                setNewCustomerModalOpen={setNewCustomerModalOpen}
                customers={customers}
                setCustomers={setCustomers}
                completeness={completeness}
                selectedCustomerId={currentRepair?.customer_id || ''}
            />

            {/* New Customer Modal */}
            <NewCustomerModal
                isOpen={newCustomerModalOpen}
                onClose={() => setNewCustomerModalOpen(false)}
                onAddCustomer={handleAddCustomer}
            />

            {/* Completeness Modal */}
            <CompletenessModal
                isOpen={completenessModalOpen}
                onClose={() => setCompletenessModalOpen(false)}
                initialCompleteness={completeness}
                onChange={setCompleteness}
            />

            {/* Print Modal */}
            <PrintModal
                isOpen={printModalOpen}
                onClose={() => setPrintModalOpen(false)}
            />

            {/* Repair Detail Modal */}
            <RepairDetailModal
                isOpen={isRepairDetailModalOpen}
                onClose={() => setRepairDetailModalOpen(false)}
                repair={currentRepair}
                completeness={formatCompleteness(completeness)}
            />
        </div>
    );
};

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