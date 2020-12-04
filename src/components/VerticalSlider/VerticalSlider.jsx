import React, { useState } from 'react';
import SlideOne from "../SlideOne/SlideOne";
import SlideSecond from "../SlideSecond/SlideSecond";
import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";
import { ANIMATION_TIME } from "../../constants/slider";
import { SWIPE_PARAMS } from "../../constants/slider";
import './VerticalSlider.css';

const VerticalSlider = () => {

  const sliderId = 'slide-wrapper';

  /***
   * во время перехода к следующему слайду, дабы избежать проблем при непрерывной прокрутке колёсика,
   * устанавливаем флаг, который будет переключен при завершении анимации перехода слайда
   */
  const [scrollAvailability, setScrollAvailability] = useState(true);

  const onWheelHandler = (e) => {
    e.stopPropagation();
    if (scrollAvailability) {
      recalculateSliderPosition(e.deltaY);
    }
  }

  const goUp = () => {
    const slider = document.getElementById(sliderId);
    const currentOffsetY = slider.offsetTop;
    const windowHeight = window.innerHeight;

    let moveY = currentOffsetY + windowHeight;
    if (moveY > 0 || currentOffsetY === 0) {
      moveY = 0;
    }
    slider.style.top = `${moveY}px`;
  }

  const goDown = () => {
    const slider = document.getElementById(sliderId);
    const currentOffsetY = slider.offsetTop;
    const windowHeight = window.innerHeight;

    let moveY = currentOffsetY - windowHeight;

    console.log(moveY)
    if (moveY - windowHeight < -slider.offsetHeight) {
      moveY = -slider.offsetHeight + windowHeight;
    }
    slider.style.top = `${moveY}px`;
  }

  const recalculateSliderPosition = (deltaY) => {
    setScrollAvailability(false);
    if (deltaY < 0) {
      goUp();
    } else {
      goDown();
    }
    setTimeout(() => {
      setScrollAvailability(true);
    }, ANIMATION_TIME);
  }


  /*swipe*/

  let swipeData = {
    startPositionX: 0,
    startPositionY: 0,
    swipeStartTime: 0
  }

  const onTouchStartHandler = (e) => {
    swipeData = {
      ...swipeData,
      startPositionX: e.changedTouches[0].pageX,
      startPositionY: e.changedTouches[0].pageY,
      swipeStartTime: new Date().getTime()
    }
  }

  const onTouchEndHandler = (e) => {
    const touches = e.changedTouches[0];
    const deltaX = touches.pageX - swipeData.startPositionX;
    const deltaY = touches.pageY - swipeData.startPositionY;
    const elapsedTime = new Date().getTime() - swipeData.swipeStartTime;

    const isElapsedTimeValid = elapsedTime <= SWIPE_PARAMS.allowedTime;
    const isDeltaYValid = Math.abs(deltaY) >= SWIPE_PARAMS.threshold;
    const isDeltaXValid = Math.abs(deltaX) <= SWIPE_PARAMS.slack;

    if (isElapsedTimeValid && isDeltaYValid && isDeltaXValid) {
      if (deltaY < 0) {
        goUp();
      } else {
        goDown();
      }
    }
  }


  return (
    <div id={sliderId} onWheel={onWheelHandler} onTouchStart={onTouchStartHandler} onTouchEnd={onTouchEndHandler}>
      <SlideOne/>
      <SlideSecond/>
      <HorizontalSlider/>
    </div>
  );
}

export default VerticalSlider;