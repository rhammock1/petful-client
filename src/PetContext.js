import React from 'react';

const PetContext = React.createContext({
  topPets: {},
  person: '',
  adopted: false,
  realPerson: '',
  handleAdopt: () => {},
  error: null,
  message: '',
})

export default PetContext;