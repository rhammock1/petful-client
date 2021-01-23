import React from 'react';

const PetContext = React.createContext({
  topPets: {},
  person: '',
  adopted: false,
  realPerson: '',
  handleAdopt: () => {},
  error: null,
  message: '',
  canAdopt: false,
})

export default PetContext;