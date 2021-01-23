import React from 'react';
import PetContext from '../../PetContext';

// Form for user to add their name to the adoption list
function SignUp(props) {
  const { people } = props || [];
  return (
    <div className='signup'>
      <form onSubmit={(event) => props.handleAddRealPerson(event, props.name)} >
        <legend>Ready to Adopt?</legend>
        <div className='form-group'>
          <p>These people are already ahead of you: </p>
          <ul>
            {people.map((person, i) => <li key={i}>{(person === props.realPerson) ? `${person} <- You` : `${person}`}</li>)}
          </ul>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name: </label>
          <input onChange={props.handleChange} type='text' id='name' name='name' />
        </div>
        <button type='submit'>Submit</button>
      </form>
      { (props.error) ? <p className='error'>{props.error}</p> : null }
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
      person,
      adopted,
      message,
      realPerson,
      error,
      handleAdopt,
    } = this.context;
    const { handleAddRealPerson, people } = this.props;
    const { name } = this.state;
    let type = '';

    return (
      <div className='page-container'>
        <div className='page-heading'>
          <h2>Here are the pets available for adoption</h2>
        </div>
        
          {(message) 
            ? <div className='thank-you'>
                <p>{message}</p>
              </div>
            : null
          }
        <SignUp error={error} realPerson={realPerson} name={name} handleChange={this.handleChange} handleAddRealPerson={handleAddRealPerson} people={people} />
        {(message && adopted) 
            ? <div className='thank-you confirmation'>
                <h3>Congrats on adopting your new pet!</h3>
              </div>
            : null
          }
        <div className='adoption-container'>
          {Object.entries(topPets).map((pet, i) => {
            
            if (topPets.cat === pet[1]) {
              type = 'cats';
            } else {
              type = 'dogs'
            }

            pet = pet[1] || {};
            
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
                {(person === realPerson)
                  ? (
                  <>
                    <button id={type} onClick={(event) => handleAdopt(event)} type='button'>Adopt Me</button>
                  </>
                  )
                  : null
                }
              </div>
            )
          })}
          {(person === realPerson)
            ? (
            <>
              <button id='both' onClick={(event) => handleAdopt(event)} type='button'>Or, Adopt us both</button>
            </>
            )
            : null
          }
        </div>
      </div>
      )
  }
}

export default AdoptionPage;