import React from 'react';
import './RangeSlider.css';

const RangeSlider = (props) => {

  function onChangeHandler(e) {
    props.onSetRange(Number(e.target.value));
  }

  return <div className='range-slider'>
    <input type="range"
           name="range-slider"
           id="range-slider"
           className="range-slider__input"
           min="1"
           max="3"
           step="1"
           value={props.range}
           onChange={onChangeHandler}
    />
  </div>
}

export default RangeSlider;