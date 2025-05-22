import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = memo(({ handleClick }) => {
  return (
    <StyledIconButton 
      aria-label="delete" 
      size="large"
      onClick={handleClick} // Removed unnecessary arrow function wrapper
    >
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
});

TrashIconButton.displayName = 'TrashIconButton'; // Added for better debugging
TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
