import { Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import ErrorSummary from '../errorSummary/ErrorSummary';
import styles from '../users.module.css';

function UsersList({handleOpenModal}) {
  const { usersData, loading } = useUsersContext();

  const Row = ({ index, style }) => (
    <div style={{
      ...style,
      paddingTop: '8px',
      paddingBottom: '8px'
    }}>
      <UserRow user={usersData[index]} />
    </div>
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({usersData.length})</Typography>
        <AddButton handleClick={handleOpenModal} />
      </div>
      <div className={styles.usersListContent}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            Loading...
          </div>
        ) : (
          <FixedSizeList
            height={800}  
            width="100%"
            itemCount={usersData.length}
            itemSize={80}
            overscanCount={5}
          >
            {Row}
          </FixedSizeList>
        )}
      </div>
      <ErrorSummary />
    </div>
  );
}

export default UsersList;