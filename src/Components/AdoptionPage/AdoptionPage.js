import React from 'react';
import PetContext from '../../PetContext';

// Form for user to add their name to the adoption list
function SignUp(props) {
  return (
    <div className='signup'>
      <form onSubmit={(event) => props.handleAddRealPerson(event, props.name)} >
        <legend>Ready to Adopt?</legend>
        <div className='form-group'>
          <p>These people are already ahead of you: </p>
          <ul>
            {props.people.map((person, i) => <li key={i}>{person}</li>)}
          </ul>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name: </label>
          <input onChange={props.handleChange} type='text' id='name' name='name' />
        </div>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}

class AdoptionPage extends React.Component {

  static contextType = PetContext;

  state = {
    name: '',
  }

  handleChange = (event) => {
    const name = event.target.value;
    this.setState({ name: name })
  }

  render() {
    const {
      topPets,
      Person,
      thankYou
    } = this.context;
    const { handleAddRealPerson, people } = this.props;
    const { name } = this.state;

    return (
      <div className='page-container'>
        <div className='page-heading'>
          <h2>Here are the pets available for adoption</h2>
        </div>
        <SignUp name={name} handleChange={this.handleChange} handleAddRealPerson={handleAddRealPerson} people={people} />
        <div className='adoption-container'>
          {/* Add context then make another container for each animal.  */}
          {Object.entries(topPets).map((pet, i) => {
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
          <button type='button'>Or, Adopt us both</button>
        </div>
      </div>
      )
  }
}

export default AdoptionPage;