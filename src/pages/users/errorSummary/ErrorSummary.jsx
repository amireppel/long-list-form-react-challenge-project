import { Typography } from '@mui/material';
import { memo } from 'react';
import { useUsersContext } from '../../../context/usersContext';
import styles from '../users.module.css';

const ErrorSummary = memo(() => {
  const { fieldErrors  } = useUsersContext();

  const getErrorCounts = () => {
    if (!fieldErrors) return { emptyCount: 0, invalidCount: 0 };
    
    let emptyCount = 0;
    let invalidCount = 0;
    
    Object.values(fieldErrors).forEach(userErrors => {
      if (!userErrors) return;
      
      Object.values(userErrors).forEach(field => {
        if (!field.isValid) {
          if (field.type === 'empty') {
            emptyCount++;
          } else if (field.type === 'invalid') {
            invalidCount++;
          }
        }
      });
    });
    
    return { emptyCount, invalidCount };
  };

  const { emptyCount, invalidCount } = getErrorCounts();
  const hasErrors = emptyCount > 0 || invalidCount > 0;

  if (!hasErrors) return null;

  return (
    <div className={styles.errorSummary}>
      <Typography color="error" variant="body2" sx={{ padding: '8px' }}>
        {emptyCount > 0 && 
          `${emptyCount} empty field${emptyCount > 1 ? 's' : ''}`
        }
        {emptyCount > 0 && invalidCount > 0 && ' and '}
        {invalidCount > 0 &&
          `${invalidCount} invalid field${invalidCount > 1 ? 's' : ''}`
        }
      </Typography>
    </div>
  );
});

ErrorSummary.displayName = 'ErrorSummary';
export default ErrorSummary;