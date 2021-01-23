import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PetContext from '../../PetContext';
import AdoptionPage from '../AdoptionPage/AdoptionPage';
import LandingPage from '../LandingPage/LandingPage';
import helper from '../../helper-functions';
import './App.css';

class App extends React.Component {

  // AS A STRETCH --- add a way to get the length to the queue so you can show 
  // the number of people ahead of you in line

  state = {
    error: null,
    topPets: {},
    realPerson: '',
    person: '',
    people: [],
    message: '',
    thankYouMeme: 'https://i.redd.it/ne17uc446c051.jpg',
  }

  componentDidMount() {
    
    helper.fetchBoth()
      .then(([pets, people]) => {
        this.setState({
          topPets: pets.topPets,
          person: people.person,
          people: people.people,
        })
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  handleAdopt = (event) => {
    const type = event.target.id;
    const { people } = this.state;
    people.shift();
    console.log(people);
    helper.petIsAdopted(type)
      .then((resJson) => {
        this.setState({
          topPets: resJson.topPets,
          message: resJson.message,
          realPerson: '',
          people: people,
        })

      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  handleAutoAdopt = () => {
    const { person, realPerson } = this.state;
    const types = ['dogs', 'cats', 'both'];
    const type = types[Math.floor(Math.random() * types.length)];
    const event = {
      target: {
        id: type,
      },
    };
    if (person !== realPerson) {
      setTimeout(() => this.handleAdopt(event), 5000);
    }
  }

  handleAddRealPerson = (event, name) => {
    event.preventDefault();
    const { people } = this.state;
    document.getElementById('name').value = '';
    if (people.includes(name)) {
      return this.setState({ error: 'Name must be unique'});
    }
    helper.addPerson(name)
      .then((personJson) => {
        const { people } = this.state;
        const newPeople = [...people];
        const person = personJson.person;
        newPeople.push(person); 
        this.setState({ realPerson: name, people: newPeople })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  render() {
    const value = {
      topPets: this.state.topPets,
      person: this.state.person,
      thankYou: this.state.thankYouMeme,
      realPerson: this.state.realPerson,
      error: this.state.error,
      handleAdopt: this.handleAdopt,
    }
    const { people } = this.state;
    // this.handleAutoAdopt();

    return (
      <>
        <header>
          <h1>Welcome to Petful</h1>
        </header>
        <main>
          <PetContext.Provider value={value}>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/adopt' render={(props) => (<AdoptionPage {...props} handleAddRealPerson={this.handleAddRealPerson} people={people} />)} />
            </Switch>
          </PetContext.Provider>
          
        </main>
      </>
    )
  }
}



export default App;
