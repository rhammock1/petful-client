import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdoptionPage from '../AdoptionPage/AdoptionPage';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';

class App extends React.Component {

  // AS A STRETCH --- add a way to get the length to the queue so you can show 
  // the number of people ahead of you in line

  state = {
    error: null,
    topPets: {},
    person: '',
    thankYouMeme: 'https://i.redd.it/ne17uc446c051.jpg',
  }

  componentDidMount() {
    const endpoint = 'https://mysterious-lowlands-03819.herokuapp.com/api';
    Promise.all([
      fetch(`${endpoint}/pets`),
      fetch(`${endpoint}/people`),
    ])
      .then(([petsRes, peopleRes]) => {
        if (!petsRes.ok) {
          return petsRes.json().then(e => Promise.reject(e))
        }
        if (!peopleRes.ok) {
          return peopleRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([
          petsRes.json(),
          peopleRes.json(),
        ])
      })
      .then(([pets, people]) => {
        this.setState({
          topPets: pets,
          person: people
        })
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  handleAdopt = () => {
    console.log('hey boss');
  }

  render() {
    
    return (
      <>
        <header>
          <h1>Welcome to Petful</h1>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/adopt' component={AdoptionPage} />
          </Switch>
        </main>
      </>
    )
  }
}



export default App;
