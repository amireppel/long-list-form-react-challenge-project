import { useState, useCallback } from 'react';
import UsersList from './usersList/UsersList';
import CreateModal from '../../components/CreateModal';
import { useUsersContext } from '../../context/usersContext';
import styles from './users.module.css';

function UsersPage() {
  try {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createUser } = useUsersContext();

    const handleOpenModal = useCallback(() => {

      setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    const handleCreateUser = useCallback((userData) => {
      createUser(userData);
      setIsModalOpen(false);
    }, [createUser]);

    return (
      <div className={styles.pageRoot}>
        <div className={styles.pageContentContainer}>
          <UsersList  handleOpenModal={handleOpenModal}/> 
        </div>
        <CreateModal 
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleCreate={handleCreateUser}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in UsersPage:', error);
    return <div>Error loading users page</div>;
  }
}

export default UsersPage;