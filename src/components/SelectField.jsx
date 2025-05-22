import { useState } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

import { colors, inputStyles, dimensions, zIndex } from './stylesConfig';

const StyledFormControl = styled(FormControl)(({ isActive }) => ({
  ...inputStyles.base,
  '& .MuiInputLabel-root': inputStyles.label,
  '& .MuiInputBase-root': {
    ...inputStyles.input,
    backgroundColor: isActive ? colors.backgroundActive : colors.background,
    color: colors.text, // Add text color
  },
  '& .MuiSelect-select': {
    padding: dimensions.padding.base,
    color: colors.text,
  },
  '& .MuiSelect-icon': {
    color: colors.text, // Add color for the dropdown icon
  },
  '& .MuiOutlinedInput-notchedOutline': inputStyles.noUnderline,
  position: 'relative',
  zIndex: isActive ? zIndex.active : zIndex.base,
}));

const StyledText = styled('div')({
  ...inputStyles.base,
  padding: '10px',
  marginTop: '20px',
  position: 'relative',
  color: colors.text,
  fontSize: '14px', // Match InputField font size
  
  '&::before': {
    ...inputStyles.label,
    content: 'attr(data-label)',
    position: 'absolute',
    top: '-20px',
    left: '2px',
    fontSize: '12px',
    color: colors.text,
  }
});

const SelectField = ({
  name,
  value,
  onChange,
  options,
  label
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {

    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const handleChange = (event) => {
    onChange(name, event.target.value);
    handleClose();
  };

  if (!isActive) {
    return (
      <div onClick={handleClick}>
        <StyledText
          role="button"
          tabIndex={0}
          data-label={label} // Add this to show the label
        >
          {value || `Select a ${name.toLowerCase()}`}
        </StyledText>
      </div>
    );
  }


  return (
    <StyledFormControl isActive={isActive} variant="outlined">
      <Select
        autoFocus
        open={true}
        value={value || ''}
        onChange={handleChange}
        onClose={handleClose}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            style: {
              maxHeight: 200,
              marginTop: 4,
              zIndex: 1500
            }
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SelectField;
