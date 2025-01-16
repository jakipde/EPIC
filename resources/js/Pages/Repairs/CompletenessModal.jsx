import React, { useEffect } from 'react';

const CompletenessModal = ({ isOpen, onClose, initialCompleteness, onChange }) => {
  if (!isOpen) return null; // Don't render if not open

  // Close modal when clicking outside
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
      onClose(); // Close modal if clicked outside the modal content
    }
  };

  // Close modal when pressing the "Esc" key
  const handleEscKey = (event) => {
    if (event.key === 'Escape') {
      onClose(); // Close modal when "Esc" is pressed
    }
  };

  // Attach event listeners for "Esc" key press and outside click
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckboxChange = (field) => {
    onChange((prevCompleteness) => ({
      ...prevCompleteness,
      [field]: !prevCompleteness[field], // Toggle the checkbox value
    }));
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Set Completeness</h3>

        {/* Grid layout for two columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {['simTray', 'simCard', 'softCase'].map((item) => (
              <div className="form-control mb-3" key={item}>
                <label className="label cursor-pointer">
                  <span className="label-text">{item.replace(/([A-Z])/g, ' $1')}</span>
                  <input
                    type="checkbox"
                    checked={initialCompleteness[item] || false} // Use fallback to avoid undefined error
                    onChange={() => handleCheckboxChange(item)}
                    className="checkbox"
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {['memoryCard', 'box', 'charger'].map((item) => (
              <div className="form-control mb-3" key={item}>
                <label className="label cursor-pointer">
                  <span className="label-text">{item.replace(/([A-Z])/g, ' $1')}</span>
                  <input
                    type="checkbox"
                    checked={initialCompleteness[item] || false} // Use fallback to avoid undefined error
                    onChange={() => handleCheckboxChange(item)}
                    className="checkbox"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CompletenessModal;
