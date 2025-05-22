import { Modal, Box, Button } from '@mui/material';

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
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  zIndex: 1000,
};

const DeleteModal = ({ open, handleClose, handleConfirm, username }) => {
    const handleConfirmAndClose = () => {
      handleConfirm();
      handleClose();
    };
  
    return (
      <Modal 
        open={open} 
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
      >
        <Box sx={style}>
          <div 
            id="delete-modal-title" 
            style={{ 
              marginBottom: '16px', 
              fontSize: '1.25rem',
              color: 'rgba(0, 0, 0, 0.87)'
            }}
          >
            Are you sure you want to delete details of {username}?
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              No
            </Button>
            <Button onClick={handleConfirmAndClose} variant="contained" color="error">
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
export default DeleteModal;