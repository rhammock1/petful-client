import React from 'react';

const PetContext = React.createContext({
  topPets: {},
  person: '',
  thankYouMeme: '',
})

export default PetContext;