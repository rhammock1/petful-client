import React from 'react';

class AdoptionPage extends React.Component {
  render() {
    return (
      <div className='page-container'>
        <div className='page-heading'>
          <h2>Here are the pets available for adoption</h2>
        </div>
        <div className='adoption-container'>
          {/* Add context then make another container for each animal.  */}
        </div>
      </div>
      )
  }
}

export default AdoptionPage;