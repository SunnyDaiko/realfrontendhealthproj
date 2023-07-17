import React from 'react';

const PatientContext = React.createContext();

function PatientProvider({ children }) {
  const [patient, setPatient] = React.useState(null);

  const value = { patient, setPatient };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

function usePatient() {
  const context = React.useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}

export { PatientProvider, usePatient };
