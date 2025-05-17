import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';

const ServiceFormModal = ({
  isOpen,
  onClose,
  onAddRepair,
  setNewCustomerModalOpen,
  setPrintModalOpen,
  setCompletenessModalOpen,
  customers = [],
  setCustomers,
  selectedCustomerId,
  completeness,
  currentRepair,
}) => {
  // Form state
  const [formState, setFormState] = useState({
    entryDate: new Date().toISOString().split('T')[0],
    customerId: selectedCustomerId || '',
    customerPhone: '',
    cashierId: null,
    technicianId: null,
    selectedBrand: null,
    selectedDevice: null,
    phoneBrand: '',
    phoneDevice: '',
    imeiSn1: '',
    imeiSn2: '',
    damageDescription: '',
    underWarranty: false,
    warrantyDuration: '',
    warrantyUnit: 'days',
    notes: '',
    repairType: '',
    serviceType: '',
    subTotal: '0',
    downPayment: '',
    total: 0,
    remaining: 0,
    isPaidOff: false,
    paymentType: ''
  });

  // Dropdown data
  const [dropdownData, setDropdownData] = useState({
    cashiers: [],
    technicians: [],
    brands: [],
    devices: []
  });

  const paymentMethods = {
    Cash: { tax: 0 },
    'Bank Transfer': { tax: 0, fixedFee: 4000 },
    'E-Wallets': { tax: 0.02 },
    'Credit Card': { tax: 0.029, fixedFee: 2000 },
    'Cardless Credit': { tax: 0.02 }
  };

  // Initialize form with current repair data
  useEffect(() => {
    if (isOpen) {
      if (currentRepair) {
        setFormState(prev => ({
          ...prev,
          entryDate: currentRepair.entry_date || prev.entryDate,
          customerId: currentRepair.customer_id || prev.customerId,
          customerPhone: currentRepair.customer_phone || '',
          cashierId: currentRepair.cashier_id || null,
          technicianId: currentRepair.technician_id || null,
          phoneBrand: currentRepair.phone_brand || '',
          phoneDevice: currentRepair.phone_model || '',
          imeiSn1: currentRepair.imei_sn_1 || '',
          imeiSn2: currentRepair.imei_sn_2 || '',
          damageDescription: currentRepair.damage_description || '',
          underWarranty: currentRepair.under_warranty || false,
          warrantyDuration: currentRepair.warranty_duration || '',
          warrantyUnit: currentRepair.warranty_unit || 'days',
          notes: currentRepair.notes || '',
          repairType: currentRepair.repair_type || '',
          serviceType: currentRepair.service_type || '',
          subTotal: currentRepair.sub_total || '0',
          downPayment: currentRepair.down_payment || '',
          total: currentRepair.total_price || 0,
          paymentType: currentRepair.payment_method || ''
        }));
      }
      fetchCustomers();
      fetchInitialData();
      fetchUsersByRoleName('Cashier');
      fetchUsersByRoleName('Technician');
    }
  }, [isOpen, currentRepair]);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get('/secret.json');
      const { brands, devices } = response.data.root;
      
      setDropdownData(prev => ({
        ...prev,
        brands: brands.map(b => ({ value: b.id, label: b.name })),
        devices: devices.map(d => ({
          value: d.id,
          label: d.name,
          img: d.img,
          description: d.description,
          brandId: d.brand_id
        }))
      }));
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  
  const fetchUsersByRoleName = async (roleName) => {
    try {
      const response = await axios.get(`/api/users?role_name=${roleName}`);
      setDropdownData(prev => ({
        ...prev,
        [roleName.toLowerCase() + 's']: response.data
      }));
    } catch (error) {
      console.error(`Error fetching ${roleName}s:`, error);
    }
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberInput = (e, maxLength) => {
    const { name, value } = e.target;
    const numValue = value.replace(/[^0-9]/g, '');
    if (!maxLength || numValue.length <= maxLength) {
      setFormState(prev => ({ ...prev, [name]: numValue }));
    }
  };

  const handleBrandChange = (selectedOption) => {
    setFormState(prev => ({
      ...prev,
      selectedBrand: selectedOption,
      selectedDevice: null,
      phoneBrand: selectedOption?.label || ''
    }));
  };

  const handleDeviceChange = (selectedOption) => {
    setFormState(prev => ({
      ...prev,
      selectedDevice: selectedOption,
      phoneDevice: selectedOption?.label || ''
    }));
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => c.id === customerId);
    setFormState(prev => ({
      ...prev,
      customerId,
      customerPhone: customer?.phone || ''
    }));
  };

  // Calculate totals
  useEffect(() => {
    const parsedSubTotal = parseInt(formState.subTotal.replace(/[^0-9]/g, ''), 10) || 0;
    const parsedDownPayment = parseInt(formState.downPayment.replace(/[^0-9]/g, ''), 10) || 0;
    
    let calculatedTotal = parsedSubTotal;
    const paymentMethod = paymentMethods[formState.paymentType];

    if (paymentMethod) {
      calculatedTotal += calculatedTotal * paymentMethod.tax + (paymentMethod.fixedFee || 0);
    }

    const remaining = Math.max(0, calculatedTotal - parsedDownPayment);
    
    setFormState(prev => ({
      ...prev,
      total: calculatedTotal,
      remaining: remaining === 0 ? 'Paid' : remaining,
      downPayment: formState.isPaidOff ? calculatedTotal.toString() : prev.downPayment
    }));
  }, [formState.subTotal, formState.downPayment, formState.paymentType, formState.isPaidOff]);

  const formatCurrency = (value) => {
    const number = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
    return `Rp${number.toLocaleString()}`;
  };

  const generateInvoiceNumber = () => {
    const now = new Date();
    return `INV-${[
      now.getDate().toString().padStart(2, '0'),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      now.getFullYear(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ].join('')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const repairData = {
      entry_date: formState.entryDate,
      customer_id: formState.customerId,
      cashier_id: formState.cashierId,
      technician_id: formState.technicianId,
      phone_brand: formState.phoneBrand,
      phone_model: formState.phoneDevice,
      imei_sn_1: formState.imeiSn1,
      imei_sn_2: formState.imeiSn2,
      damage_description: formState.damageDescription,
      under_warranty: formState.underWarranty,
      warranty_duration: formState.warrantyDuration,
      warranty_unit: formState.warrantyUnit,
      notes: formState.notes,
      repair_type: formState.repairType,
      service_type: formState.serviceType,
      total_price: formState.total,
      down_payment: parseInt(formState.downPayment.replace(/[^0-9]/g, ''), 10) || 0,
      completeness: Object.keys(completeness).filter(key => completeness[key]),
      invoice_number: generateInvoiceNumber(),
      sub_total: parseInt(formState.subTotal.replace(/[^0-9]/g, ''), 10) || 0,
      payment_method: formState.paymentType
    };

    try {
      const response = await axios.post('/api/repairs', repairData);
      if (response.data.success) {
        onAddRepair(response.data.repair);
        onClose();
      }
    } catch (error) {
      console.error('Error submitting repair:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-5xl w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{generateInvoiceNumber()}</h3>
          <button className="btn btn-primary" onClick={() => setNewCustomerModalOpen(true)}>
            New Customer
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <div className="form-control mb-3">
                <label className="label">Entry Date</label>
                <input
                  type="date"
                  name="entryDate"
                  value={formState.entryDate}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Phone Brand</label>
                <Select
                  options={dropdownData.brands}
                  onChange={handleBrandChange}
                  value={formState.selectedBrand}
                  placeholder="Select Brand"
                  isClearable
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Phone Model</label>
                <Select
                  options={dropdownData.devices.filter(d => d.brandId === formState.selectedBrand?.value)}
                  onChange={handleDeviceChange}
                  value={formState.selectedDevice}
                  placeholder="Select Model"
                  isClearable
                  isDisabled={!formState.selectedBrand}
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">IMEI / SN 1 (Optional)</label>
                <input
                  type="text"
                  name="imeiSn1"
                  value={formState.imeiSn1}
                  onChange={(e) => handleNumberInput(e, 15)}
                  placeholder="ex: 851591001xxx"
                  className="input input-bordered"
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">IMEI / SN 2 (Optional)</label>
                <input
                  type="text"
                  name="imeiSn2"
                  value={formState.imeiSn2}
                  onChange={(e) => handleNumberInput(e, 15)}
                  placeholder="ex: 8515912328xxx"
                  className="input input-bordered"
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Damage Description</label>
                <textarea
                  name="damageDescription"
                  value={formState.damageDescription}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  placeholder="ex: Screen cracked"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
                <div className="form-control mb-3">
                    <label className="label">Customer</label>
                    <select
                        name="customerId"
                        value={formState.customerId}
                        onChange={handleCustomerChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {`${customer.name} - ${customer.phone}`}
                        </option>
                        ))}
                    </select>
                </div>
              
              <div className="flex mb-3">
                <div className="form-control w-1/2 mr-2">
                  <label className="label">Cashier</label>
                  <select
                    name="cashierId"
                    value={formState.cashierId || ''}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">-- Select Cashier --</option>
                    {dropdownData.cashiers.map(cashier => (
                      <option key={cashier.id} value={cashier.id}>{cashier.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control w-1/2 ml-2">
                  <label className="label">Technician</label>
                  <select
                    name="technicianId"
                    value={formState.technicianId || ''}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">-- Select Technician --</option>
                    {dropdownData.technicians.map(tech => (
                      <option key={tech.id} value={tech.id}>{tech.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-control mb-3 mt-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="underWarranty"
                    checked={formState.underWarranty}
                    onChange={handleChange}
                    className="checkbox mr-2"
                  />
                  <label className="label mr-4">Under Warranty</label>
                  {formState.underWarranty && (
                    <>
                      <input
                        type="number"
                        name="warrantyDuration"
                        value={formState.warrantyDuration}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Math.max(0, Math.min(99, parseInt(e.target.value, 10)));
                          setFormState(prev => ({ ...prev, warrantyDuration: value }));
                        }}
                        className="input input-bordered mr-2"
                        max="99"
                      />
                      <select
                        name="warrantyUnit"
                        value={formState.warrantyUnit}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Notes</label>
                <textarea
                  name="notes"
                  value={formState.notes}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  placeholder="Enter any additional notes"
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Repair Type</label>
                <select
                  name="repairType"
                  value={formState.repairType}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">-- Select Repair Type --</option>
                  <option value="screen">Screen Replacement</option>
                  <option value="battery">Battery Replacement</option>
                  <option value="camera">Camera Repairs</option>
                  <option value="charging_port">Charging Port Repairs</option>
                  <option value="speaker_microphone">Speaker/Microphone Repairs</option>
                  <option value="button">Button Replacements</option>
                  <option value="water_damage">Water Damage Restoration</option>
                  <option value="signal">Signal Repairs</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Service Type</label>
                <select
                  name="serviceType"
                  value={formState.serviceType}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">-- Select Service Type --</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Diagnostic">Diagnostic</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4 space-x-4">
            <button
              type="button"
              className="btn btn-secondary w-80"
              onClick={() => setCompletenessModalOpen(true)}
            >
              Completeness
            </button>
          </div>

          <div className="my-4 border-t border-gray-200"></div>

          {/* Payment Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="form-control">
              <label className="label text-green-600">Sub Total</label>
              <input
                type="text"
                name="subTotal"
                value={formatCurrency(formState.subTotal)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormState(prev => ({ ...prev, subTotal: value || '0' }));
                }}
                className="input input-bordered"
                placeholder="Enter subtotal"
                required
              />
            </div>
            
            <div className="form-control mb-3">
              <label className="label">Down Payment</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="downPayment"
                  value={formatCurrency(formState.downPayment)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    const parsedValue = parseInt(value, 10) || 0;
                    const parsedSubTotal = parseInt(formState.subTotal.replace(/[^0-9]/g, ''), 10) || 0;
                    const newValue = parsedValue <= parsedSubTotal ? value : formState.subTotal;
                    setFormState(prev => ({ ...prev, downPayment: newValue }));
                  }}
                  placeholder="Enter Down Payment"
                  className="input input-bordered flex-grow"
                  required
                />
                <label className="flex items-center ml-2">
                  <input
                    type="checkbox"
                    name="isPaidOff"
                    checked={formState.isPaidOff}
                    onChange={handleChange}
                    className="checkbox"
                  />
                  <span className="ml-1">Paid Off</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="form-control">
              <label className="label text-green-600">Total</label>
              <input
                type="text"
                value={formatCurrency(formState.total)}
                readOnly
                className="input input-bordered"
              />
            </div>
            
            <div className="form-control">
              <label className="label text-green-600">Remaining Payment</label>
              <input
                type="text"
                value={formState.remaining === 'Paid' ? 'Paid' : formatCurrency(formState.remaining)}
                readOnly
                className={`input input-bordered ${formState.remaining === 'Paid' ? 'text-green-600' : ''}`}
              />
            </div>
          </div>
          
          <div className="form-control mb-3">
            <label className="label text-green-600">Payment Type</label>
            <select
              name="paymentType"
              value={formState.paymentType}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="">-- Select Payment Type --</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallets">E-Wallets</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cardless Credit">Cardless Credit</option>
            </select>
          </div>
          
          <div className="flex justify-center my-6 space-x-4">
            <button
              type="button"
              className="btn btn-secondary w-80"
              onClick={() => setPrintModalOpen(true)}
            >
              Print
            </button>
          </div>
          
          <div className="modal-action flex justify-end">
            <button type="button" onClick={onClose} className="btn">Close</button>
            <button type="submit" className="btn btn-primary ml-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ServiceFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddRepair: PropTypes.func.isRequired,
  setNewCustomerModalOpen: PropTypes.func.isRequired,
  setPrintModalOpen: PropTypes.func.isRequired,
  setCompletenessModalOpen: PropTypes.func.isRequired,
  customers: PropTypes.array,
  setCustomers: PropTypes.func.isRequired,
  selectedCustomerId: PropTypes.string,
  completeness: PropTypes.object.isRequired,
  currentRepair: PropTypes.object
};

export default ServiceFormModal;