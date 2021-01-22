import React from 'react';

const PetContext = React.createContext({
  topPets: {},
  person: '',
  thankYouMeme: '',
  realPerson: '',
})

export default PetContext;