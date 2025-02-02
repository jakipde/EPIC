import React from 'react';

const StatusButton = ({ value }) => {
  return (
    <button className={`btn ${value === 'Completed' ? 'btn-success' : 'btn-warning'}`}>
      {value}
    </button>
  );
};

export default StatusButton;
