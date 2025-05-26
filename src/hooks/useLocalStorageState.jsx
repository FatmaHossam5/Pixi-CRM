import React, { useCallback, useEffect, useState } from 'react'

export default function useLocalStorageState(key,initialValue) {
   // Initialize state with value from localStorage or the provided initial value
   const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null  ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    try {
        if (value !== undefined) {
          localStorage.setItem(key, value);
        }
      } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error);
      }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [value, setValue,remove];
}
