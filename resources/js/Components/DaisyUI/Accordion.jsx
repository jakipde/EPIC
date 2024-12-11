// Accordion.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ children }) => {
    return (
        <div className="accordion">
            {children}
        </div>
    );
};

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item border-b">
            <div
                className="accordion-header flex justify-between items-center py-2 cursor-pointer"
                onClick={toggleAccordion}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && toggleAccordion()}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title}`}
            >
                <h2 className="text-lg font-semibold">{title}</h2>
                <span className="text-gray-500">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div
                    id={`accordion-content-${title}`}
                    className="accordion-body py-2"
                    role="region"
                    aria-labelledby={title}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

Accordion.Item = AccordionItem;

Accordion.propTypes = {
    children: PropTypes.node.isRequired,
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Accordion;
