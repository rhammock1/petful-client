import React from 'react';
import { Link } from 'react-router-dom';
import AdoptDesc from '../AdoptDesc/AdoptDesc';

const LandingPage = function() {
  return (
    // Landing Page --- theres gonna be an image and some description about what the adpoption
    // process is and someone gets signed up.
    <div className='landing-container'>
      <div className='landing-heading'>
        <h2>Our Adoption Process</h2>
      </div>
      <div className='landing-description'>
        <div className='container'>
          <img src='https://lh3.googleusercontent.com/proxy/9n5eszPkl2zCQhaxLnodSniRJHO01ULvvgeHQAxoQqN_ZfC7qZsmYOXqr_m9TJQfUIk847BxPFa5BA0O4gtXeCKiPIJdziF-x5smOF4KMtAI5ieabUs9t7odO-ClQnxhGsc' alt='pet adoption banner' />
          <p>Lucky for you, we don't have adoption fees anyways</p>
        </div>
        <AdoptDesc />
        <button type='button'><Link to='/adopt'>Get Started</Link></button>
      </div>
    </div>

    )
}

export default LandingPage;