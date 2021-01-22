import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';

class App extends React.Component {

  state = {
    topPets: {},
    person: '',
    thankYouMeme: 'https://i.redd.it/ne17uc446c051.jpg',
  }

  renderLandingPage = () => {
    return (
      <LandingPage />
    )
  }
  render() {
    
    return (
      <>
        <header>
          <h1>Welcome to Petful</h1>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={this.renderLandingPage} />
            <Route path='/adopt' component='' />
          </Switch>
        </main>
      </>
    )
  }
}



export default App;
