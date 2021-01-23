import React from 'react';
import { Link } from 'react-router-dom';
import AdoptDesc from '../ProcessDescription/ProcessDescription';

const LandingPage = function() {
  return (
    // Landing Page --- theres gonna be an image and some description about what the adpoption
    // process is and someone gets signed up.
    <div className='page-container'>
      <div className='page-heading'>
        <h2>Our Adoption Process</h2>
      </div>
      <div className='landing-description'>
        <div className='container'>
          <img src='https://i.pinimg.com/originals/f1/1f/48/f11f4806404bf080b9a96b90e30c781b.jpg' alt='pet adoption banner' />
        </div>
        <AdoptDesc />
        <button type='button'><Link to='/adopt'>Get Started</Link></button>
      </div>
    </div>

    )
}

export default LandingPage;