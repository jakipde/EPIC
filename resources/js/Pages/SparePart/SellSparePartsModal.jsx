import React from 'react';
import Modal from '@/Components/DaisyUI/Modal';
import Button from '@/Components/DaisyUI/Button';

const SellSparePartsModal = ({ isOpen, onClose, sparePart }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Sell Spare Part</h2>
                {/* Add form fields for selling spare part here */}
                <div className="flex justify-end mt-4">
                    <Button size="sm" type="secondary" className="mr-2" onClick={onClose}>Cancel</Button>
                    <Button size="sm" type="primary">Sell</Button>
                </div>
            </div>
        </Modal>
    );
};

export default SellSparePartsModal;
