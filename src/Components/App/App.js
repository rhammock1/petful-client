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
    adopted: false,
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

  handleAdopt = async (event) => {
    const type = event.target.id;
    const { people, person, realPerson } = this.state;
    if (people.length < 1) {
      return;
    }
    if (person === realPerson) {
      this.setState({ adopted: true });
    } else {
      this.setState({ adopted: false });
    }
    people.shift();
    const newPerson = [...people].shift();
    await helper.petIsAdopted(type)
      .then((resJson) => {
        this.setState({
          topPets: resJson.topPets,
          message: resJson.message,
          people: people,
          person: newPerson || '',
        })
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  handleAutoAdopt = () => {
    const types = ['dogs', 'cats', 'both'];
    const type = types[Math.floor(Math.random() * types.length)];
    const event = {
      target: {
        id: type,
      },
    };
    const { person, realPerson } = this.state;

    const stop = setInterval(() => {
      if (person === realPerson) {
        console.log('Hey boss');
        clearInterval(timer);
        clearInterval(stop);
      }
    })
    const names = [
      'Jerry Terry',
      'Merry Werry',
      'Larry Lobster',
      'Bobby Wobby',
      'Joe Shmoe'];
    let counter = 0;
    
    const timer = setInterval(() => {
      this.handleAdopt(event);
      helper.addPerson(names[counter])
        .then((personJson) => {
          if (counter >= names.length - 1) {
            counter = 0;
          } else {
            counter++;
          }
          console.log(counter);
          const { people } = this.state;
          const newPeople = [...people];
          const person = personJson.person;
          newPeople.push(person);
          this.setState({ people: newPeople });
        })
        .catch((error) => {
          this.setState({ error });
        })
    }, 5000)
    
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
        console.log(newPeople);
        this.setState({ realPerson: name, people: newPeople })
        if(people.length < 1) {
          this.setState({ person: name });
        }
      })
      .catch((error) => {
        this.setState({ error })
      })
    this.handleAutoAdopt();
  }

  render() {
    const value = {
      topPets: this.state.topPets,
      person: this.state.person,
      adopted: this.state.adopted,
      realPerson: this.state.realPerson,
      error: this.state.error,
      handleAdopt: this.handleAdopt,
      message: this.state.message,
    }
    const { people } = this.state;


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
