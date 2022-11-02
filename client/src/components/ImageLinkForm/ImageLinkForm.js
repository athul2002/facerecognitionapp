
import React from 'react';
import './ImageLinkForm.css';

import detectIcon from '../Images/Detect.svg'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='content'>
    <div>
    <p  class='message2'>Paste the image address below to detect face</p>
    </div>
<div className='input-group mb-3'>
  
  <input type="text" onChange={onInputChange} className="form-control" placeholder="  Paste Image address here "/>
  <img className='detectbutton' src={detectIcon} onClick={onButtonSubmit}></img>
</div>
</div>

  );
}


export default ImageLinkForm;
