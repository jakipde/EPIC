import React from 'react';

const DataTable = ({ headers, data, onRowClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full border border-gray-300">
                {/* head */}
                <thead>
                    <tr className="bg-gray-200">
                        {headers.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-black">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover cursor-pointer" onClick={() => onRowClick(row)}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-300 px-4 py-2">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
