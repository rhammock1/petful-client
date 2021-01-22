import React from 'react';

const PetContext = React.createContext({
  topPets: {},
  person: '',
  thankYouMeme: '',
  realPerson: '',
  handleAdopt: () => {},
  error: null,
})

export default PetContext;