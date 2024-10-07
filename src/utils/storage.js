// Save an item to sessionStorage
export const saveToSessionStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Could not save to sessionStorage', error);
    }
  };
  
  // Get an item from sessionStorage
  export const getFromSessionStorage = (key) => {
    try {
      const serializedValue = sessionStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Could not get from sessionStorage', error);
      return null;
    }
  };
  
  // Remove an item from sessionStorage
  export const removeFromSessionStorage = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Could not remove from sessionStorage', error);
    }
  };
  
  // Clear all items from sessionStorage
  export const clearSessionStorage = () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Could not clear sessionStorage', error);
    }
  };
  