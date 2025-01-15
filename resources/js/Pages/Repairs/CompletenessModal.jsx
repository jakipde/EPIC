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
    onChange({
      ...initialCompleteness,
      [field]: !initialCompleteness[field], // Toggle the checkbox value
    });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Set Completeness</h3>

        {/* Grid layout for two columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">SIM Tray</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.simTray || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('simTray')}
                  className="checkbox"
                />
              </label>
            </div>

            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">SIM Card</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.simCard || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('simCard')}
                  className="checkbox"
                />
              </label>
            </div>

            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">Soft Case</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.softCase || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('softCase')}
                  className="checkbox"
                />
              </label>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">Memory Card</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.memoryCard || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('memoryCard')}
                  className="checkbox"
                />
              </label>
            </div>

            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">Box</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.box || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('box')}
                  className="checkbox"
                />
              </label>
            </div>

            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">Charger</span>
                <input
                  type="checkbox"
                  checked={initialCompleteness.charger || false} // Use fallback to avoid undefined error
                  onChange={() => handleCheckboxChange('charger')}
                  className="checkbox"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletenessModal;
