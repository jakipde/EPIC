import React, { useState } from 'react';

const DataTable = ({ headers, data, onRowClick }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
        if (onRowClick) {
            onRowClick(row); // Call the provided row click handler if needed
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full border border-gray-300">
                {/* head */}
                <thead>
                    <tr className="bg-gray-200">
                        {headers.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover cursor-pointer" onClick={() => handleRowClick(row)}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-300 px-4 py-2">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && selectedRow && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Details</h2>
                        {/* Display details based on selectedRow */}
                        {Object.entries(selectedRow).map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {value}</p>
                        ))}
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
