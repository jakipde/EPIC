import React from 'react';
import { router, Head } from '@inertiajs/react';

const BulkInput = ({ data }) => {
    const handleBulkSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        Inertia.post(route('data-entries.store'), formData);
    };

    return (
        <div>
            <h1>Bulk Data Input</h1>
            <form onSubmit={handleBulkSubmit}>
                <div>
                    <label htmlFor="bulkData">Bulk Data</label>
                    <textarea id="bulkData" name="bulkData" rows="5" required></textarea>
                </div>
                <button type="submit">Submit Bulk Data</button>
            </form>

            {data && data.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default BulkInput;
