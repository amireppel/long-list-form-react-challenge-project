import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validateEmail, validatePhoneNumber, validateName, validateCountry } from '../utils/validator';
import AutocompleteField from './AutocompleteField';
import countries from '../data/countries.json';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  
const titleStyle = {
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 500
};

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  width: '100%'
});

const CreateModal = ({ open, handleClose, handleCreate }) => {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: ''
    });
    setErrors({});
  };

  const onClose = () => {
    resetForm();
    handleClose();
  };


  
    const validateForm = () => {
      const newErrors = {};
      
      if (!validateName(formData.name)) {
        newErrors.name = 'Name is required';
      }
      
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      
      if (!validatePhoneNumber(formData.phone)) {
        newErrors.phone = 'Valid phone number is required (+XXX followed by digits)';
      }
  
      if (!validateCountry(formData.country)) {
        newErrors.country = 'Country is required';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          handleCreate({
            ...formData,
            id: Math.random().toString(36).substr(2, 9)
          });
          resetForm();
          handleClose();
        }
      };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="create-user-modal"
    >
      <Box sx={style}>
        <h2 id="create-user-modal" style={titleStyle}>Add New User</h2>
        <form onSubmit={handleSubmit}>
        <StyledTextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <StyledTextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <StyledTextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <AutocompleteField
            name="country"
            label="Country"
            placeholder="Select a country"
            options={countries}
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};


export default CreateModal;

