import React from 'react';
import img from './../../assets/images/slide_1.png';

function SlideOne() {
  return <div className='slide-item'>
    <img src={img} alt='first slide'/>
  </div>
}

export default SlideOne;