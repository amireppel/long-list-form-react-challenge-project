import { useState, useCallback, memo } from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import SelectField from '../../../components/SelectField';
import TrashIconButton from '../../../components/TrashIconButton';
import DeleteModal from '../../../components/DeleteModal';
import styles from '../users.module.css';
import { useUsersContext } from '../../../context/usersContext';
import countries from '../../../data/countries.json';

const UserRow = memo(({ user }) => {
  const { updateUser, deleteUser } = useUsersContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guard against null/undefined user
  if (!user) return null;

  const handleDelete = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);


  const handleConfirmDelete = useCallback(() => {
    try {
      deleteUser(user.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, [deleteUser, user.id]);

  const handleClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleChange = useCallback((fieldName, value) => {
    updateUser(user.id, { ...user, [fieldName]: value });
  }, [updateUser, user]);

  return (
    <>
      <Grid 
        container
        spacing={1}
        className={styles.userRow}
        alignItems="center"
        sx={{ 
          minHeight: '64px',
          '& .MuiGrid-item': {
            height: '64px',
            display: 'flex',
            alignItems: 'center',
          }
        }}
      >
        <Grid item xs={2.5}>
          <InputField 
            name="name" 
            label="Name" 
            id={user.id}
            value={user.name} 
            onChangehandler={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <InputField 
            name="email" 
            label="Email" 
            id={user.id}
            value={user.email} 
            onChangehandler={handleChange}
          />
        </Grid>
        <Grid item xs={2.5}>
          <InputField 
            name="phone" 
            label="Phone" 
            id={user.id}
            value={user.phone} 
            onChangehandler={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectField
            name="country"
            label="Country"
            value={user.country}
            onChange={handleChange}
            options={countries}
            placeholder="Select"
          />
        </Grid>
        <Grid item xs={1}>
          <TrashIconButton handleClick={handleDelete} />
        </Grid>
      </Grid>
      <DeleteModal 
        open={isDeleteModalOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        username={user.name || 'this user'}
      />
    </>
  );
});

UserRow.displayName = 'UserRow';

export default UserRow;