import React from 'react';
import PetContext from '../../PetContext';

class AdoptionPage extends React.Component {

  static contextType = PetContext;

  render() {
    const {
      topPets,
      Person,
      thankYou
    } = this.context;
    return (
      <div className='page-container'>
        <div className='page-heading'>
          <h2>Here are the pets available for adoption</h2>
        </div>
        <div className='adoption-container'>
          {/* Add context then make another container for each animal.  */}
          {Object.entries(topPets).map((pet, i) => {
            console.log(pet)
            pet = pet[1];
            return (
              <div key={i} className='pet-container'>
                <img src={pet.imageURL} alt={pet.imageDescription} />
                <span>{pet.imageDescription}</span>
                <div className='details'>
                  <ul>
                    <li>{pet.name}, Age {pet.age}</li>
                    <li>{pet.sex} - {pet.breed}</li>
                    <li>{pet.story}</li>
                  </ul>
                </div>
                <button type='button'>Adopt Me</button>
              </div>
            )
          })}
        </div>
      </div>
      )
  }
}

export default AdoptionPage;