import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const useClientContext = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext; // Export the UserContext itself as default
