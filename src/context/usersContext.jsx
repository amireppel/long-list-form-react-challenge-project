import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import data from '../data/initialUsersData.json';
import { validateEmail, validatePhoneNumber, validateName } from '../utils/validator';

const UsersContext = createContext({
  usersData: [],
  loading: false,
  validateAndUpdateField: () => {},
  getFieldError: () => '',
  updateUser: () => {},
  deleteUser: () => {},
  createUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});


  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setUsersData(data);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  const deleteUser = (userId) => {
    setUsersData(prevUsers => prevUsers.filter(user => user.id !== userId));
    setFieldErrors(prevErrors => {
      const { [userId]: _, ...remainingErrors } = prevErrors;
      return remainingErrors;
    });
  };

  const validateAndUpdateField = useCallback((userId, fieldName, value) => {
    if (!value.trim()) {
      setFieldErrors(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          [fieldName]: {
            message: `${fieldName} is required`,
            type: 'empty',
            isValid: false
          }
        }
      }));
      return false;
    }

    let isValid = true;
    switch (fieldName) {
      case 'email':
        isValid = validateEmail(value);
        break;
      case 'phone':
        isValid = validatePhoneNumber(value);
        break;
      case 'name':
        isValid = validateName(value);
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [fieldName]: {
          message: isValid ? '' : `Invalid ${fieldName}`,
          type: isValid ? null : 'invalid',
          isValid
        }
      }
    }));

    // Update user data
    setUsersData(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, [fieldName]: value }
          : user
      )
    );

    return isValid;
  }, []);

  const getFieldError = useCallback((userId, fieldName) => {
    return fieldErrors[userId]?.[fieldName]?.message || '';
  }, [fieldErrors]);

  const clearFieldError = useCallback((userId, fieldName) => {
    setFieldErrors(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [fieldName]: {
          message: '',
          type: null,
          isValid: true
        }
      }
    }));
  }, []);

  const updateUser = useCallback((userId, updatedUser) => {
    setUsersData(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? updatedUser : user
      )
    );
  }, []);

  const createUser = (newUser) => {
    setUsersData(prevUsers => [newUser, ...prevUsers]);
  };
  const value = useMemo(() => ({
    usersData,
    loading,
    validateAndUpdateField,
    getFieldError,
    clearFieldError,
    fieldErrors,
    updateUser,
    deleteUser,
    createUser,
  }), [usersData, loading,fieldErrors, validateAndUpdateField, getFieldError, clearFieldError]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsersContext must be used within a ContextProvider');
  }
  return context;
};

export default UsersContext;