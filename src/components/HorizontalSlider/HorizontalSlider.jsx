import React, {useEffect, useState} from 'react';
import slide_3 from './../../assets/images/slide_3.png';
import slide_4 from './../../assets/images/slide_4.png';
import slide_5 from './../../assets/images/slide_5.png';
import RangeSlider from "../RangeSlider/RangeSlider";
import './HorizontalSlider.css';

function HorizontalSlider() {
  const horizontalSlider = 'horizontal-slider';

  const [range, setRange] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(1);

  const recalculateCurrentSlide = () => {
    setCurrentSlide(range);
  }

  const updateCurrentSlide = () => {
    const slider = document.getElementById(horizontalSlider);
    let moveX = -(window.innerWidth * (currentSlide - 1));
    slider.style.left = `${moveX}px`;
  }

  useEffect(recalculateCurrentSlide, [range]);
  useEffect(updateCurrentSlide, [currentSlide])

  const onSetRangeHandler = (rangeValue) => {
    setRange(rangeValue);
  }


  return <div className='slide-item horizontal-slider'>
    <div className="horizontal-slider__slides-wrapper" id={horizontalSlider}>
      <img src={slide_3} alt='horizontal first slide'/>
      <img src={slide_4} alt='horizontal second slide'/>
      <img src={slide_5} alt='horizontal third slide'/>
    </div>
    <RangeSlider range={range} onSetRange={onSetRangeHandler}/>
  </div>
}

export default HorizontalSlider;