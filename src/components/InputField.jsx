import { memo, useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { useUsersContext } from '../context/usersContext';
import { colors } from './stylesConfig';

const LabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '4px'
});

const Label = styled('span')({
  fontSize: '12px',
  color: colors.text
});

const ErrorText = styled('span')({
  fontSize: '12px',
  color: 'red'
});

const StyledTextField = styled(TextField)(({ theme, name }) => ({
  width: '100%',
  minWidth: name === 'email' ? '350px' : 'auto', // Force wider width for email
  '& .MuiInputBase-root': {
    width: '100%',
    minWidth: 'inherit',
    borderRadius: '4px',
    backgroundColor: colors.background,
    '&:hover': {
      backgroundColor: '#7f8085',
    },
    '&.Mui-focused': {
      backgroundColor: colors.backgroundActive,
    },
    '&:before, &:after': {
      display: 'none',
    }
  },
  '& .MuiInputBase-input': {
    padding: '10px',
    fontSize: '14px',
    color: colors.text,
    width: '100%',
    minWidth: 'inherit',
    overflow: 'visible', // Changed from hidden
    whiteSpace: 'normal', // Changed from nowrap
    backgroundColor: 'transparent !important',
    '&:focus': {
      backgroundColor: 'transparent !important',
    }
  },
  '& .MuiInput-root': {
    width: '100%',
    minWidth: 'inherit',
    backgroundColor: 'transparent',
  }
}));

const InputField = memo(({
  name,
  value: initialValue,
  onChangehandler,
  placeholder,
  disabled,
  id, 
  label
}) => {
  const [localValue, setLocalValue] = useState(initialValue || '');
  const { validateAndUpdateField, getFieldError, clearFieldError } = useUsersContext();

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(initialValue || '');
  }, [initialValue]);

  const handleBlur = useCallback((e) => {
    const value = e.target.value;
    validateAndUpdateField(id, name, value);
    onChangehandler(name, value);
  }, [id, name, onChangehandler, validateAndUpdateField]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setLocalValue(value);
  
  }, [id, name, clearFieldError]);

  const error = getFieldError(id, name);

  return (
    <div>
      <LabelWrapper>
        <Label>{label}</Label>
        {error && <ErrorText>{error}</ErrorText>}
      </LabelWrapper>
      <StyledTextField
        name={name}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!error}
        disabled={disabled}
        placeholder={placeholder}
        variant="standard"
        size="small"
        fullWidth
        InputProps={{
          autoComplete: 'off',
        }}
      />
    </div>
  );
});

InputField.displayName = 'InputField';

InputField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChangehandler: () => { },
  error: false,
  disabled: false,
  placeholder: '',
}

export default InputField;