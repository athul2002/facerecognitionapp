import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  return (
    <div className='rank' >
      <div className='white f2'>
        <p className='message '>{`Hello ${name}`}</p> 
      </div>
      <div >
        <p class='Entry f3'>{'Total Searches :'+ entries}</p>
      </div>

    </div>
  );
}

export default Rank;