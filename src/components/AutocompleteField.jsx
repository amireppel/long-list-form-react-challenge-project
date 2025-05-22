import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from './stylesConfig';

const Label = styled('label')({
  fontSize: '12px',
  color: colors.text,
  marginBottom: '4px',
  display: 'block',
  height: '16px',
  lineHeight: '16px',
  flex: '0 0 16px', // Add flex-shrink: 0 to prevent shrinking
});

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '76px', // Change from minHeight to fixed height
  '& > *': {
    flex: '0 0 auto', // Prevent children from shrinking
  }
});

const StyledTextField = styled(TextField)({
  width: '100%',
  flex: '1 0 48px', // Add flex properties to maintain height

  '& .MuiInputBase-root': {
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    height: '48px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0, // Prevent shrinking
    '&::before, &::after': {
      display: 'none'
    }
  },

  '& .MuiInputBase-input': {
    height: '24px !important', // Force fixed height with !important
    lineHeight: '24px !important', // Match line-height to height
    padding: '0 8px !important', // Simplify padding
    color: colors.text,
    backgroundColor: 'transparent',
    '&::placeholder': {
      color: '#000000',
      opacity: 1,
      fontWeight: 500,
      transform: 'translateY(0)', // Prevent placeholder from shifting
    }
  },

  '& .MuiAutocomplete-endAdornment': {
    top: '50%',
    right: '8px',
    position: 'absolute',
    transform: 'translateY(-50%)',
    '& .MuiSvgIcon-root': {
      color: colors.text
    }
  }
});

const AutocompleteField = ({ 
  options, 
  value, 
  onChange, 
  error, 
  helperText,
  name,
  placeholder,
  label
}) => {
  const getOptionLabel = (option) => option || '';

  return (
    <Wrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Autocomplete
        key={`autocomplete-${name}`} // Add unique key
        options={options}
        value={value || null}
        getOptionLabel={getOptionLabel}
        onChange={(_, newValue) => {
          onChange({ target: { name, value: newValue } });
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            error={error}
            helperText={helperText}
            variant="standard"
            placeholder={placeholder}
            InputLabelProps={{ shrink: false }}
            id={name}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>{option}</li>
        )}
        noOptionsText="No options found"
        componentsProps={{
          paper: {
            sx: { mt: 1 } // Add margin to dropdown
          }
        }}
      />
    </Wrapper>
  );
};

AutocompleteField.defaultProps = {
  options: [],
  value: null,
  onChange: () => {},
  error: false,
  helperText: '',
  name: '',
  label: '',
  placeholder: 'Select an option'
};

export default AutocompleteField;

